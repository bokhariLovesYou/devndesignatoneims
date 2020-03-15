import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Container, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { slugify } from "../util/utilityFunctions.js"
import styled from "styled-components"
import {
  HeadingLarge,
  Section,
  ContentBox,
  PostMetaWrapper,
  Line,
  FeaturedImage,
  Article,
  ArticleContents,
  PostCategoryMeta,
} from "../components/StyledElements"
const StyledLink = styled(props => <Link {...props} />)`
  font-weight: 600;
`

export class SinglePost extends Component {
  render() {
    const { data } = this.props
    const post = data.markdownRemark.frontmatter
    let resolutions = ""
    if (post.image !== null) {
      resolutions = post.image.childImageSharp.fluid
    }
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
                        <StyledLink to={`/tag/${slugify(post.tags.title)}`}>
                          {post.tags.title}
                        </StyledLink>
                      </PostCategoryMeta>
                      <p className="mb-0">Compiled by {post.author}</p>
                    </ContentBox>
                    <FeaturedImage>
                      <Img
                        className="featured-image__post"
                        fluid={resolutions}
                      />
                    </FeaturedImage>
                  </PostMetaWrapper>
                  <Line />
                  <ArticleContents
                    className="article--content"
                    dangerouslySetInnerHTML={{
                      __html: data.markdownRemark.html,
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
  }
}

export default SinglePost
export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        date(formatString: "MMM Do YYYY")
        tags {
          title
        }
        metaTitle
        gated
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
  }
`
