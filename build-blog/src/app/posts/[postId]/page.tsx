import PostById from "@/components/pageComponents/postsComponents/Post";
import { getPostById } from "@/lib/api";
import notFound from "./not-found";

export default function Post({ params }: { params: { postId: string } }) {
  const post = getPostById(params.postId) as string | null;

  if (post === null) {
    return notFound();
  }

  return (
    <main className="post flex justify-center">
      <PostById post={post ? post : ""} />
    </main>
  );
}
