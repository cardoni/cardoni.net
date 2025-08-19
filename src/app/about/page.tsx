import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';
import AnimatedHeader from '@/components/AnimatedHeader';

export const metadata: Metadata = {
  title: 'About - Greg Cardoni',
  description: 'Learn about Greg Cardoni, a software engineer with extensive startup experience currently working at U.S. Bank.',
  openGraph: {
    title: 'About - Greg Cardoni',
    description: 'Learn about Greg Cardoni, a software engineer with extensive startup experience currently working at U.S. Bank.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <AnimatedHeader
            title="About Me"
            subtitle="Software engineer, startup veteran, technology enthusiast"
            showBackButton={true}
          />
          
          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mt-8">
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="mb-8 text-center">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    Greg Cardoni
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                    Software Engineer | Technology Professional
                  </p>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Los Angeles Metropolitan Area
                  </p>
                </div>

                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Professional Overview
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      I&apos;m an experienced software engineer with a passion for building innovative technology solutions. 
                      Throughout my career, I&apos;ve had the privilege of working across diverse startup environments, 
                      from early-stage companies to established tech firms, gaining invaluable experience in rapid 
                      development, scaling systems, and adapting to evolving technology landscapes.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Currently, I&apos;m applying my startup-honed skills in a larger enterprise environment at U.S. Bank, 
                      where I contribute to building robust financial technology solutions that serve millions of customers.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Career Highlights
                    </h2>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Current Role:</strong> Software Engineer at U.S. Bank, contributing to enterprise-scale financial technology solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Startup Experience:</strong> Extensive background across multiple technology startups and emerging companies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Technical Expertise:</strong> Software engineering with focus on scalable systems and innovative solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Professional Network:</strong> Active in the technology community with 2,000+ LinkedIn connections</span>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Education
                    </h2>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        California State University, Northridge
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">
                        <strong>Bachelor of Arts in Philosophy (Honors Program)</strong>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Graduated Cum Laude • 3.5+ GPA • University Dean&apos;s List
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Technical Interests
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                          <span className="text-gray-700 dark:text-gray-300">Software Architecture</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                          <span className="text-gray-700 dark:text-gray-300">Startup Technology</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                          <span className="text-gray-700 dark:text-gray-300">System Scalability</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                          <span className="text-gray-700 dark:text-gray-300">Technology Innovation</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                          <span className="text-gray-700 dark:text-gray-300">Financial Technology</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></span>
                          <span className="text-gray-700 dark:text-gray-300">Emerging Tech Ecosystems</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      About This Blog
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      This personal blog serves as a platform where I share insights from my journey through 
                      the technology industry. Here you&apos;ll find thoughts on software engineering, reflections 
                      on startup culture, and explorations of how philosophy intersects with modern technology.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      My philosophy background provides a unique lens through which I examine technology challenges, 
                      ethics in software development, and the broader implications of our digital transformation.
                    </p>
                  </section>

                  <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Let&apos;s Connect
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      I&apos;m always interested in connecting with fellow technologists, entrepreneurs, and anyone 
                      passionate about the intersection of philosophy and technology.
                    </p>
                    <div className="flex space-x-4">
                      <a 
                        href="https://linkedin.com/in/cardoni" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                      <a 
                        href="//github.com/cardoni" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </PageTransition>
  );
}