const fs = require('fs');
const path = require('path');
const matter = require("gray-matter");

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), 'src', 'posts');
const mdx_file_extention = '.mdx';

function getAllFilesInDirectory() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName: any) => {
    return path.parse(fileName)
  })
}

function getMdxFiles() {
  const allFiles = getAllFilesInDirectory();
  return allFiles.filter((parsedFile: { ext: string; }) => parsedFile.ext == mdx_file_extention);
}

export function getAllPostsPath() {
  const allMdxFiles = getMdxFiles();
  return allMdxFiles.map((parsedFile: { name: any; }) => {
    return {
      params: {
        id: parsedFile.name
      }
    }
  })
}

export function getPostsMetaData() {
  const allMdxFiles = getMdxFiles();

  const postsMetaData = allMdxFiles.map((parsedFile: { base: any; name: any; }) => {
    const fullPath = path.join(postsDirectory, parsedFile.base);

    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // get metadata, content
    const { data, content } = matter(fileContents);
    let metadata = data;
    metadata['id'] = parsedFile.name;
    return metadata;
  }).filter((m: any) => {
    if(m.isPublished && m.isPublished === true){
      return true;
    }
    return false;
  }).sort((a: any, b: any) => {
    let postADate = new Date(a.date);
    let postBDate = new Date(b.date);
    if (postADate < postBDate) return 1;
    return -1
  } );
  return postsMetaData;
}

export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, id + mdx_file_extention);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // get metadata, content
  const { data, content } = matter(fileContents);

  let metadata = data;
  metadata['id'] = id;

  return {'metadata': metadata, 'content': content};
}