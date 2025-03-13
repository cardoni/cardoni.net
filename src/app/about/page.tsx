export const metadata = {
  title: 'About | Cardoni.net',
  description: 'About Greg Cardoni - Software Engineer and Web Developer',
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      
      <div className="prose prose-lg">
        <p>
          Hi there! I&apos;m Greg Cardoni, a software engineer passionate about web development, 
          technology, and sharing knowledge through my blog.
        </p>
        
        <p>
          I&apos;ve been working in the tech industry for several years, focusing on building 
          scalable web applications and solving complex problems. My expertise includes 
          JavaScript, TypeScript, React, Node.js, and various other web technologies.
        </p>
        
        <p>
          This website serves as a platform for me to share my thoughts, experiences, 
          and tutorials on topics I&apos;m passionate about. I hope you find the content 
          helpful and informative.
        </p>
        
        <h2>Connect With Me</h2>
        <p>
          Feel free to reach out to me on social media or check out my projects on GitHub:
        </p>
        
        <ul>
          <li>
            <a href="https://github.com/cardoni" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://twitter.com/cardoni" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/cardoni" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
} 