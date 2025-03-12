import Markdown from "markdown-to-jsx";
import { Fragment, ReactNode } from "react";
import { BlogImage } from "./BlogImage";
import BlogCode from "./BlogCode";
import BlogVideo from "./BlogVideo";
import { BlogText } from "./BlogText";
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
          p: { component: BlogText },
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
  const validStringCheck = children
    ? `<p> ${children} </p>`
    : "<p id='text-editor-empty'> (empty text block) </p>";
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
      {validStringCheck}
    </Markdown>
  );
}
