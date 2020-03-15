import React, { Component } from "react"
import {
  PageItemWrapper,
  PageIconWrapper,
  PageTitleWrapper,
  PageTitle,
} from "../components/StyledElements"
import { Link } from "gatsby"
import styled from "styled-components"
const StyledLink = styled(props => <Link {...props} />)`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`

class PageListItem extends Component {
  render() {
    return (
      <StyledLink to={this.props.destination}>
        <PageItemWrapper>
          <PageIconWrapper>
            {this.props.Folder ? (
              <svg viewBox="0 0 14 14" className="folder">
                <path d="M12,1.5 L2,1.5 C1.72386,1.5 1.5,1.72386 1.5,2 L1.5,12 C1.5,12.2761 1.72386,12.5 2,12.5 L12,12.5 C12.2761,12.5 12.5,12.2761 12.5,12 L12.5,2 C12.5,1.72386 12.2761,1.5 12,1.5 Z M2,0 L12,0 C13.1046,0 14,0.895431 14,2 L14,12 C14,13.1046 13.1046,14 12,14 L2,14 C0.89543,14 0,13.1046 0,12 L0,2 C0,0.89543 0.895431,0 2,0 Z M3,3 L9,3 L9,4.5 L3,4.5 L3,3 Z M3,5.5 L11,5.5 L11,7 L3,7 L3,5.5 Z M3,8 L7,8 L7,9.5 L3,9.5 L3,8 Z"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 30 30" className="page">
                <g>
                  {" "}
                  <path d="M16,1H4v28h22V11L16,1z M16,3.828L23.172,11H16V3.828z M24,27H6V3h8v10h10V27z M8,17h14v-2H8V17z M8,21h14v-2H8V21z M8,25h14v-2H8V25z"></path>{" "}
                </g>
              </svg>
            )}
          </PageIconWrapper>
          <PageTitleWrapper>
            <PageTitle>{this.props.title}</PageTitle>
          </PageTitleWrapper>
        </PageItemWrapper>
      </StyledLink>
    )
  }
}

export default PageListItem
