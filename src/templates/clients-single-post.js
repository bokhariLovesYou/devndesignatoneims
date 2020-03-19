import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import auth from "../util/auth.js"
import { Container, Row, Col } from "react-bootstrap"
import { graphql, navigate } from "gatsby"
import { Link } from "gatsby"
import styled from "styled-components"
import { slugify } from "../util/utilityFunctions.js"
import {
  HeadingLarge,
  Section,
  ContentBox,
  PostMetaWrapper,
  Line,
  CategoryImageLoopWrapper,
  CategoryImageLoop,
  CategoryImageLoopTint,
  Article,
  ArticleContents,
  PostCategoryMeta,
} from "../components/StyledElements"
const StyledLink = styled(props => <Link {...props} />)`
  font-weight: 600;
`

export class ClientsSinglePost extends Component {
  render() {
    const { data } = this.props
    const post = data.postData.frontmatter
    let tagData = []
    data.globalCatData.frontmatter.globalTagsData.forEach(elem => {
      if (elem.title === post.tags.title) {
        tagData.push({
          title: elem.title,
          image: elem.image.childImageSharp.fluid.src,
        })
      }
    })
    const renderSEO = () => {
      if (post.gated) {
        return (
          <SEO
            title={post.metaTitle}
            description={post.metaDescription}
            noIndex="noindex, nofollow"
          />
        )
      } else {
        return <SEO title={post.metaTitle} description={post.metaDescription} />
      }
    }
    const checkAuthentication = () => {
      if (auth.currentUser() !== null) {
        return (
          <Layout>
            {renderSEO()}
            <Section Medium>
              <Container>
                <Row>
                  <Col lg={8}>
                    <Article>
                      <PostMetaWrapper>
                        <ContentBox>
                          <HeadingLarge>{post.title}</HeadingLarge>
                          <span>Posted at {post.date}</span>
                          <PostCategoryMeta>
                            Filed under{" "}
                            <StyledLink
                              to={`/clients/${slugify(post.tags.title)}`}
                            >
                              {post.tags.title}
                            </StyledLink>
                          </PostCategoryMeta>
                        </ContentBox>
                        <CategoryImageLoopWrapper>
                          <CategoryImageLoop
                            style={{
                              backgroundImage: `url(${tagData[0].image})`,
                            }}
                          />
                          <CategoryImageLoopTint />
                        </CategoryImageLoopWrapper>
                      </PostMetaWrapper>
                      <Line />
                      <ArticleContents
                        className="article--content"
                        dangerouslySetInnerHTML={{
                          __html: data.postData.html,
                        }}
                      />
                    </Article>
                  </Col>
                  <Col lg={4}></Col>
                </Row>
              </Container>
            </Section>
          </Layout>
        )
      } else {
        if (typeof window !== `undefined`) {
          navigate("/login", {
            state: { previousPage: window.location.pathname },
          })
        }
      }
    }
    return <>{checkAuthentication()}</>
  }
}

export default ClientsSinglePost
export const query = graphql`
  query ClientsPostBySlug($slug: String!) {
    postData: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        date(formatString: "MMM Do YYYY")
        documentation
        gated
        tags {
          title
        }
        metaTitle
        metaDescription
        image {
          childImageSharp {
            fluid(maxWidth: 1600, maxHeight: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    globalCatData: markdownRemark(
      frontmatter: { title: { eq: "globalCatData" } }
    ) {
      frontmatter {
        globalTagsData {
          title
          image {
            childImageSharp {
              fluid(maxWidth: 1100, maxHeight: 1100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
