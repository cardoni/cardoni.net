## [Cardoni.net](http://cardoni.net)
Hi there, I'm Greg. This my personal site, created using [Ghost](https://ghost.org/)—a nice javascript/node static site generator. Enjoy!

This is the source code for [Cardoni.net](https://cardoni.net), a personal website and blog built with Next.js and hosted on Vercel.

## Features

- Built with Next.js 14 (App Router)
- Markdown content with frontmatter
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Static site generation for fast performance
- Automatic deployment with Vercel

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cardoni/cardoni.net.git
   cd cardoni.net
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Import existing posts (if available):
   ```bash
   npm run import-posts
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - React components
- `src/content/posts/` - Markdown blog posts
- `src/lib/` - Utility functions
- `public/` - Static assets

## Deployment

This site is deployed on Vercel. Any push to the main branch will trigger a new deployment.

## License

This project is licensed under the MIT License.