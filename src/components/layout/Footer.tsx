import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-ink text-chalk mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 28 28" className="w-5 h-5 text-accent">
                <polygon points="14,3 26,25 2,25" fill="currentColor" opacity="0.9" />
                <polygon points="14,10 10,18 18,18" fill="currentColor" opacity="0.3" />
              </svg>
              <p className="font-heading text-xl font-light tracking-wide text-chalk">The Chalk Guys</p>
            </div>
            <p className="mt-3 text-sm text-text-secondary max-w-xs font-light leading-relaxed">
              Born from stone, shaped by tradition. Premium climbing chalk inspired by Japan's mountains.
            </p>
          </div>
          <nav className="flex gap-8 text-sm">
            <Link to="/products" className="text-text-secondary hover:text-chalk transition-colors tracking-wide font-light">
              Shop
            </Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-chalk transition-colors tracking-wide font-light">
              Instagram
            </a>
            <a href="mailto:hello@thechalkguys.com" className="text-text-secondary hover:text-chalk transition-colors tracking-wide font-light">
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-xs text-text-secondary tracking-wide font-light">
            &copy; {new Date().getFullYear()} The Chalk Guys. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
