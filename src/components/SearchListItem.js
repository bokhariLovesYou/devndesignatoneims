import React, { Component } from "react"
import {
  SearchItemWrapper,
  PageIconWrapper,
  SearchMetaWrapper,
  SearchTitleWrapper,
  CategorySearchItemTitle,
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
        <SearchItemWrapper FlexStart>
          {this.props.WithIcon ? (
            <PageIconWrapper>
              <svg viewBox="0 0 30 30" className="page search-item">
                <g>
                  {" "}
                  <path d="M16,1H4v28h22V11L16,1z M16,3.828L23.172,11H16V3.828z M24,27H6V3h8v10h10V27z M8,17h14v-2H8V17z M8,21h14v-2H8V21z M8,25h14v-2H8V25z"></path>{" "}
                </g>
              </svg>
            </PageIconWrapper>
          ) : (
            ""
          )}
          <SearchMetaWrapper>
            <SearchTitleWrapper>{this.props.title}</SearchTitleWrapper>
            <CategorySearchItemTitle>
              {this.props.categoryTitle}
            </CategorySearchItemTitle>
          </SearchMetaWrapper>
        </SearchItemWrapper>
      </StyledLink>
    )
  }
}

export default PageListItem
