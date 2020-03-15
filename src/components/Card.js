import React, { Component } from "react"
import Img from "gatsby-image"
import {
  CardWrapper,
  CardContents,
  ImageWrapper,
  CardData,
  CardHeadingSmall,
  CardHeading,
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

class Card extends Component {
  render() {
    return (
      <StyledLink to={this.props.destination}>
        <CardWrapper>
          <CardContents>
            <ImageWrapper>
              <Img
                className={
                  this.props.Featured ? "equip-height" : "default-card"
                }
                fluid={this.props.imageSrc}
                alt="Blog Image"
              />
            </ImageWrapper>
            <CardData>
              {this.props.Featured ? (
                <CardHeading>{this.props.title}</CardHeading>
              ) : (
                <CardHeadingSmall>{this.props.title}</CardHeadingSmall>
              )}
            </CardData>
          </CardContents>
        </CardWrapper>
      </StyledLink>
    )
  }
}

export default Card
