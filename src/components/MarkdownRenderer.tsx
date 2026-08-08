'use client';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderContent = (text: string) => {
    // Simple markdown parsing for demonstration
    return text
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">
              {paragraph.slice(2)}
            </h1>
          );
        }
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
              {paragraph.slice(3)}
            </h2>
          );
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">
              {paragraph.slice(4)}
            </h3>
          );
        }
        if (paragraph.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 py-2 my-6 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-r-lg">
              {paragraph.slice(2)}
            </blockquote>
          );
        }
        if (paragraph.startsWith('```')) {
          const lines = paragraph.split('\n');
          const language = lines[0].slice(3);
          const code = lines.slice(1, -1).join('\n');
          return (
            <div key={index} className="my-6">
              <div className="bg-gray-900 dark:bg-gray-950 rounded-t-lg px-4 py-2 border-b border-gray-700">
                <span className="text-gray-400 text-sm font-mono">{language}</span>
              </div>
              <pre className="bg-gray-800 dark:bg-gray-900 p-4 rounded-b-lg overflow-x-auto">
                <code className="text-gray-100 dark:text-gray-200 font-mono text-sm">{code}</code>
              </pre>
            </div>
          );
        }
        if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- '));
          return (
            <ul key={index} className="space-y-2 my-6 pl-4">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-gray-400 dark:text-gray-500 mr-3 mt-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.slice(2)}</span>
                </li>
              ))}
            </ul>
          );
        }
        
        // Handle bold and italic text
        const processedText = paragraph
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>');
        
        return (
          <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-base" dangerouslySetInnerHTML={{ __html: processedText }} />
        );
      });
  };

  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  );
} 