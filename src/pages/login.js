import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import auth from "../util/auth.js"
import { navigate } from "gatsby"
import { myContext } from "../components/Provider"
import Spinner from "react-bootstrap/Spinner"
// Bootstrap Grids
import Container from "react-bootstrap/Container"
// Styled Elements
import {
  Section,
  ContentBox,
  FormWrapper,
  Form,
  InputField,
  Button,
  FancyInputWrapper,
  FancyInputIcon,
  FancyInput,
  FormTitle,
  ErrorHelper,
} from "../components/StyledElements"

export class Login extends Component {
  state = {
    email: "",
    password: "",
    authenticated: false,
    errors: null,
    loading: false,
    currentUser: null,
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      loading: true,
    })
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    auth
      .login(userData.email, userData.password, true)
      .then(response => {
        // Handle Submit
        if (response.app_metadata.roles[0] === "admin") {
          if (typeof window !== `undefined`) {
            navigate("/clients")
          }
        } else {
          if (typeof window !== `undefined`) {
            navigate(`/clients/${userData.email.split("@")[0]}`)
          }
        }
        this.setState({
          loading: false,
        })
        // this.context.handleAuthentication()
      })
      .catch(error => {
        console.log(error)
        this.setState({
          errors: JSON.parse(JSON.stringify(error.json.error_description)),
          loading: false,
        })
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    const { errors, loading } = this.state
    const checkLoading = () => {
      if (loading) {
        return (
          <div className="spinner-wrapper">
            <Spinner
              animation="border"
              role="status"
              className="bootstrap--loader"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )
      }
    }
    const checkAuthentication = () => {
      if (
        auth.currentUser() !== null &&
        auth.currentUser().app_metadata.roles[0] === "admin"
      ) {
        if (typeof window !== `undefined`) {
          navigate("/clients")
        }
      } else if (
        auth.currentUser() !== null &&
        auth.currentUser().app_metadata.roles[0] === "client"
      ) {
        if (typeof window !== `undefined`) {
          navigate(`/clients/${auth.currentUser().email.split("@")[0]}`)
        }
      } else {
        return (
          <myContext.Consumer>
            {context => (
              <React.Fragment>
                <Layout>
                  <SEO title="Login" description="Access documents" />
                  <Section ExtraLarge>
                    <Container>
                      <ContentBox>
                        <FormWrapper>
                          <Form noValidate onSubmit={this.handleSubmit}>
                            <FormTitle>Sign in to dev&design.</FormTitle>
                            <InputField>
                              <FancyInputWrapper>
                                <FancyInputIcon>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    className="icon-email"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      fill="#bbb"
                                      d="M1 8.5V5.498c0-.283.183-.37.41-.212l3.764 2.636c.466.326 1.196.32 1.652 0l3.765-2.636c.22-.153.409-.063.409.212V8.5A1.5 1.5 0 0 1 9.503 10H2.497A1.5 1.5 0 0 1 1 8.5zm0-4.904v-.088C1 2.666 1.67 2 2.497 2h7.006C10.328 2 11 2.675 11 3.508v.088c0 .284-.19.62-.426.756L6.87 6.496c-.479.277-1.26.278-1.742 0L1.426 4.352C1.19 4.216 1 3.877 1 3.596z"
                                    ></path>
                                  </svg>
                                </FancyInputIcon>
                                <FancyInput
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                  value={this.state.email}
                                  onChange={this.handleChange}
                                />
                              </FancyInputWrapper>
                            </InputField>
                            <InputField>
                              <FancyInputWrapper>
                                <FancyInputIcon>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    className="icon-email"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      fill="#bbb"
                                      d="M10,6.0000001 L10,5 C10,2.99999988 8.209,1 6,1 C3.791,1 2,2.97508333 2,5 L2,6.0000001 C1.44771525,6.0000001 1,6.45097524 1,6.99077799 L1,11.0092217 C1,11.5564132 1.4556644,11.9999996 1.99539757,11.9999996 L10.0046024,11.9999996 C10.5543453,11.9999996 11,11.5490245 11,11.0092217 L11,6.99077799 C11,6.44358647 10.546814,6.0000001 10,6.0000001 L10,6.0000001 Z M4,6 L8,6 L8,5 C8,5 8,3 6,3 C4,3 4,5 4,5 L4,6 L4,6 Z"
                                    ></path>
                                  </svg>
                                </FancyInputIcon>
                                <FancyInput
                                  type="password"
                                  name="password"
                                  maxlength="3000"
                                  placeholder="Password"
                                  value={this.state.password}
                                  onChange={this.handleChange}
                                />
                              </FancyInputWrapper>
                              {errors ? (
                                <ErrorHelper>{errors}</ErrorHelper>
                              ) : (
                                ""
                              )}
                            </InputField>
                            <InputField Last>
                              <Button Submit type="submit">
                                Sign in
                              </Button>
                            </InputField>
                            {checkLoading()}
                          </Form>
                        </FormWrapper>
                      </ContentBox>
                    </Container>
                  </Section>
                </Layout>
              </React.Fragment>
            )}
          </myContext.Consumer>
        )
      }
    }
    return <>{checkAuthentication()}</>
  }
}

export default Login
