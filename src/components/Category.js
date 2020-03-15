import React, { Component } from "react"
import Img from "gatsby-image"
import {
  ImageWrapper,
  CategoryWrapper,
  CategoryContent,
  FlexWrapper,
  FlexColumn,
  CategoryContentWrap,
  CategoryTitleWrap,
  CategoryTitle,
  CategoryDescriptionWrap,
  CategoryDescription,
} from "./StyledElements"
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

class Category extends Component {
  render() {
    return (
      <StyledLink to={this.props.destination}>
        <CategoryWrapper>
          <CategoryContent>
            <FlexWrapper>
              <FlexColumn>
                <ImageWrapper MarginRight>
                  <Img
                    className="category-image"
                    imgStyle={{
                      objectFit: "contain",
                      objectPosition: "50% 50%",
                    }}
                    fluid={this.props.iconSrc}
                    alt="Blog Image"
                  />
                </ImageWrapper>
              </FlexColumn>
              <FlexColumn>
                <CategoryContentWrap>
                  <CategoryTitleWrap>
                    <CategoryTitle>{this.props.title}</CategoryTitle>
                    <CategoryDescriptionWrap>
                      <CategoryDescription>
                        {this.props.description}
                      </CategoryDescription>
                    </CategoryDescriptionWrap>
                  </CategoryTitleWrap>
                </CategoryContentWrap>
              </FlexColumn>
            </FlexWrapper>
          </CategoryContent>
        </CategoryWrapper>
      </StyledLink>
    )
  }
}

export default Category
