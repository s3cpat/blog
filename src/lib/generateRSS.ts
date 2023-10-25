import fs from 'fs';
import { Feed } from 'feed';
import { getPostsMetaData } from './getPostsData';

export default async function generateRssFeed() {
  const site_url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const postsData = getPostsMetaData();

  const feedOptions = {
    title: 's3cpat.txt | RSS Feed',
    description: 'Blog posts by s3cpat.',
    id: site_url,
    link: site_url,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
      json: `${site_url}/rss.json`,
      atom: `${site_url}/atom.xml`,
    },
    // image_url: `${site_url}/logo.png`,
    // pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, s3cpat`,
  };

  const feed = new Feed(feedOptions);
  postsData.map((post: { title: any; description: any; id: any; date: any; }) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.id}`,
      link: `${site_url}/blog/${post.id}`,
      description: post.description,
      date: new Date(post.date),
    })
  });

  fs.writeFileSync('./public/rss.xml', feed.rss2());
  // write other feed formats to public folder
  fs.writeFileSync('./public/rss.json', feed.json1());
  fs.writeFileSync('./public/atom.xml', feed.atom1());

}