"use client";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import md from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { GoCopy } from "react-icons/go";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("md", md);

export default function BlogCode(props: {
  className: string;
  children: string;
  file?: string;
  language?: string;
}) {
  const [isCopy, setIsCopy] = useState(false);
  return (
    <section className="flex flex-col gap-0">
      <header className="flex justify-between text-secondary-text text-sm">
        {props.file}
      </header>

      <div className="relative">
        <button
          className="text-tertiary-text absolute right-0 p-2 m-2  rounded-lg hover:bg-zinc-700"
          onClick={async () => {
            await navigator.clipboard.writeText(props.children);
            setIsCopy(true);
            setTimeout(() => {
              setIsCopy(false);
            }, 750);
          }}
        >
          {!isCopy ? <GoCopy size={20} /> : "copied"}
        </button>
        <SyntaxHighlighter
          language={"jsx"}
          style={darcula}
          customStyle={{ margin: "0" }}
          className={"rounded-lg m-0"}
        >
          {props.children}
        </SyntaxHighlighter>
      </div>
    </section>
  );
}
