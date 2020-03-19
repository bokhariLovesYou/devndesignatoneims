import React, { Component } from "react"
import { graphql, StaticQuery, Link, navigate } from "gatsby"
import auth from "../util/auth.js"
import Search from "./Search"
import Spinner from "react-bootstrap/Spinner"
// Bootstrap Container
import Container from "react-bootstrap/Container"
// Styled Elements
import {
  FlexWrapper,
  FlexColumn,
  Topbar,
  ContentBox,
  TopbarNavItem,
  TopbarNav,
  IconWrapper,
  LogoutLink,
} from "./StyledElements"
// Styled Components
import styled from "styled-components"
const HeaderWrapper = styled.header``
const HeaderContents = styled.div`
  padding: 0.85rem 0;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px;
  background-color: #fff;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`

const LogoWrapper = styled.figure`
  display: flex;
  align-items: center;
  margin-bottom: 0;
`
const LogoTitle = styled.span`
  padding-left: 0.758rem;
  font-weight: 700;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`

class Header extends Component {
  state = {
    loading: false,
  }

  handleLogOut = () => {
    this.setState({
      loading: true,
    })
    auth
      .currentUser()
      .logout()
      .then(response => {
        if (typeof window !== `undefined`) {
          navigate("/login")
        }
        this.setState({
          loading: false,
        })
      })
      .catch(error => {
        console.log("Failed to logout user: %o", error)
        this.setState({
          loading: false,
        })
        throw error
      })
  }

