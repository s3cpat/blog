/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  // target: 'serverless',
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX(nextConfig);
