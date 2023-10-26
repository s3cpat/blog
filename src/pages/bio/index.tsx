import Head from 'next/head';
import React from 'react'
import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'
import NavLinks from '@/Components/NavLinks';
import { Alert } from '@mui/joy';
import InfoIcon from '@mui/icons-material/Info';

const inter = Inter({ subsets: ['latin'] })

function Bio() {
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
        <div className={`${styles.homepagePosts}`}>
          <h1>About</h1>
          <div className={`${styles.bioBody}`}>
            <p>
              <b>My name is Pat</b> (in case you couldn&apos;t guess from my handle, <b>s3cpat</b>). My pronouns are <b>he/him or they/them</b>.
            </p>
            <p>
              I am an <b>information security professional</b> living in Pennsylvania, USA. I am currently a <b>Senior Information Security Consultant</b>, where my job responsibilities include security engineering efforts like <b>SOAR</b> automation, <b>detection rule</b> creation and tuning, and much, much more.
            </p>

            <Alert startDecorator={<InfoIcon />} color="neutral" variant="outlined">Any opinions on this blog are my own and do not necessarily reflect the opinions of my employer.</Alert>

            <p>
              Prior to my current employer, I worked on information security teams in the insurance and healthcare industries.
            </p>

            <p>I attended <b>The Pennsylvania State University</b> where I earned a degree in <b>Security and Risk Analysis</b> focusing on <b>Information and Cyber Security</b>.
            </p>

            <hr />

            <p>
              I am starting this blog to provide a space to share my thoughts and experiences as I explore my own personal projects that may related to security... sometimes. Other times, expect non-security-but-likely-still-technology-related blog posts. 
            </p>

            <p>I aim to write for fellow computer security and technology enthusiasts; where appropriate, I will strive to include helpful background information (or at least link to places one can learn more).</p>

            <p>I don&apos;t expect every post will be extremely formal, but we&apos;ll see how things go. {`:)`}</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Bio