import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, ReactNode } from "react";
import { about, experience, mobileOrder, tiles } from "../data/homepage";
import type { TextBlock, Tile } from "../data/homepage";
import Intro from "./Intro";
import "./TileGrid.css";

// matches the breakpoint in TileGrid.css
const WIDE = "(min-width: 640px)";
const STAGGER_MS = 60;

const subscribeWide = (onChange: () => void) => {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const isWide = () => window.matchMedia(WIDE).matches;

const tilesById = new Map(tiles.map((tile) => [tile.id, tile]));
const mobileTiles = mobileOrder.flatMap((id) => tilesById.get(id) ?? []);

const blocks: Record<TextBlock, ReactNode> = {
  intro: <Intro />,
  about: (
    <>
      <h2 className="tile-display">{about.heading}</h2>
      {about.paragraphs.map((text, i) => (
        <p key={i} className={`${i === 0 ? "tile-body" : "mt-3"} text-[15px] lg:text-lg`}>
          {text}
        </p>
      ))}
    </>
  ),
  experience: (
    <>
      <h2 className="tile-display">{experience.heading}</h2>
      <ul className="tile-body space-y-2 text-[15px] lg:text-base leading-snug">
        {experience.entries.map((entry, i) => (
          <li key={i}>
            <p className="font-bold">{entry.title}</p>
            <p>
              {entry.description} <span className="text-neutral-600">{entry.stack}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  ),
};

interface TileGridProps {
  // reduced motion: show everything at once
  instant: boolean;
}

export default function TileGrid({ instant }: TileGridProps) {
  const wide = useSyncExternalStore(subscribeWide, isWide);
  const grid = useRef<HTMLDivElement>(null);
  // tile id -> position in the stagger batch it was revealed with
  const [revealed, setRevealed] = useState<Map<string, number>>(() => new Map());

  // Reveal tiles as they scroll into view. Tiles entering together (all of the
  // first screen, then whatever a scroll uncovers) stagger in reading order.
  useEffect(() => {
    if (instant || !grid.current) return;

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

    grid.current
      .querySelectorAll("[data-tile]:not(.is-visible)")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [instant, wide]);

  return (
    <div className="tile-grid-container">
      <div ref={grid} className="tile-grid">
        {(wide ? tiles : mobileTiles).map((tile) => {
          const order = revealed.get(tile.id);
          return (
            <TileView
              key={tile.id}
              tile={tile}
              visible={instant || order !== undefined}
              delay={(order ?? 0) * STAGGER_MS}
            />
          );
        })}
      </div>
    </div>
  );
}

interface TileViewProps {
  tile: Tile;
  visible: boolean;
  delay: number;
}

function TileView({ tile, visible, delay }: TileViewProps) {
  const fade = `tile fade-element${visible ? " is-visible" : ""}`;
  const reveal = { "data-tile": tile.id, style: { "--delay": `${delay}ms` } as CSSProperties };
  const newTab = { target: "_blank", rel: "noopener noreferrer" };

  switch (tile.type) {
    case "text":
      return (
        <section
          {...reveal}
          className={`${fade} tile-text tile-span-${tile.span}${tile.rows ? ` tile-rows-${tile.rows}` : ""}${tile.alignTop ? " tile-text-top" : ""}`}
        >
          {blocks[tile.block]}
        </section>
      );
    case "photo": {
      const image = tile.src ? (
        <img src={tile.src} alt={tile.alt} />
      ) : (
        <div className="tile-placeholder" role="img" aria-label={tile.alt}>
          {import.meta.env.DEV && `add src/assets/${tile.file}`}
        </div>
      );
      return tile.href ? (
        <a {...reveal} {...newTab} href={tile.href} className={`${fade} tile-square tile-photo tile-link`}>
          {image}
        </a>
      ) : (
        <div {...reveal} className={`${fade} tile-square tile-photo`}>
          {image}
        </div>
      );
    }
    case "link":
      return (
        <a
          {...reveal}
          {...newTab}
          href={tile.href}
          className={`${fade} tile-square tile-link`}
          style={{ ...reveal.style, backgroundColor: tile.color }}
        >
          <span className="tile-label">{tile.label}</span>
          <span className="tile-arrow" aria-hidden="true">↗</span>
        </a>
      );
    case "empty":
      return <div aria-hidden="true" />;
    case "color":
      return (
        <div
          {...reveal}
          className={`${fade} tile-square`}
          style={{ ...reveal.style, backgroundColor: tile.color }}
          aria-hidden={tile.label ? undefined : true}
        >
          {tile.label && <span className="tile-label">{tile.label}</span>}
        </div>
      );
  }
}
