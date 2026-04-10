import { useEffect, useRef } from 'react';

export function useScrollReveal(
  onReveal: (el: HTMLElement) => void,
  threshold = 0.12,
) {
  const ref = useRef<HTMLDivElement>(null);
  const cbRef = useRef(onReveal);
  cbRef.current = onReveal;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cbRef.current(entry.target as HTMLElement);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
