'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language,
  showLineNumbers = false,
}: CodeBlockProps) {
  return (
    <div className="my-4 w-full">
      <div className="border-b-6 border-primary bg-gray-50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={language}
            style={oneLight}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              padding: '0.75rem',
              fontSize: '0.75rem',
              lineHeight: '1.5',
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              background: '#f9fafb',
              borderRadius: '0.5rem',
              minWidth: '100%',
            }}
            wrapLines={false}
            wrapLongLines={false}
            codeTagProps={{
              style: {
                fontFamily: 'inherit',
                display: 'block',
                minWidth: 'fit-content',
              },
            }}
            PreTag={({ children, ...props }) => (
              <pre {...props} className="m-0!">
                {children}
              </pre>
            )}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
