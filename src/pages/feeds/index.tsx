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
import { Button } from '@mui/joy'

const inter = Inter({ subsets: ['latin'] })

export default function Feeds() {
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
          <NavLinks />
        </div>
        <div style={{ marginBottom: "2rem" }} />
        <div style={{ textAlign: "left", alignItems: "left", display: "flex", flexDirection: "column", gap: "2rem", minWidth: "50%" }}>
          <Button color="neutral" component={Link} target="_blank" href="/rss.xml">RSS (XML)</Button>
          <Button color="neutral" component={Link} target="_blank" href="/rss.json">RSS (JSON)</Button>
          <Button color="neutral" component={Link} target="_blank" href="/atom.xml">Atom (XML)</Button>
        </div>
      </main>
    </>
  )
}
