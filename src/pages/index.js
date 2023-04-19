import fs from 'fs'
import Head from 'next/head'
import path from 'path'
import matter from 'gray-matter'
import Post from '@/components/Post'

export default function Home({posts}) {
  return (
    <>
      <Head>
        <title>Dev Blog</title>
      </Head>
      
      <div className="posts">
        {posts.map((post, index) => (
          <Post post={post}/>
        ))}
      </div>
    </>
  )
}

export async function getStaticProps() {
  //Get files from the posts dir
  const files = fs.readdirSync(path.join('src/posts'))

  //Get slug and frontmatter from posts
  const posts = files.map(filename => {
    //Creat slug
    const slug = filename.replace('.md', '')

    //Get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('src/posts', filename), 'utf-8')

    const {data:frontmatter} = matter(markdownWithMeta)
    return {
      slug,
      frontmatter
    }
  })

  return {
    props: {
      posts,
    },
  }
}
