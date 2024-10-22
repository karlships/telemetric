import { NextPage } from "next";
import Link from "next/link";

const DocsPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Next.js Documentation</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <ul className="list-disc pl-6">
          <li>
            <Link
              href="/docs/installation"
              className="text-blue-600 hover:underline"
            >
              Installation
            </Link>
          </li>
          <li>
            <Link
              href="/docs/project-structure"
              className="text-blue-600 hover:underline"
            >
              Project Structure
            </Link>
          </li>
          <li>
            <Link href="/docs/pages" className="text-blue-600 hover:underline">
              Pages and Routing
            </Link>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Core Features</h2>
        <ul className="list-disc pl-6">
          <li>
            <Link
              href="/docs/server-side-rendering"
              className="text-blue-600 hover:underline"
            >
              Server-Side Rendering (SSR)
            </Link>
          </li>
          <li>
            <Link
              href="/docs/static-site-generation"
              className="text-blue-600 hover:underline"
            >
              Static Site Generation (SSG)
            </Link>
          </li>
          <li>
            <Link
              href="/docs/api-routes"
              className="text-blue-600 hover:underline"
            >
              API Routes
            </Link>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Topics</h2>
        <ul className="list-disc pl-6">
          <li>
            <Link
              href="/docs/dynamic-imports"
              className="text-blue-600 hover:underline"
            >
              Dynamic Imports
            </Link>
          </li>
          <li>
            <Link
              href="/docs/environment-variables"
              className="text-blue-600 hover:underline"
            >
              Environment Variables
            </Link>
          </li>
          <li>
            <Link
              href="/docs/typescript"
              className="text-blue-600 hover:underline"
            >
              TypeScript Support
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-8 text-gray-600">
        For more detailed information, visit the official{" "}
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Next.js documentation
        </a>
        .
      </p>
    </div>
  );
};

export default DocsPage;
