export default function Footer() {
  return (
    <footer id="footer" className="inner">
      <div className="alignleft">
        <p>&copy; {new Date().getFullYear()} Greg Cardoni. All rights reserved.</p>
      </div>
      <div className="alignright">
        <div className="flex space-x-4">
          <a href="https://github.com/cardoni" className="hover:text-gray-600" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://twitter.com/cardoni" className="hover:text-gray-600" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://linkedin.com/in/cardoni" className="hover:text-gray-600" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="clearfix"></div>
    </footer>
  );
} 