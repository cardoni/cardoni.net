'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { DISQUS_SHORTNAME, legacyDisqusThreadUrl } from '@/lib/site';

interface DisqusPageContext {
  page: {
    title?: string;
    url?: string;
  };
}

interface DisqusResetOptions {
  reload: boolean;
  config: (this: DisqusPageContext) => void;
}

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: DisqusResetOptions) => void;
    };
    disqus_config?: (this: DisqusPageContext) => void;
  }
}

interface DisqusCommentsProps {
  slug: string;
  title: string;
}

export default function DisqusComments({ slug, title }: DisqusCommentsProps) {
  const threadUrl = legacyDisqusThreadUrl(slug);

  useEffect(() => {
    const configure = function configureDisqus(this: DisqusPageContext) {
      this.page.url = threadUrl;
      this.page.title = title;
    };

    window.disqus_config = configure;

    if (window.DISQUS) {
      window.DISQUS.reset({ reload: true, config: configure });
    }
  }, [threadUrl, title]);

  return (
    <section className="article-comments" aria-labelledby={`comments-title-${slug}`}>
      <header className="article-comments-header">
        <p className="eyebrow">Discussion / archive</p>
        <h2 id={`comments-title-${slug}`} className="font-reading">Comments</h2>
        <p>The original conversation for this essay, preserved through Disqus.</p>
      </header>
      <div id="disqus_thread" />
      <noscript>
        Please enable JavaScript to view the comments powered by{' '}
        <a href="https://disqus.com/">Disqus</a>.
      </noscript>
      <Script
        id="disqus-embed"
        src={`https://${DISQUS_SHORTNAME}.disqus.com/embed.js`}
        strategy="lazyOnload"
      />
    </section>
  );
}
