import { useEffect, useState, useCallback } from 'react';

/**
 * Lightweight parallax hook. Returns the current scroll position
 * so components can apply transforms at different rates.
 * Uses requestAnimationFrame for smooth 60fps updates.
 * Disabled on devices that prefer reduced motion.
 */
export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    function onChange(e: MediaQueryListEvent) {
      setPrefersReducedMotion(e.matches);
    }
    mq.addEventListener('change', onChange);

    if (!mq.matches) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      mq.removeEventListener('change', onChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  /**
   * Get a CSS transform string for a given parallax speed.
   * speed = 0: no movement (fixed)
   * speed = 1: moves with scroll (normal)
   * speed = 0.3–0.5: classic slow-parallax background
   */
  function getTransform(speed: number): string {
    if (prefersReducedMotion) return 'none';
    return `translateY(${scrollY * speed}px)`;
  }

  function getOpacity(fadeStart: number, fadeEnd: number): number {
    if (prefersReducedMotion) return 1;
    if (scrollY <= fadeStart) return 1;
    if (scrollY >= fadeEnd) return 0;
    return 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
  }

  return { scrollY, getTransform, getOpacity, prefersReducedMotion };
}
