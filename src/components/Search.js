import React, { Component } from "react"
import { Index } from "elasticlunr"
import SearchListItem from "./SearchListItem"
import styled from "styled-components"
import { ContentBox } from "./StyledElements"

const SearchBarWrapper = styled.div`
  position: relative;
`

const SearchBarForm = styled.form``

const SearchBarInput = styled.input`
  background-color: var(--theme-ui-colors-themedInput-background, #f5f5f5);
  border: 0;
  border-radius: 4px;
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.25rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 2rem;
  -webkit-transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1),
    padding 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1),
    padding 250ms cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: var(--theme-ui-colors-text, #36313d);
  overflow: hidden;
  font-weight: 600;
  padding-right: 4rem;
  @media (min-width: 992px) {
    padding-right: 12rem;
  }
`

const SearchBarLabel = styled.label`
  position: relative;
  width: 100%;
  -webkit-transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1),
    padding 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1),
    padding 250ms cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 0;
`

const SearchList = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 420px;
  overflow-y: scroll;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: #f5f5f5;
  z-index: 99;
  margin-top: -0.2rem;
  //   box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2), 0 2px 3px 0 rgba(0, 0, 0, 0.1);
`

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
      notFound: false,
      active: false,
    }
  }

  closeSearchBar = () => {
    this.setState({
      query: ``,
      results: [],
      notFound: false,
    })
  }

  escFunction = e => {
    if (e.keyCode === 27) {
      this.closeSearchBar()
    }
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return
    }
    this.setState({
      active: false,
    })
  }

  makeSearchActive = () => {
    this.setState({
      active: true,
    })
  }

  handleInputClick = () => {
    this.makeSearchActive()
  }

  componentWillMount() {
    if (typeof document !== `undefined`) {
      document.addEventListener("mousedown", this.handleClick, false)
      document.addEventListener("keydown", this.escFunction, false)
    }
  }

  componentWillUnmount() {
    if (typeof document !== `undefined`) {
      document.removeEventListener("mousedown", this.handleClick, false)
      document.removeEventListener("keydown", this.escFunction, false)
    }
  }

  render() {
    const checkResults = () => {
      this.setState({
        notFound: true,
      })
      if (this.state.results.length > 0) {
        this.setState({
          notFound: false,
        })
      }
      this.setState({
        active: true,
      })
    }

    const handleKeyDown = () => {
      checkResults()
    }

    const renderDefaultSearch = () => {
      if (this.state.notFound && this.state.query.length !== 0) {
        return (
          <SearchListItem
            title="Oops, no results found..."
            categoryTitle="Try searching something else."
          ></SearchListItem>
        )
      }
    }

    return (
      <>
        <SearchBarWrapper ref={node => (this.node = node)}>
          <ContentBox>
            <SearchBarForm>
              <SearchBarLabel>
                <SearchBarInput
                  type="text"
                  value={this.state.query}
                  onChange={this.search}
                  placeholder="Search dev&design"
                  onKeyUp={handleKeyDown}
                  onClick={this.handleInputClick}
                />
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  height="1em"
                  width="1em"
                  viewBox="0 0 40 40"
                  focusable="false"
                  aria-hidden="true"
                  className="css-1vv0t48"
                >
                  <g>
                    <path d="m15.9 23.4c4.1 0 7.5-3.4 7.5-7.5s-3.4-7.5-7.5-7.5-7.5 3.3-7.5 7.5 3.3 7.5 7.5 7.5z m10 0l8.2 8.2-2.5 2.5-8.2-8.2v-1.4l-0.5-0.4c-1.9 1.6-4.4 2.5-7 2.5-6.1 0-10.9-4.7-10.9-10.7s4.8-10.9 10.9-10.9 10.7 4.8 10.7 10.9c0 2.6-0.9 5.1-2.5 7l0.4 0.5h1.4z"></path>
                  </g>
                </svg>
              </SearchBarLabel>
            </SearchBarForm>
          </ContentBox>
          <ContentBox>
            {this.state.active ? (
              <SearchList>
                {renderDefaultSearch()}
                {this.state.results.map(page => (
                  <SearchListItem
                    WithIcon
                    key={page.id}
                    title={page.title}
                    categoryTitle={page.tags}
                    destination={page.slug}
                  ></SearchListItem>
                ))}
              </SearchList>
            ) : (
              ""
            )}
          </ContentBox>
        </SearchBarWrapper>
      </>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, {})
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}
