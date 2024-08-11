import {
  PostsIntro,
  PostsSearch,
} from "@/components/pageComponents/postsComponents/Posts";

export default function Posts() {
  return (
    <main>
      <article className="w-[42rem] flex flex-col items-center justify-center m-auto gap-10">
        <PostsIntro />
        <PostsSearch />
      </article>
    </main>
  );
}
