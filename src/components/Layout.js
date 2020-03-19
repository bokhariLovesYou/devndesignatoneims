import React, { Component } from "react"
import { myContext } from "./Provider"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/index.scss"
// Components
import Header from "./Header"
import Footer from "./Footer"
// Styled Components
import styled from "styled-components"

const Main = styled.main`
  min-height: 100vh;
`

class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <myContext.Consumer>
        {context => (
          <React.Fragment>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </React.Fragment>
        )}
      </myContext.Consumer>
    )
  }
}

export default Layout
