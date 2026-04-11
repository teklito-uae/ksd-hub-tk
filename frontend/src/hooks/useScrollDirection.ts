import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollY(currentScrollY);
      
      if (
        direction !== scrollDirection &&
        (currentScrollY - lastScrollY > 5 || currentScrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      setLastScrollY(currentScrollY > 0 ? currentScrollY : 0);
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection, lastScrollY]);

  return { direction: scrollDirection, scrollY };
}
