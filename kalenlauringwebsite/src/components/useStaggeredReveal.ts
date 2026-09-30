import { useEffect, useRef, useState } from "react";

const STAGGER_MS = 60;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal every [data-tile] element inside `ref` as it scrolls into view. Tiles
// entering together (all of the first screen, then whatever a scroll uncovers)
// stagger in reading order. Pass `resetKey` to re-observe after the tiles are
// re-rendered in a different order.
export function useStaggeredReveal<T extends HTMLElement>(resetKey?: unknown) {
  const ref = useRef<T>(null);
  // reduced motion: show everything at once
  const [instant] = useState(prefersReducedMotion);
  // tile id -> position in the stagger batch it was revealed with
  const [revealed, setRevealed] = useState<Map<string, number>>(() => new Map());

  useEffect(() => {
    if (instant || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const ids = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            observer.unobserve(entry.target);
            return entry.target as HTMLElement;
          })
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
          .map((el) => el.dataset.tile!);
        if (!ids.length) return;
        setRevealed((prev) => {
          const next = new Map(prev);
          ids.forEach((id, i) => next.set(id, i));
          return next;
        });
      },
      { threshold: 0.15 }
    );

    ref.current
      .querySelectorAll("[data-tile]:not(.is-visible)")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [instant, resetKey]);

  const reveal = (id: string) => {
    const order = revealed.get(id);
    return { visible: instant || order !== undefined, delay: (order ?? 0) * STAGGER_MS };
  };

  return { ref, reveal };
}
