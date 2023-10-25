import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getAllPostsPath, getPostData } from '@/lib/getPostsData';
import { Inter } from 'next/font/google';
import styles from '@/styles/BlogPost.module.css'
import Link from 'next/link';
import dayjs from 'dayjs';
import { Alert, Container } from '@mui/joy';
import InfoIcon from '@mui/icons-material/Info';
import NavLinks from '@/Components/NavLinks';

const components = {
  h1: (props: any) => <h1 style={{
    fontSize: 'calc(1rem + 1.5vw)',
    // color: 'black',
    margin: '1vh 0 1vh 0',
  }}
    {...props} />,

  p: (props: any) => <p style={{
    fontSize: 'calc(1rem + 0.1vw)',
    // color: '#000000e6',
    margin: '0vh 0 1vh 0'
  }}
    {...props} />,

  // TestComponent: (props: any) => <TestComponent {...props} />,
  Link: (props: any) => <Link {...props} />,
  Alert: (props: any) => <Alert {...props} />,
  InfoIcon: (props: any) => <InfoIcon {...props} />,
}

const inter = Inter({ subsets: ['latin'] })

export default function Blog({ postMetadata, postContent }: { postMetadata: any, postContent: any }) {
  return (
    <>
      {postMetadata.isPublished ? <>
        <Head>
          <title>{`${postMetadata.title} | s3cpat.txt`}</title>
          <meta name="description" content={`[s3cpat's Blog | ${dayjs(postMetadata.date).format('MMM. DD, YYYY')}] ${postMetadata.description}`} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.navMain}>
          <div
            className={styles.nav}
          >
            <NavLinks />
          </div>
        </div>
        <main className={`${styles.main} ${inter.className}`}>
          <Container>
            <div>
              <div className='blog-content'>
                <div style={{ marginTop: "1rem" }} />
                <p className={styles.postDate}>Posted {dayjs(postMetadata.date).format('MMM. DD, YYYY')}</p>
                <div style={{ marginTop: "1rem" }} />
                <div className={styles.postMDXBody }>
                  <MDXRemote {...postContent} components={components} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "3rem" }} />
            <div className={`${styles.blogReturnHome}`}>
              <p><Link href="/">{`<--`} Return Home</Link></p>
            </div>
            <div style={{ marginTop: "3rem" }} />
          </Container>
        </main>
      </> : <>
        <Head>
          <title>{`Post not found :( | s3cpat.txt`}</title>
          <meta name="description" content="Post Not Found | s3cpat's Blog" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <div>
            <div className='blog-content'>
              <p>Post not found.</p>
            </div>
          </div>
        </main>
      </>}
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostsPath();
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: any }) {
  const postData = await getPostData(params.id);
  const mdxSource = await serialize(postData.content);
  return {
    props: {
      postMetadata: postData.metadata,
      postContent: mdxSource,
      id: params.id,
    }
  }
}