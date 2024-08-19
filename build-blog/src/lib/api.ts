import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// get directory of _post
const postsDirectory = join(process.cwd(), "_posts");

export function getPosts() {
  return fs.readdirSync(postsDirectory);
}

// get specified post
export function getPostById(post: string, onlyMeta?: boolean) {
  try {
    const postData = readPost(post);
    const { data, content } = matter(postData) as unknown as {
      data: PostFileMeta;
      content: string;
    };

    if (!data || !content) {
      return null;
    }

    if (onlyMeta) {
      return data;
    }

    return content;
  } catch (err) {
    // if(err instanceof)
    console.log("error", err);
    return null;
  }
}

function readPost(postFile: string) {
  // format params to make sure it is correct
  const formatID = postFile.replace(/\.md$/, "");
  // get specified post md file
  const fullPath = join(postsDirectory, `${formatID}.md`);
  //read content
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  return fileContent;
}

export function getPostCards() {
  const allPostFiles = getPosts();

  const allPostMeta: PostMetaData[] = [];

  for (let i = 0; i < allPostFiles.length; i++) {
    const postData = getPostById(allPostFiles[i], true) as null | PostMetaData;
    if (postData) {
      const finalData = {
        ...postData,
        fileName: allPostFiles[i].replace(/\.md$/, ""),
      };
      allPostMeta.push(finalData);
    }
  }

  allPostMeta.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return allPostMeta;
}
