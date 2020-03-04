import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/index.scss"
// Components
import Header from "./header"
import Footer from "./Footer"
// Styled Components
import styled from "styled-components"

const Main = styled.main``

class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </>
    )
  }
}

export default Layout
