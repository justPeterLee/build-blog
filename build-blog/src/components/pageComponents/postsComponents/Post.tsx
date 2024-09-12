import { MarkdownRender } from "@/components/blog/MarkdownRender";

export default function PostById({ post }: { post: string }) {
  return <MarkdownRender>{post}</MarkdownRender>;
}
