import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import RelatedArticles from "../components/RelatedArticles"
import auth from "../util/auth.js"
import { Container, Row, Col } from "react-bootstrap"
import { graphql, navigate } from "gatsby"
import { Link } from "gatsby"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
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
  RelatedArticlesWrapper,
  RelatedArticlesHeading,
} from "../components/StyledElements"
const StyledLink = styled(props => <Link {...props} />)`
  font-weight: 600;
`

const GlobalStyle = createGlobalStyle`
body,html {
  @media (min-width: 992px) {
    overflow-x: unset !important;
  }
}
`

export class ClientsSinglePost extends Component {
  render() {
    const { data } = this.props
    const post = data.postData.frontmatter
    let tagData = []
    let documentationArticles = []
    data.globalCatData.frontmatter.globalTagsData.forEach(elem => {
      if (elem.title === post.tags.title) {
        tagData.push({
          title: elem.title,
          image: elem.image.childImageSharp.fluid.src,
        })
      }
    })
    data.categoriesData.edges.forEach(elem => {
      if (
        elem.node.frontmatter.tags.title === post.tags.title &&
        elem.node.frontmatter.documentationTopic === post.documentationTopic &&
        post.documentation !== false
      ) {
        documentationArticles.push({
          title: elem.node.frontmatter.title.replace(
            `${elem.node.frontmatter.documentationTopic} -`,
            ""
          ),
          destination: `/clients/${slugify(post.tags.title)}/${slugify(
            elem.node.frontmatter.title
          )}`,
        })
      }
    })
    // documentationArticles = documentationArticles.reverse()
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

    const checkDocumentation = () => {
      if (documentationArticles.length > 0) {
        return (
          <>
            <GlobalStyle />
            <RelatedArticlesWrapper>
              <RelatedArticlesHeading>
                {post.documentationTopic} Contents
              </RelatedArticlesHeading>
              {documentationArticles.map((elem, index) => (
                <RelatedArticles
                  title={elem.title}
                  key={index}
                  destination={elem.destination}
                />
              ))}
            </RelatedArticlesWrapper>
          </>
        )
      }
    }

    const checkDocumentationSeries = () => {
      if (documentationArticles.length > 0) {
        return (
          <span>
            Documentation: <strong>{post.documentationTopic}</strong>
          </span>
        )
      } else {
        return <span>Posted at {post.date}</span>
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
                    <Article SidebarActive={documentationArticles.length > 0}>
                      <PostMetaWrapper>
                        <ContentBox>
                          <HeadingLarge>{post.title}</HeadingLarge>
                          {checkDocumentationSeries()}
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
                  <Col lg={4}>{checkDocumentation()}</Col>
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
        documentationTopic
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
    categoriesData: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            metaTitle
            metaDescription
            date
            author
            gated
            documentation
            documentationTopic
            tags {
              client
              title
            }
          }
        }
      }
    }
  }
`
