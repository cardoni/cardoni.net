import { ImageResponse } from 'next/og';

export const alt = 'Greg Cardoni — technology and philosophy essay';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const accents = ['#2556a6', '#cf5034', '#5f7454', '#6c4ba2'];
const essayCards: Record<string, { title: string; category: string }> = {
  'parsing-proper-nouns-with-regex': { title: 'Parsing Proper Nouns', category: 'Regex' },
  'a-b-testing-with-nginx': { title: 'A/B Testing With Nginx', category: 'Nginx' },
  'how-to-install-and-configure-openvpn': {
    title: "Making DigitalOcean's Private Networking Secure",
    category: 'Security',
  },
  'install-mysql-on-mac-os-x-10-7': {
    title: 'Install MySQL on Mac OS X 10.7+',
    category: 'Personal pivot',
  },
  'install-homebrew-on-mac-os-x-10-7': {
    title: 'Install Homebrew on Mac OS X 10.7+',
    category: 'Personal pivot',
  },
  'how-to-change-archive-utility-mac-os-x-default-preferences': {
    title: "Change OS X's Archive Utility Preferences",
    category: 'Personal pivot',
  },
  'how-to-install-postgresql-os-x-mac-rails-3-heroku': {
    title: 'Setting up PostgreSQL on Mac OS X',
    category: 'Personal pivot',
  },
  'rake-after-deploying-to-heroku': {
    title: "Don't forget to rake after deploying to heroku",
    category: 'Personal pivot',
  },
  'rails-button-to-vs-link-to-url-helpers': {
    title: "Rails' default HTTP methods for button_to and link_to helpers",
    category: 'Personal pivot',
  },
  'how-to-use-git-with-personal-projects': {
    title: 'So you wanna use Git, huh?',
    category: 'Personal pivot',
  },
  'code-academy-has-begun': { title: 'Code Academy Has Begun!', category: 'Personal pivot' },
};

function titleFromSlug(value: string) {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
function accentFor(value: string) {
  const total = Array.from(value).reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return accents[total % accents.length];
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = essayCards[slug];
  const title = card?.title || titleFromSlug(slug);
  const category = card?.category || 'Technology & philosophy';
  const accent = accentFor(slug);
  const titleSize = title.length > 72 ? 54 : title.length > 44 ? 63 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: '#f2eee5',
          color: '#171713',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '42%',
            display: 'flex',
            overflow: 'hidden',
            borderLeft: '1px solid rgba(23, 23, 19, 0.2)',
            background: '#e8e1d3',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, display: 'flex', opacity: 0.32, background: 'linear-gradient(90deg, transparent 49.5%, #171713 50%, transparent 50.5%), linear-gradient(0deg, transparent 49.5%, #171713 50%, transparent 50.5%)', backgroundSize: '96px 96px' }} />
          <div style={{ position: 'absolute', top: 82, left: 98, display: 'flex', width: 286, height: 286, border: '3px solid #171713', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: 82, left: 98, display: 'flex', width: 143, height: 286, background: '#171713' }} />
          <div style={{ position: 'absolute', top: 166, left: 300, display: 'flex', width: 112, height: 112, borderRadius: '50%', background: accent, opacity: 0.9 }} />
          <div style={{ position: 'absolute', right: 42, bottom: 56, display: 'flex', width: 218, height: 94, background: '#171713' }} />
          <div style={{ position: 'absolute', left: 44, bottom: 60, display: 'flex', width: 72, height: 72, borderRadius: '50%', background: '#5f7454' }} />
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '700px',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '58px 64px 52px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: accent, fontSize: 18, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <span style={{ display: 'flex', width: 36, height: 4, background: accent }} />
            {category}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', maxWidth: '650px', fontSize: titleSize, fontWeight: 560, letterSpacing: '-0.045em', lineHeight: 0.98 }}>
              {title}
            </div>
            <div style={{ display: 'flex', fontSize: 24, color: '#554f46' }}>
              Greg Cardoni · cardoni.net
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 16, color: '#6c655b', letterSpacing: '0.05em' }}>
            SOFTWARE · SYSTEMS · PHILOSOPHY
          </div>
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: '100%', background: accent }} />
      </div>
    ),
    { ...size },
  );
}
