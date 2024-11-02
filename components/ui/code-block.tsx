import { useTheme } from "next-themes";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import { useEffect, useState } from "react";
import "./code-block.css";

interface CodeBlockProps {
  language: string;
  children: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Re-highlight when theme changes
    const highlighted = Prism.highlight(
      children,
      Prism.languages[language] || Prism.languages.text,
      language
    );
    const codeElement = document.querySelector(`.language-${language}`);
    if (codeElement) {
      codeElement.innerHTML = highlighted;
    }
  }, [theme, children, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`code-block ${theme}`}>
      <div className="code-header">
        <span className="language-label">{language}</span>
        <button onClick={handleCopy} className="copy-button">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="code-pre">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              children,
              Prism.languages[language] || Prism.languages.text,
              language
            ),
          }}
        />
      </pre>
    </div>
  );
};
