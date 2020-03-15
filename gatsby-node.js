const { slugify } = require("./src/util/utilityFunctions.js")
const path = require("path")
const _ = require("lodash")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const templates = {
    singlePost: path.resolve("src/templates/single-post.js"),
    tagsPage: path.resolve("src/templates/tags-page.js"),
  }

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags {
                title
              }
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)
    const posts = res.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          // Passing slug for template to use to get post
          slug: node.fields.slug,
        },
      })
    })
    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags.title")) {
        tags = tags.concat(edge.node.frontmatter.tags.title)
      }
    })
    let tagPostCounts = {}
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
    })
    tags = _.uniq(tags)
    tags.forEach(tag => {
      if (tag !== "RemoveFromIndex") {
        createPage({
          path: `tag/${slugify(tag)}`,
          component: templates.tagsPage,
          context: {
            tag,
          },
        })
      }
    })
  })
}
