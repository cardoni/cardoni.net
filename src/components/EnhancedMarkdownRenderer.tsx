'use client';

import React, { useMemo } from 'react';

interface EnhancedMarkdownRendererProps {
  content: string;
}

export default function EnhancedMarkdownRenderer({ content }: EnhancedMarkdownRendererProps) {
  const processedContent = useMemo(() => {
    // Remove frontmatter if present
    const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n?/, '');
    
    // Split content into lines for processing
    const lines = contentWithoutFrontmatter.split('\n');
    const elements: React.ReactElement[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      
      // Skip empty lines
      if (!line.trim()) {
        i++;
        continue;
      }

      // Code blocks
      if (line.startsWith('```')) {
        const language = line.slice(3).trim();
        const codeLines: string[] = [];
        i++; // Move past opening ```
        
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // Move past closing ```
        
        elements.push(
          <div key={elements.length} className="my-8">
            {language && (
              <div className="bg-gray-800 dark:bg-gray-900 rounded-t-lg px-4 py-2 border-b border-gray-600">
                <span className="text-gray-300 text-sm font-mono">{language}</span>
              </div>
            )}
            <pre className={`bg-gray-900 dark:bg-gray-950 text-gray-100 p-6 overflow-x-auto border border-gray-200 dark:border-gray-700 shadow-lg ${language ? 'rounded-b-lg' : 'rounded-lg'}`}>
              <code className="text-sm font-mono leading-relaxed whitespace-pre">
                {codeLines.join('\n')}
              </code>
            </pre>
          </div>
        );
        continue;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={elements.length} className="text-3xl md:text-4xl font-bold mb-8 mt-12 text-gray-900 dark:text-white first:mt-0">
            {line.slice(2).trim()}
          </h1>
        );
        i++;
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={elements.length} className="text-2xl md:text-3xl font-bold mb-6 mt-10 text-gray-900 dark:text-white">
            {line.slice(3).trim()}
          </h2>
        );
        i++;
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={elements.length} className="text-xl md:text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-white">
            {line.slice(4).trim()}
          </h3>
        );
        i++;
        continue;
      }

      // Lists
      if (line.match(/^\d+\.\s/)) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
          listItems.push(lines[i].replace(/^\d+\.\s/, '').trim());
          i++;
        }
        
        elements.push(
          <ol key={elements.length} className="space-y-3 mb-6 ml-4">
            {listItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 dark:bg-gray-500 text-white dark:text-gray-900 text-xs font-bold rounded-full mr-3 flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span 
                  className="leading-relaxed text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: processInlineFormatting(item) }}
                />
              </li>
            ))}
          </ol>
        );
        continue;
      }

      if (line.startsWith('- ')) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(lines[i].slice(2).trim());
          i++;
        }
        
        elements.push(
          <ul key={elements.length} className="list-none space-y-3 mb-6 ml-4">
            {listItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span 
                  className="leading-relaxed text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: processInlineFormatting(item) }}
                />
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].startsWith('> ')) {
          quoteLines.push(lines[i].slice(2));
          i++;
        }
        
        elements.push(
          <blockquote key={elements.length} className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 py-4 my-8 bg-gray-50 dark:bg-gray-800 rounded-r-lg">
            <div className="italic text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {quoteLines.join(' ')}
            </div>
          </blockquote>
        );
        continue;
      }

      // Regular paragraphs
      const paragraphLines: string[] = [];
      while (i < lines.length && lines[i].trim() && !isSpecialLine(lines[i])) {
        paragraphLines.push(lines[i].trim());
        i++;
      }
      
      if (paragraphLines.length > 0) {
        elements.push(
          <p 
            key={elements.length} 
            className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-base"
            dangerouslySetInnerHTML={{ __html: processInlineFormatting(paragraphLines.join(' ')) }}
          />
        );
      }
    }

    return elements;
  }, [content]);

  return <div className="prose prose-lg max-w-none">{processedContent}</div>;
}

function isSpecialLine(line: string): boolean {
  return (
    line.startsWith('#') ||
    line.startsWith('```') ||
    line.startsWith('- ') ||
    line.match(/^\d+\.\s/) !== null ||
    line.startsWith('> ')
  );
}

function processInlineFormatting(text: string): string {
  return text
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-600 dark:text-gray-400">$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gray-900 dark:text-white underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" target="_blank" rel="noopener noreferrer">$1</a>');
} 