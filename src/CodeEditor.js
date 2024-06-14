import React, { useState, useRef, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

const styles = {
  container: {
    position: "relative",
    fontFamily: "monospace",
  },
  textarea: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "16px",
    color: "transparent",
    background: "transparent",
    caretColor: "black",
    outline: "none",
    border: "1px solid #ddd",
    borderRadius: "4px",
    resize: "none",
    whiteSpace: "pre-wrap",
    overflow: "hidden",
  },
  code: {
    padding: "10px",
    fontSize: "16px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    pointerEvents: "none",
  },
  pre: {
    margin: 0,
  },
};

const CodeEditor = () => {
  const [code, setCode] = useState(exampleCode);
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  const onValueChange = (event) => {
    setCode(event.target.value);
  };

  useEffect(() => {
    const syncScroll = () => {
      if (textareaRef.current && highlightRef.current) {
        highlightRef.current.scrollTop = textareaRef.current.scrollTop;
        highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("scroll", syncScroll);
      return () => textarea.removeEventListener("scroll", syncScroll);
    }
  }, []);

  return (
    <div style={styles.container}>
      <pre ref={highlightRef} style={{ ...styles.code, ...styles.pre }}>
        <Highlight code={code} language="js" theme={themes.github}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{ ...style, ...styles.code, ...styles.pre }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </pre>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={onValueChange}
        style={styles.textarea}
      />
    </div>
  );
};

export default CodeEditor;
