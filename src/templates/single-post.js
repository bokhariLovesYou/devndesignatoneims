import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Container, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { Link } from "gatsby"
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
    const slugify = str => {
      return str
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "") // Trim - from end of text
    }
    return (
      <Layout>
        <SEO title={post.metaTitle} description={post.metaDescription} />
        <Section Medium>
          <Container>
            <Row>
              <Col lg={8}>
                <Article>
                  <PostMetaWrapper>
                    <ContentBox>
                      <HeadingLarge>{post.title}</HeadingLarge>
                      <span>Posted at </span>
                      <date>{post.date}</date>
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
