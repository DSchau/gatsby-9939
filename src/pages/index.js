import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
    </div>
    <ul>
    {
      data.paths.edges.map(({ node }) => (
        <li key={node.path}><Link to={node.path}>{node.path}</Link></li>
      ))
    }
    </ul>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  {
    paths:allSitePage(filter:{path:{ne:"/dev-404-page/"}}) {
      edges {
        node {
          path
        }
      }
    }
  }
`