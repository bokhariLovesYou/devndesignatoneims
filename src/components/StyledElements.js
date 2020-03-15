import styled from "styled-components"

export const FlexWrapper = styled.div`
  display: flex;
  align-items: ${props => (props.AlignedCentered ? "center" : "")};
  justify-content: space-between;
`

export const HeadingLarge = styled.h1``

export const FlexColumn = styled.div``

export const ContentBox = styled.div``

export const Section = styled.section`
  padding: 2rem 0;
  padding: ${props => (props.Medium ? "3rem 0" : "")};
  padding: ${props => (props.Large ? "4rem 0" : "")};
`

export const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${props => (props.Light ? "rgb(118, 118, 118)" : "")};
`

export const CardWrapper = styled.div``

export const CardContents = styled.div``

export const ImageWrapper = styled.div`
  margin-right: ${props => (props.MarginRight ? "1rem" : "")};
`

export const CardData = styled.div`
  padding: 1rem 0;
`
export const HeadingMedium = styled.h2``

export const CardHeading = styled.h2`
  font-size: 1.25rem;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
  margin-bottom: 0;
`

export const CardHeadingSmall = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0;
`

export const CategoryWrapper = styled.div``

export const CategoryContent = styled.div``

export const CategoryContentWrap = styled.div``

export const CategoryTitleWrap = styled.div``

export const CategoryTitle = styled.h3`
  font-size: 1.1rem;
`

export const CategoryDescriptionWrap = styled.div``

export const CategoryDescription = styled.p``

export const Line = styled.hr``

export const PageListWrapper = styled.div``

export const PageListContents = styled.div``

export const PageItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem;
  border-radius: 4px;
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`

export const SearchItemWrapper = styled.div`
  display: flex;
  align-items: center;
  align-items: ${props => (props.FlexStart ? "flex-start" : "")};
  padding: 0.8rem;
  border-top: 1px solid #ddd;
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`

export const CategorySearchItemTitle = styled.p`
  margin-bottom: 0;
  margin-top: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(55, 53, 47, 0.6);
  font-size: 12px;
  overflow: hidden;
`

export const PageIconWrapper = styled.div`
  margin-right: 0.5rem;
  margin-right: ${props => (props.LargeMargin ? "1rem" : "")};
`

export const PageTitleWrapper = styled.div``

export const SearchTitleWrapper = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  overflow: hidden;
`

export const SearchMetaWrapper = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 2rem;
  width: 100%;
`

export const PageTitle = styled.h2`
  margin-bottom: 0;
  font-size: 1rem;
`

export const CategoryImageLoopWrapper = styled.div`
  position: relative;
  margin: 1rem 0 1.5rem 0;
  max-width: 43.75em;
`

export const CategoryImageLoop = styled.div`
  height: 100px;
  background-image: url(https://airbnb.io/img/projects/airpal2.png);
  background-size: contain;
`
export const CategoryImageLoopTint = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.8),
    rgb(255, 255, 255)
  );
`

export const PostMetaWrapper = styled.div``

export const FeaturedImage = styled.div`
  margin: 1.5rem 0;
`
export const Article = styled.article``

export const ArticleContents = styled.div`
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  a {
    color: #e83e8c;
    font-weight: bold;
  }
  ul li,
  ol li {
    margin-bottom: 0.5rem;
  }
  img,
  iframe {
    width: auto;
    height: auto;
    margin: 1rem 0;
    max-width: 100%;
  }
  blockquote {
    border-style: solid;
    border-width: 1px;
    padding: 1rem 1.25rem;
    position: relative;
    background-color: #fdf3e1;
    border: 0;
    color: #33475b;
    border-radius: 0;
    margin: 1.25rem 0;
    font-weight: 600;
    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

export const PostCategoryMeta = styled.span`
  display: block;
`
