export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Greg Cardoni. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/cardoni" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://twitter.com/cardoni" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://linkedin.com/in/cardoni" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 