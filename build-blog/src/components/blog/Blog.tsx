import { ReactNode, createElement } from "react";

export function BlogCard() {
  return (
    <div className="bg-code-card py-2 px-4 rounded-md flex justify-between">
      <div className="flex-grow">
        <span>
          <p className="text-tertiary-text text-xs font-semibold">
            10TH AUG 2024
          </p>
        </span>

        <span className="flex gap-1">
          <p className="text-primary-text"># Blog Title Test</p>
        </span>
      </div>

      <span className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Tag>react</Tag>
          <Tag>javascript</Tag>
        </div>
      </span>
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="px-2 text-secondary-text text-sm bg-tag-card rounded">
      {children}
    </span>
  );
}

export function RecreateBlogCard() {
  return createElement(
    "div",
    { className: "bg-code-card py-2 px-4 rounded-md flex justify-between" },
    createElement(
      "div",
      { className: "flex-grow" },

      createElement(
        "span",
        null,
        createElement(
          "p",
          {
            className: "text-tertiary-text text-xs font-semibold",
          },
          "10TH AUGUST 2024"
        )
      ),

      createElement(
        "span",
        { className: "flex gap-1" },
        createElement(
          "p",
          { className: "text-primary-text" },
          "# Blog Title Test"
        )
      )
    ),
    createElement(
      "span",
      { className: "flex gap-4 items-center" },
      createElement(
        "div",
        { className: "flex items-center gap-2" },
        <Tag>react</Tag>,
        <Tag>javascript</Tag>
      )
    )
  );
}
