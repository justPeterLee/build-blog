import BlogCode from "@/components/blog/BlogCode";
import { BlogImage } from "@/components/blog/BlogImage";
import BlogVideo from "@/components/blog/BlogVideo";
import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";

type MarkdownOverride = { children: ReactNode; props: any };

const ArticleWrap = ({ children, ...props }: MarkdownOverride) => (
  <article {...props} className="w-[42rem]">
    {children}
  </article>
);

export default function PostById({ post }: { post: string }) {
  return (
    <Markdown
      options={{
        wrapper: ArticleWrap,
        forceWrapper: true,
        overrides: {
          BlogImage: {
            component: BlogImage,
          },
          code: {
            component: BlogCode,
          },
          BlogVideo: {
            component: BlogVideo,
          },
        },
      }}
    >
      {post}
    </Markdown>
  );
}