  render() {
    const checkAuthentication = () => {
      if (
        auth.currentUser() !== null &&
        auth.currentUser().app_metadata.roles[0] === "admin"
      ) {
        return (
          <>
            <TopbarNavItem>
              <LogoutLink onClick={this.handleLogOut}>
                <FlexWrapper AlignedCentered>
                  <IconWrapper>
                    <svg viewBox="0 0 16 16" className="logInWeb">
                      <path d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M8,7L7.938,8h-1L7,7H5v2h1l1,1c0.313-0.333,1.021-1,2-1h1 l1,0.229C11.86,9.437,12.513,9.75,13,10v1l-0.938,1.407C10.993,13.393,9.569,14,8,14v-1l-1-1v-1l-2-1C4.018,9.547,3.25,8.938,3,8 L2.785,6c0-0.187,0.435-0.867,0.55-1L3.278,4.307C4.18,3.154,5.494,2.343,7,2.09V3.5L8,4c0.3,0,0.609-0.045,1-0.417 C9.382,3.22,9.719,3,10,3c0.698,0,1,0.208,1,1l-0.5,1h-0.311C9.612,5.279,9.261,5.506,9,6C8.749,6.475,8.475,6.773,8,7z M13,8 c-0.417-0.25-0.771-0.583-1-1V6l0.797-1.593C13.549,5.409,14,6.65,14,8c0,0.165-0.012,0.326-0.025,0.488L13,8z"></path>
                    </svg>
                  </IconWrapper>
                  <span>Logout</span>
                </FlexWrapper>
              </LogoutLink>
            </TopbarNavItem>
            <TopbarNavItem>
              <Link to="/clients">
                <FlexWrapper AlignedCentered>
                  <IconWrapper>
                    <svg viewBox="0 0 14 14" className="folder">
                      <path d="M12,1.5 L2,1.5 C1.72386,1.5 1.5,1.72386 1.5,2 L1.5,12 C1.5,12.2761 1.72386,12.5 2,12.5 L12,12.5 C12.2761,12.5 12.5,12.2761 12.5,12 L12.5,2 C12.5,1.72386 12.2761,1.5 12,1.5 Z M2,0 L12,0 C13.1046,0 14,0.895431 14,2 L14,12 C14,13.1046 13.1046,14 12,14 L2,14 C0.89543,14 0,13.1046 0,12 L0,2 C0,0.89543 0.895431,0 2,0 Z M3,3 L9,3 L9,4.5 L3,4.5 L3,3 Z M3,5.5 L11,5.5 L11,7 L3,7 L3,5.5 Z M3,8 L7,8 L7,9.5 L3,9.5 L3,8 Z"></path>
                    </svg>
                  </IconWrapper>
                  <span>My Pages</span>
                </FlexWrapper>
              </Link>
            </TopbarNavItem>
          </>
        )
      } else if (
        auth.currentUser() !== null &&
        auth.currentUser().app_metadata.roles[0] === "client"
      ) {
        return (
          <>
            <TopbarNavItem>
              <LogoutLink onClick={this.handleLogOut}>
                <FlexWrapper AlignedCentered>
                  <IconWrapper>
                    <svg viewBox="0 0 16 16" className="logInWeb">
                      <path d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M8,7L7.938,8h-1L7,7H5v2h1l1,1c0.313-0.333,1.021-1,2-1h1 l1,0.229C11.86,9.437,12.513,9.75,13,10v1l-0.938,1.407C10.993,13.393,9.569,14,8,14v-1l-1-1v-1l-2-1C4.018,9.547,3.25,8.938,3,8 L2.785,6c0-0.187,0.435-0.867,0.55-1L3.278,4.307C4.18,3.154,5.494,2.343,7,2.09V3.5L8,4c0.3,0,0.609-0.045,1-0.417 C9.382,3.22,9.719,3,10,3c0.698,0,1,0.208,1,1l-0.5,1h-0.311C9.612,5.279,9.261,5.506,9,6C8.749,6.475,8.475,6.773,8,7z M13,8 c-0.417-0.25-0.771-0.583-1-1V6l0.797-1.593C13.549,5.409,14,6.65,14,8c0,0.165-0.012,0.326-0.025,0.488L13,8z"></path>
                    </svg>
                  </IconWrapper>
                  <span>Logout</span>
                </FlexWrapper>
              </LogoutLink>
            </TopbarNavItem>
            <TopbarNavItem>
              <Link to={`/clients/${auth.currentUser().email.split("@")[0]}`}>
                <FlexWrapper AlignedCentered>
                  <IconWrapper>
                    <svg viewBox="0 0 14 14" className="folder">
                      <path d="M12,1.5 L2,1.5 C1.72386,1.5 1.5,1.72386 1.5,2 L1.5,12 C1.5,12.2761 1.72386,12.5 2,12.5 L12,12.5 C12.2761,12.5 12.5,12.2761 12.5,12 L12.5,2 C12.5,1.72386 12.2761,1.5 12,1.5 Z M2,0 L12,0 C13.1046,0 14,0.895431 14,2 L14,12 C14,13.1046 13.1046,14 12,14 L2,14 C0.89543,14 0,13.1046 0,12 L0,2 C0,0.89543 0.895431,0 2,0 Z M3,3 L9,3 L9,4.5 L3,4.5 L3,3 Z M3,5.5 L11,5.5 L11,7 L3,7 L3,5.5 Z M3,8 L7,8 L7,9.5 L3,9.5 L3,8 Z"></path>
                    </svg>
                  </IconWrapper>
                  <span>My Pages</span>
                </FlexWrapper>
              </Link>
            </TopbarNavItem>
          </>
        )
      } else {
        return (
          <TopbarNavItem>
            <Link to="/login">
              <FlexWrapper AlignedCentered>
                <IconWrapper>
                  <svg viewBox="0 0 16 16" className="logInWeb">
                    <path d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M8,7L7.938,8h-1L7,7H5v2h1l1,1c0.313-0.333,1.021-1,2-1h1 l1,0.229C11.86,9.437,12.513,9.75,13,10v1l-0.938,1.407C10.993,13.393,9.569,14,8,14v-1l-1-1v-1l-2-1C4.018,9.547,3.25,8.938,3,8 L2.785,6c0-0.187,0.435-0.867,0.55-1L3.278,4.307C4.18,3.154,5.494,2.343,7,2.09V3.5L8,4c0.3,0,0.609-0.045,1-0.417 C9.382,3.22,9.719,3,10,3c0.698,0,1,0.208,1,1l-0.5,1h-0.311C9.612,5.279,9.261,5.506,9,6C8.749,6.475,8.475,6.773,8,7z M13,8 c-0.417-0.25-0.771-0.583-1-1V6l0.797-1.593C13.549,5.409,14,6.65,14,8c0,0.165-0.012,0.326-0.025,0.488L13,8z"></path>
                  </svg>
                </IconWrapper>
                <span>Login</span>
              </FlexWrapper>
            </Link>
          </TopbarNavItem>
        )
      }
    }

    const checkLoading = () => {
      if (this.state.loading) {
        return (
          <div className="fixed-wrapper">
            <div className="loader-wrapper">
              <Spinner
                animation="border"
                role="status"
                className="bootstrap--loader"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          </div>
        )
      }
    }

    return (
      <StaticQuery
        query={graphql`
          query SearchIndexQuery {
            siteSearchIndex {
              index
            }
          }
        `}
        render={data => (
          <HeaderWrapper>
            {checkLoading()}
            <Topbar>
              <Container>
                <ContentBox>
                  <FlexWrapper FlexEnd>
                    <TopbarNav>{checkAuthentication()}</TopbarNav>
                  </FlexWrapper>
                </ContentBox>
              </Container>
            </Topbar>
            <HeaderContents>
              <Container>
                <FlexWrapper AlignedCentered>
                  <FlexColumn>
                    <StyledLink to="/">
                      <LogoWrapper>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 39 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M37.0761 10.4971L20.2839 0.767259C19.7576 0.431747 18.8486 0.431747 18.3224 0.767259L1.53006 10.4971C1.0038 10.7847 0.525391 11.5516 0.525391 12.2226V31.6344C0.525391 32.2575 0.955962 33.0243 1.53006 33.3599L18.3224 43.0897C18.8486 43.4252 19.7576 43.4252 20.2839 43.0897L37.0761 33.3599C37.6024 33.0723 38.0808 32.2575 38.0808 31.6344V12.2226C38.033 11.5516 37.6024 10.7847 37.0761 10.4971ZM32.1963 13.4688L34.11 12.3664C34.4927 12.1267 34.9711 12.2705 35.2103 12.654C35.4495 13.0374 35.306 13.5167 34.9233 13.7564L33.0096 14.8588C32.8661 14.9546 32.7704 14.9546 32.6269 14.9546C32.3399 14.9546 32.1007 14.8108 31.9571 14.5712C31.6701 14.1877 31.8136 13.7084 32.1963 13.4688ZM20.3317 24.972C20.5709 25.3555 20.4274 25.8348 20.0446 26.0744L14.7343 29.142C14.5907 29.1899 14.4951 29.2378 14.3515 29.2378C14.0645 29.2378 13.8253 29.0941 13.6817 28.8544C13.4425 28.471 13.5861 27.9917 13.9688 27.752L19.2792 24.6845C19.6619 24.4448 20.1403 24.5886 20.3317 24.972ZM17.3655 16.5363L14.9735 17.9263C14.8299 18.0222 14.7343 18.0222 14.5907 18.0222C14.3037 18.0222 14.0645 17.8784 13.921 17.6387C13.6817 17.2553 13.8253 16.776 14.208 16.5363L16.6001 15.1463C16.9828 14.9067 17.4612 15.0505 17.7004 15.4339C17.8439 15.8653 17.7483 16.3446 17.3655 16.5363ZM17.7483 18.0701C18.131 17.8304 18.6094 17.9742 18.8486 18.3577C19.0878 18.7411 18.9443 19.2204 18.5616 19.4601L17.6526 19.9873C17.5091 20.0832 17.4134 20.0832 17.2698 20.0832C16.9828 20.0832 16.7436 19.9394 16.6001 19.6997C16.3609 19.3163 16.5044 18.837 16.8871 18.5973L17.7483 18.0701ZM15.404 23.1986C15.7868 23.0069 16.2652 23.1028 16.4565 23.4862C16.6958 23.8697 16.5522 24.349 16.1695 24.5886L14.7343 25.4514C14.5907 25.5472 14.4951 25.5472 14.3515 25.5472C14.0645 25.5472 13.8253 25.4034 13.6817 25.1638C13.4425 24.7803 13.5861 24.301 13.9688 24.0614L15.404 23.1986ZM15.3562 4.84133L18.8486 2.82826C19.2313 2.58861 19.7098 2.7324 19.949 3.11584C20.1882 3.49929 20.0446 3.97859 19.6619 4.21824L16.1695 6.23131C16.026 6.32717 15.9303 6.32717 15.7868 6.32717C15.4997 6.32717 15.2605 6.18338 15.117 5.94373C14.8299 5.51236 14.9735 5.03305 15.3562 4.84133ZM18.7051 8.38817L16.7436 9.5385C16.6001 9.63436 16.5044 9.63436 16.3609 9.63436C16.0738 9.63436 15.8346 9.49057 15.6911 9.25092C15.4519 8.86748 15.5954 8.38817 15.9781 8.14852L17.9396 6.9982C18.3224 6.75854 18.8008 6.90234 19.04 7.28578C19.1835 7.71715 19.0878 8.19645 18.7051 8.38817ZM3.39587 11.7912L10.7634 7.52543C11.1462 7.28578 11.6246 7.42957 11.8638 7.81301C12.103 8.19645 11.9595 8.67576 11.5767 8.91541L4.16133 13.1812C4.01781 13.2291 3.92212 13.2771 3.7786 13.2771C3.49155 13.2771 3.25235 13.1333 3.10882 12.8936C2.86961 12.5102 3.01314 12.0309 3.39587 11.7912ZM3.7786 16.9677C3.49155 16.9677 3.25235 16.8239 3.10882 16.5843C2.86961 16.2008 3.01314 15.7215 3.39587 15.4819L13.5382 9.58643C13.921 9.34678 14.3994 9.49057 14.6386 9.87401C14.8778 10.2575 14.7343 10.7368 14.3515 10.9764L4.16133 16.8239C4.06565 16.9198 3.92212 16.9677 3.7786 16.9677ZM5.21384 19.7956C4.92679 19.7956 4.68758 19.6518 4.54406 19.4121C4.30485 19.0287 4.44838 18.5494 4.83111 18.3097L18.9443 10.1616C19.327 9.92194 19.8054 10.0657 20.0446 10.4492C20.2839 10.8326 20.1403 11.3119 19.7576 11.5516L5.64441 19.6997C5.50089 19.7477 5.35736 19.7956 5.21384 19.7956ZM7.03181 22.4317C6.74476 22.4317 6.50555 22.288 6.36203 22.0483C6.12282 21.6649 6.26635 21.1856 6.64908 20.9459L10.7634 18.5494C11.1462 18.3097 11.6246 18.4535 11.8638 18.837C12.103 19.2204 11.9595 19.6997 11.5767 19.9394L7.46238 22.3359C7.31886 22.3838 7.17533 22.4317 7.03181 22.4317ZM10.7156 23.9655C10.4285 23.9655 10.1893 23.8217 10.0458 23.5821C9.8066 23.1986 9.95013 22.7193 10.3329 22.4797L13.0598 20.898C13.4425 20.6583 13.921 20.8021 14.1602 21.1856C14.3994 21.569 14.2558 22.0483 13.8731 22.288L11.1462 23.8697C11.0026 23.9176 10.8591 23.9655 10.7156 23.9655ZM16.6479 39.0636C16.5044 39.1594 16.4087 39.1594 16.2652 39.1594C15.9781 39.1594 15.7389 39.0156 15.5954 38.776C15.3562 38.3925 15.4997 37.9132 15.8825 37.6736L19.949 35.325C20.3317 35.0853 20.8101 35.2291 21.0493 35.6126C21.2885 35.996 21.145 36.4753 20.7623 36.715L16.6479 39.0636ZM21.8148 39.7346L19.6141 41.0287C19.4705 41.0766 19.3749 41.1246 19.2313 41.1246C18.9443 41.1246 18.7051 40.9808 18.5616 40.7411C18.3224 40.3577 18.4659 39.8784 18.8486 39.6387L21.0493 38.3446C21.432 38.1529 21.9105 38.2487 22.1497 38.6322C22.341 39.0156 22.1975 39.5429 21.8148 39.7346ZM22.2453 32.1137L16.1695 35.6605C16.026 35.7564 15.8824 35.7564 15.7868 35.7564C15.4997 35.7564 15.2605 35.6126 15.117 35.3729C14.8778 34.9895 15.0213 34.5102 15.404 34.2705L21.4799 30.7237C21.8626 30.484 22.341 30.6278 22.5802 31.0113C22.7716 31.3947 22.6281 31.874 22.2453 32.1137ZM23.7763 27.5603L13.299 33.6474C13.1555 33.7433 13.0598 33.7433 12.9163 33.7433C12.6292 33.7433 12.39 33.5995 12.2465 33.3599C12.0073 32.9764 12.1508 32.4971 12.5336 32.2575L23.0586 26.1703C23.4414 25.9307 23.9198 26.0744 24.159 26.4579C24.3025 26.8413 24.159 27.3206 23.7763 27.5603ZM35.8801 27.6561L35.1147 28.0875C34.9711 28.1834 34.8754 28.1834 34.7319 28.1834C34.4449 28.1834 34.2057 28.0396 34.0621 27.7999C33.8229 27.4165 33.9665 26.9372 34.3492 26.6975L35.1147 26.2662C35.4974 26.0265 35.9758 26.1703 36.215 26.5538C36.4064 26.9372 36.2628 27.4165 35.8801 27.6561ZM35.9758 24.1572L34.4927 25.02C34.3492 25.1158 34.2535 25.1158 34.11 25.1158C33.8229 25.1158 33.5837 24.972 33.4402 24.7324C33.201 24.349 33.3445 23.8697 33.7273 23.63L35.2103 22.7673C35.5931 22.5276 36.0715 22.6714 36.3107 23.0548C36.5021 23.4383 36.3585 23.9655 35.9758 24.1572ZM35.9758 20.4666L33.5359 21.8566C33.3924 21.9524 33.2967 21.9524 33.1532 21.9524C32.8661 21.9524 32.6269 21.8087 32.4834 21.569C32.2442 21.1856 32.3877 20.7063 32.7704 20.4666L35.2103 19.0766C35.5931 18.837 36.0715 18.9808 36.3107 19.3642C36.5021 19.7956 36.3585 20.2749 35.9758 20.4666ZM35.9758 16.776L30.7611 19.7956C30.6176 19.8435 30.5219 19.8914 30.3784 19.8914C30.0913 19.8914 29.8521 19.7477 29.7086 19.508C29.4694 19.1246 29.6129 18.6453 29.9956 18.4056L35.2103 15.386C35.5931 15.1463 36.0715 15.2901 36.3107 15.6736C36.5021 16.1049 36.3585 16.5843 35.9758 16.776Z"
                            fill="rgb(72, 72, 72)"
                          ></path>{" "}
                        </svg>
                        <LogoTitle>dev&designatoneims.</LogoTitle>
                      </LogoWrapper>
                    </StyledLink>
                  </FlexColumn>
                  <FlexColumn>
                    <Search searchIndex={data.siteSearchIndex.index} />
                  </FlexColumn>
                </FlexWrapper>
              </Container>
            </HeaderContents>
          </HeaderWrapper>
        )}
      />
    )
  }
}

export default Header
