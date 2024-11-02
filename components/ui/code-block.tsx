import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";

import "prismjs/themes/prism.css";

import { useState } from "react";
import "./code-block.css";

interface CodeBlockProps {
  language: string;
  children: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = Prism.highlight(
    children,
    Prism.languages[language] || Prism.languages.text,
    language
  );

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="language-label">{language}</span>
        <button onClick={handleCopy} className="copy-button">
          {copied ? (
            <p style={{ fontSize: "12px" }}>Copied!</p>
          ) : (
            <p style={{ fontSize: "12px" }}>Copy</p>
          )}
        </button>
      </div>
      <pre className="code-pre">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
};
