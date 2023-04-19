import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'

export default function PostPage({frontmatter: {title, date, cover_image}, slug, content}) {
  return (
    <>
        <Link href='/'>
            <button className="btn btn-back">Go Back</button>

            <div className="card cardpage">
                <h1 className="post-title">{title}</h1>
                <div className="post-date">Post on {date}</div>
                <img src={cover_image} alt="" />
                <div className="post-body">
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                </div>
                
            </div>
        </Link>
    </>
  )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('src/posts'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))

    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({params: {slug}}) {

    const markdownWithMeta = fs.readFileSync(path.join('src/posts', slug + '.md'), 'utf-8')

    const {data:frontmatter, content} = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content
        }
    }
}