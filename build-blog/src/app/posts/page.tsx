import { PostsSearchResults } from "@/components/pageComponents/postsComponents/Posts";
import { getPostCards } from "@/lib/api";

export default function Posts() {
  const allPostCards = getPostCards();
  return (
    <main>
      <article className="w-[42rem] flex flex-col items-center justify-center m-auto gap-10">
        <PostsSearchResults defaultPosts={allPostCards} />
      </article>
    </main>
  );
}
