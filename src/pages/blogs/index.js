import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../../components/Layout"
import * as styles from "../../styles/blogs.module.css"
import BlogCard from "../../components/BlogCard"
import Sidebar from "../../components/Sidebar"

export default function Blogs({ data }) {
  const blogs = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <section className={styles.header}>
        <div className={styles.blogsContainer}>
          <h2>Blogs</h2>
          <h3>My News & Updates</h3>
          <div className={styles.blogs}>
            {blogs.map(blog => (
              <Link to={"/blogs/" + blog.frontmatter.slug} key={blog.id}>
                <BlogCard blog={blog} />
              </Link>
            ))}
          </div>
        </div>
        <Sidebar markdowns={blogs} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query BlogsPage {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { eq: "blog" } } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          cardDate: date(formatString: "LL")
          listDate: date(formatString: "M/D/YY")
          tags
          type
          description
        }
        id
      }
    }
  }
`
