import { useSyncExternalStore } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { about } from "../data/homepage";
import type { PageTiles, TextBlock, Tile } from "../data/homepage";
import Intro from "./Intro";
import { useStaggeredReveal } from "./useStaggeredReveal";
import { withLinks } from "./withLinks";
import "./TileGrid.css";

// match the breakpoints in TileGrid.css
const TABLET = "(min-width: 640px)";
const DESKTOP = "(min-width: 1024px)";

const subscribeLayout = (onChange: () => void) => {
  const queries = [TABLET, DESKTOP].map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
};
const getLayout = () =>
  window.matchMedia(DESKTOP).matches ? "desktop" : window.matchMedia(TABLET).matches ? "tablet" : "mobile";

const blocks: Record<TextBlock, ReactNode> = {
  intro: <Intro />,
  about: (
    <>
      <h2 className="tile-display">{about.heading}</h2>
      {about.paragraphs.map((text, i) => (
        <p key={i} className={`${i === 0 ? "tile-body" : "mt-3"} tile-prose`}>
          {withLinks(text, about.paragraphLinks)}
        </p>
      ))}
    </>
  ),
};

interface TileGridProps {
  page: PageTiles;
}

export default function TileGrid({ page }: TileGridProps) {
  const layout = useSyncExternalStore(subscribeLayout, getLayout);
  const tilesById = new Map(page.tiles.map((tile) => [tile.id, tile]));
  const order = layout === "tablet" ? page.tabletOrder : page.mobileOrder;
  const tiles = layout === "desktop" ? page.tiles : order.flatMap((id) => tilesById.get(id) ?? []);
  const { ref: grid, reveal } = useStaggeredReveal<HTMLDivElement>(layout);

  return (
    <div className="tile-grid-container">
      <div ref={grid} className={`tile-grid tile-grid-squares-${page.squares}`}>
        {tiles.map((tile) => (
          <TileView key={tile.id} tile={tile} {...reveal(tile.id)} />
        ))}
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
          className={`${fade} tile-text tile-span-${tile.span}${tile.rows ? ` tile-rows-${tile.rows}` : ""}${tile.align ? ` tile-text-${tile.align}` : ""}`}
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
    case "link": {
      const props = {
        ...reveal,
        className: `${fade} tile-square tile-link`,
        style: { ...reveal.style, backgroundColor: tile.color },
      };
      const content = (
        <span className="tile-label">
          {tile.label}&nbsp;<span aria-hidden="true">↗</span>
        </span>
      );
      return "to" in tile ? (
        <Link {...props} to={tile.to}>
          {content}
        </Link>
      ) : (
        <a {...props} {...newTab} href={tile.href}>
          {content}
        </a>
      );
    }
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
