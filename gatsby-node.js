const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = function({ actions: { createNodeField }, getNode, node }) {
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: '.'
    })

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
    return;
  }
}

exports.createPages = async function({ actions: { createPage }, graphql }) {
  const result = await graphql(`
    {
      markdown:allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => res.data)

  const contentTemplate = path.resolve('src/templates/content.js')

  result.markdown.edges.forEach(({ node }) => {
    const { slug } = node.fields;
    createPage({
      component: contentTemplate,
      path: slug,
      context: {
        slug
      }
    })
  })
}
