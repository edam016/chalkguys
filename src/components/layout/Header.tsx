import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export function Header() {
  const { cart, openCart } = useCart();
  const itemCount = cart?.totalQuantity ?? 0;
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-brand-dark/95 backdrop-blur-sm border-b border-white/10';

  const textColor = isHome && !scrolled
    ? 'text-chalk/90'
    : 'text-chalk';

  const secondaryColor = isHome && !scrolled
    ? 'text-chalk/50 hover:text-chalk'
    : 'text-text-secondary hover:text-chalk';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className={`transition-colors ${textColor}`}>
            <span className="inline-flex items-center gap-2.5">
              {/* Mountain triangle logo */}
              <svg viewBox="0 0 28 28" className="w-6 h-6">
                <polygon points="14,3 26,25 2,25" fill="currentColor" opacity="0.9" />
                <polygon points="14,10 10,18 18,18" fill="currentColor" opacity="0.3" />
              </svg>
              <span className="font-heading text-xl tracking-wide font-light">The Chalk Guys</span>
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-8">
            <Link to="/products" className={`transition-colors text-sm tracking-widest uppercase font-light ${secondaryColor}`}>
              Shop
            </Link>
          </nav>

          <button
            onClick={openCart}
            className={`relative p-2 transition-colors cursor-pointer ${secondaryColor}`}
            aria-label="Open cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-ink text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        <nav className="sm:hidden flex items-center gap-6 pb-3 -mt-1">
          <Link to="/products" className={`text-xs tracking-widest uppercase font-light transition-colors ${secondaryColor}`}>
            Shop
          </Link>
        </nav>
      </div>
    </header>
  );
}
