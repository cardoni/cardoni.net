import Link from 'next/link';

export default function Header() {
  return (
    <header id="header" className="inner">
      <div className="alignleft">
        <h1 className="site-title">
          <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
            Cardoni.net
          </Link>
        </h1>
        <h2 className="site-description text-gray-600 text-sm mt-1">
          Thoughts, tutorials, and insights on technology
        </h2>
      </div>
      <div className="alignright">
        <nav id="main-nav">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-600 hover:text-gray-800">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-gray-800">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="clearfix"></div>
    </header>
  );
} 