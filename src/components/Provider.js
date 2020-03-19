import React, { Component } from "react"

export const myContext = React.createContext()

class Provider extends Component {
  state = {
    authenticated: false,
    role: null,
    email: null,
  }

  handleAuthentication = () => {
    this.setState({
      authenticated: true,
    })
  }

  render() {
    return (
      <myContext.Provider handleAuthentication={this.handleAuthentication}>
        {this.props.children}
      </myContext.Provider>
    )
  }
}

export default ({ element }) => <Provider>{element}</Provider>
