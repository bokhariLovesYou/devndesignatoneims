import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import PageListItem from "../components/PageListItem"
import { graphql } from "gatsby"
import { slugify } from "../util/utilityFunctions.js"
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
} from "../components/StyledElements"

export class Clients extends Component {
  render() {
    const { data } = this.props
    let tagData = []
    data.markdownRemark.frontmatter.globalTagsData.forEach(elem => {
      if (elem.client) {
        tagData.push({
          title: elem.title,
          description: elem.description,
          image: elem.image.childImageSharp.fluid.src,
          destination: `/clients/${slugify(elem.title)}`,
        })
      }
    })
    return (
      <Layout>
        <SEO
          title="Clients"
          description="Browse documents by clients"
          noIndex="noindex, nofollow"
        />
        <Section>
          <Container>
            <HeadingLarge>Clients</HeadingLarge>
            <Subtitle className="mb-0">Browse documents by clients</Subtitle>
            <Line />
          </Container>
          <Container>
            <ContentBox>
              <PageListWrapper>
                <PageListContents>
                  {tagData.map((elem, index) => (
                    <PageListItem
                      Folder
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

export default Clients

export const query = graphql`
  query {
    markdownRemark(frontmatter: { title: { eq: "globalCatData" } }) {
      frontmatter {
        globalTagsData {
          title
          description
          client
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
