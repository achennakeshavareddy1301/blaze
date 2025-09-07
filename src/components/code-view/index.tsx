import Prism from "prismjs";
import { useEffect } from "react";
import React from "react";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "./code-theme.css";

interface Props {
  code: string;
  lang: string;
}

export const CodeView = ({ code, lang }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-md overflow-auto">
      <pre className="language-pre">
        <code className={`language-${lang}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};