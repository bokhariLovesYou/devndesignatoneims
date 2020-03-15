import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import PageListItem from "../components/PageListItem"
import { graphql } from "gatsby"
// Bootstrap Grids
import Container from "react-bootstrap/Container"
// Styled Elements
import {
  HeadingLarge,
  Section,
  ContentBox,
  Subtitle,
  Line,
  PageListWrapper,
  PageListContents,
  CategoryImageLoopWrapper,
  CategoryImageLoop,
  CategoryImageLoopTint,
} from "../components/StyledElements"

export class TagsPage extends Component {
  render() {
    const { data } = this.props
    const tagTitle = data.allMarkdownRemark.edges[0].node.frontmatter.tags.title
    let tagData = []
    let blogPosts = []
    data.allMarkdownRemark.edges.forEach(({ node }) => {
      blogPosts.push({
        title: node.frontmatter.title,
        destination: "/" + node.fields.slug,
      })
    })
    data.markdownRemark.frontmatter.globalTagsData.forEach(elem => {
      if (elem.title === tagTitle) {
        tagData.push({
          title: elem.title,
          description: elem.description,
          image: elem.image.childImageSharp.fluid.src,
        })
      }
    })
    return (
      <Layout>
        <SEO title={tagData[0].title} description={tagData[0].description} />
        <Section>
          <Container>
            <HeadingLarge>{tagData[0].title}</HeadingLarge>
            <Subtitle className="mb-0">{tagData[0].description}</Subtitle>
            <CategoryImageLoopWrapper>
              <CategoryImageLoop
                style={{
                  backgroundImage: `url(${tagData[0].image})`,
                }}
              />
              <CategoryImageLoopTint />
            </CategoryImageLoopWrapper>
            <Line />
          </Container>
          <Container>
            <ContentBox>
              <PageListWrapper>
                <PageListContents>
                  {blogPosts.map((elem, index) => (
                    <PageListItem
                      title={elem.title}
                      key={index}
                      destination={elem.destination}
                    />
                  ))}
                </PageListContents>
              </PageListWrapper>
            </ContentBox>
          </Container>
        </Section>
      </Layout>
    )
  }
}

export default TagsPage

export const query = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { title: { in: [$tag] } } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM Do YYYY")
            tags {
              title
            }
          }
          fields {
            slug
          }
        }
      }
    }
    markdownRemark(frontmatter: { title: { eq: "globalCatData" } }) {
      frontmatter {
        globalTagsData {
          title
          description
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
