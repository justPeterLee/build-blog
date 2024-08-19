"use client";
import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import md from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("md", md);

export function CodeInput() {
  const [language, setLanguage] = useState("javascript");
  const [wrapLine, setWrapLine] = useState(false);
  const [code, setCode] = useState("");

  return (
    <div suppressHydrationWarning>
      <div className="p-4 bg-card rounded-lg shadow flex flex-col justify-start items-center gap-4">
        <div>
          <div className="mb-2 flex justify-between">
            <h1 className="text-primary-text">code input</h1>
            <div className="flex justify-center items-center gap-2">
              <label
                htmlFor="code-language"
                className="text-secondary-text text-sm"
              >
                type:
              </label>
              <select
                id="code-language"
                className="text-sm bg-cta-card text-secondary-text"
                name="code-language"
                value={language}
                onChange={(e) => {
                  console.log(e.target.value);
                  setLanguage(e.target.value);
                }}
              >
                <option value={"javascript"}>javascript</option>
                <option value="jsx">jsx</option>
                <option value={"bash"}>bash</option>
                <option value={"md"}>md</option>
              </select>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Type your code here..."
            className="bg-cta-card text-primary-text placeholder:text-secondary-text p-2 resize-none  w-[40rem] h-[12rem] rounded outline-none"
            // style={{ width: "100%", height: "150px" }}
          />
        </div>

        <div>
          <div className="flex justify-between">
            <h1 className="text-primary-text">live output</h1>
            <div className="flex gap-2 justify-center items-center">
              <label
                className="text-secondary-text text-sm select-none"
                htmlFor="wrap-lines"
              >
                wrap-lines
              </label>
              <input
                id={"wrap-lines"}
                // className="bg-cta-card"
                type="checkbox"
                checked={wrapLine}
                onChange={(e) => {
                  setWrapLine(e.target.checked);
                }}
              />
            </div>
          </div>
          <SyntaxHighlighter
            language={language}
            wrapLines={true}
            wrapLongLines={wrapLine}
            style={darcula}
            className="w-[40rem] min-h-14 "
          >
            {code}
          </SyntaxHighlighter>
        </div>

        <button className="bg-cta-card hover:bg-cta-active-card px-2 py-1 rounded text-secondary-text">
          save
        </button>
      </div>
    </div>
  );
}
