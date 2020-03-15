import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Container from "react-bootstrap/Container"
import { HeadingLarge, Section, ContentBox } from "../components/StyledElements"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Not found" />
    <Section ExtraLarge>
      <Container>
        <ContentBox className="text-center">
          <HeadingLarge>404. Not Found.</HeadingLarge>
        </ContentBox>
      </Container>
    </Section>
  </Layout>
)

export default NotFoundPage
