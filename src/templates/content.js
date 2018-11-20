import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export default function Content({ data: { markdown }}) {
  return (
    <Layout>
      <h1>{markdown.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: markdown.html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query GetContentPage($slug: String!) {
    markdown:markdownRemark(fields:{slug:{eq:$slug}}) {
      html
      frontmatter {
        title
      }
    }
  }
`