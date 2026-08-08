import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DefinitionTerm from './DefinitionTerm';

interface EnhancedMarkdownRendererProps {
  content: string;
}

function prepareMarkdown(content: string) {
  return content
    .replace(/^---[\s\S]*?---\n?/, '')
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, '$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (_match, term: string, definition: string) => {
      const safeDefinition = definition.replace(/"/g, "'").trim();
      return `[${term.trim()}](#definition "${safeDefinition}")`;
    });
}

const markdownComponents: Components = {
  h1: ({ children }) => <h2>{children}</h2>,
  h2: ({ children }) => <h3>{children}</h3>,
  h3: ({ children }) => <h4>{children}</h4>,
  h4: ({ children }) => <h5>{children}</h5>,
  h5: ({ children }) => <h6>{children}</h6>,
  h6: ({ children }) => <h6>{children}</h6>,
  a: ({ href = '', title, children }) => {
    if (href === '#definition' && title) {
      return <DefinitionTerm definition={title}>{children}</DefinitionTerm>;
    }

    const isExternal = /^(https?:)?\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} title={title ?? undefined} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Link href={href} title={title ?? undefined}>
        {children}
      </Link>
    );
  },
  img: ({ src, alt = '', title }) => {
    if (typeof src !== 'string') {
      return null;
    }

    if (!src.startsWith('/')) {
      return <a href={src}>{alt || title || 'View image'}</a>;
    }

    return (
      <span className="article-image-frame">
        <Image
          src={src}
          alt={alt}
          title={title ?? undefined}
          width={1280}
          height={800}
          sizes="(max-width: 860px) 100vw, 800px"
        />
        {title && <span className="article-image-caption">{title}</span>}
      </span>
    );
  },
  pre: ({ children }) => <pre className="article-code-block">{children}</pre>,
  code: ({ className, children }) => {
    const language = className?.replace('language-', '');
    return (
      <code className={className} data-language={language || undefined}>
        {children}
      </code>
    );
  },
};

export default function EnhancedMarkdownRenderer({ content }: EnhancedMarkdownRendererProps) {
  return (
    <div className="article-prose font-reading">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {prepareMarkdown(content)}
      </ReactMarkdown>
    </div>
  );
}
