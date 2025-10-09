import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-darker)] text-gray-300 py-10 mt-16 border-t border-[var(--color-darkPurple)]">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-3">
        
        {/* Logo / Brand */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] tracking-wide">
            MyBlog
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Sharing thoughts, tutorials, and stories for curious minds who love to learn and grow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-secondary)] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-secondary)] mb-4">
            Connect
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-[var(--color-primary)] transition duration-200"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-[var(--color-primary)] transition duration-200"
            >
              Facebook
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="hover:text-[var(--color-primary)] transition duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-[var(--color-darkPurple)] pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="text-[var(--color-primary)] font-semibold">MyBlog</span>. All rights reserved.
      </div>
    </footer>
  );
}
