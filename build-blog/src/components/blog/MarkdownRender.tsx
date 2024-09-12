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
