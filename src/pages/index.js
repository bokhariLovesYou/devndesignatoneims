import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

export class index extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Homepage" />
        <h1>Hello, from the homepage</h1>
      </Layout>
    )
  }
}

export default index
