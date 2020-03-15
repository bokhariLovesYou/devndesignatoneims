import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Card from "../components/Card"
import Category from "../components/Category"
import { graphql } from "gatsby"
// Bootstrap Grids
import { Container, Row, Col } from "react-bootstrap"
// Styled Elements
import {
  HeadingLarge,
  Section,
  ContentBox,
  Subtitle,
  HeadingMedium,
} from "../components/StyledElements"

export class index extends Component {
  render() {
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
    const { data } = this.props
    let blogPosts = []
    let categories = []
    data.pageQuery.edges.forEach(({ node }) => {
      if (!node.frontmatter.gated) {
        blogPosts.push({
          title: node.frontmatter.title,
          destination: "/" + node.fields.slug,
          image: node.frontmatter.postImage.childImageSharp.fluid,
        })
      }
    })
    data.globalQuery.frontmatter.globalTagsData.forEach(elem => {
      categories.push({
        title: elem.title,
        description: elem.description,
        image: elem.image.childImageSharp.fluid,
        destination: `/tag/${slugify(elem.title)}`,
      })
    })
    const seen = {}
    categories = categories.filter(entry => {
      let previous
      if (seen.hasOwnProperty(entry.title)) {
        previous = seen[entry.title]
        previous.data.push(entry.data)
        return false
      }
      if (!Array.isArray(entry.data)) {
        entry.data = [entry.data]
      }
      seen[entry.title] = entry
      return true
    })
    return (
      <Layout>
        <SEO title="Homepage" />
        <Section>
          <Container>
            <ContentBox>
              <HeadingLarge>dev&design at oneims.</HeadingLarge>
              <Subtitle Light>
                Creative teammates building a world where we can belong
                anywhere.
              </Subtitle>
            </ContentBox>
          </Container>
          <Container className="pt-4">
            {blogPosts.slice(0, 1).map((elem, index) => (
              <Card
                key={index}
                Featured
                imageSrc={elem.image}
                destination={elem.destination}
                title={elem.title}
              />
            ))}
          </Container>
          <Container className="pt-3 pt-md-4">
            <Row>
              {blogPosts.slice(1, 5).map((elem, index) => (
                <Col md={6} xl={3} className="mb-4 mb-xl-0">
                  <Card
                    key={index}
                    imageSrc={elem.image}
                    title={elem.title}
                    destination={elem.destination}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Section>
        <Section className="pt-0">
          <Container>
            <ContentBox>
              <HeadingMedium>Resources</HeadingMedium>
            </ContentBox>
          </Container>
          <Container className="pt-4">
            <Row>
              {categories.map((elem, index) => (
                <Col key={index} md={6} xl={3} className="mb-4 mb-xl-0">
                  <Category
                    iconSrc={elem.image}
                    title={elem.title}
                    key={index}
                    description={elem.description}
                    destination={elem.destination}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Section>
      </Layout>
    )
  }
}

export default index

export const query = graphql`
  query {
    pageQuery: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            gated
            tags {
              title
            }
            date(formatString: "MM Do YYYY")
            postImage: image {
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
    globalQuery: markdownRemark(
      frontmatter: { title: { eq: "globalCatData" } }
    ) {
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
