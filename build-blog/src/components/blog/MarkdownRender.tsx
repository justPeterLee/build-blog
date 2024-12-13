import Markdown from "markdown-to-jsx";
import { Fragment, ReactNode } from "react";
import { BlogImage } from "./BlogImage";
import BlogCode from "./BlogCode";
import BlogVideo from "./BlogVideo";
type MarkdownOverride = { children: ReactNode; props: any };

const ArticleWrap = ({ children, ...props }: MarkdownOverride) => (
  <article {...props} className="w-[42rem]">
    {children}
  </article>
);

const BuildWrap = ({ children, ...props }: MarkdownOverride) => (
  <Fragment {...props}>{children}</Fragment>
);
export function MarkdownRender({
  children,
  build,
}: {
  children: string;
  build?: boolean;
}) {
  return (
    <Markdown
      options={{
        wrapper: !build ? ArticleWrap : BuildWrap,
        forceWrapper: true,
        overrides: {
          p: { props: { className: "post-p" } },
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
      {children}
    </Markdown>
  );
}

export function TextOnlyRender({ children }: { children: string }) {
  return (
    <Markdown
      options={{
        wrapper: ArticleWrap,
        forceWrapper: true,
        overrides: {
          p: {
            props: { className: "text-editor" },
          },
        },
      }}
    >
      {`<p> ${children} </p>`}
    </Markdown>
  );
}
