import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getPostsMetaData } from '@/lib/getPostsData'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react'
import NavLinks from '@/Components/NavLinks'
import dayjs from 'dayjs'
import generateRssFeed from '@/lib/generateRSS'

const inter = Inter({ subsets: ['latin'] })

export default function Home({postsData}: {postsData: any}) {
  return (
    <>
      <Head>
        <title>s3cpat.txt</title>
        <meta name="description" content="s3cpat's Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          {/* <p>
            s3cpat.txt
          </p> */}
          <NavLinks />
        </div>
        <div className={`${styles.homepagePosts}`}>
          <h1>Recent Posts</h1>
          {postsData.map((metadata: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; date: string; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined }) => {
          return (
            <div key = {metadata.id}>
              <h2 className='post-title'><Link href={`/blog/${metadata.id}`}>{metadata.title}</Link></h2>
              <p className={styles.postDate}>{dayjs(metadata.date).format('MMM. DD, YYYY')}</p>
              <p className='post-description'>{metadata.description}</p>
              <br />
              <p><Link href={`/blog/${metadata.id}`}>Read post --{'>'}</Link></p>
            </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  await generateRssFeed();
  const postsData = getPostsMetaData();
  return {
    props: {
      postsData: postsData,
    }
  }
}