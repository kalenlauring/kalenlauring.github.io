import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";
import Layout from "../components/Layout";
import { withLinks } from "../components/withLinks";
import { useStaggeredReveal } from "../components/useStaggeredReveal";
import { featured, otherProjects } from "../data/portfolio";
import "../components/TileGrid.css";
import "./Portfolio.css";

type Reveal = (id: string) => { visible: boolean; delay: number };

export default function Portfolio() {
  const { ref, reveal } = useStaggeredReveal<HTMLDivElement>();
  const text = fade(reveal, "featured-text");

  return (
    <Layout>
      <div ref={ref} className="tile-grid-container portfolio">
        <h1 className="sr-only">Portfolio</h1>

        <section className="featured" aria-label={featured.title}>
          <Square id="featured-title" reveal={reveal} href={featured.href} color={featured.color}>
            <h2 className="featured-title">{featured.title}</h2>
            {featured.description && (
              <p className="project-description featured-description">{featured.description}</p>
            )}
          </Square>
          <Square id="featured-image" reveal={reveal} href={featured.href} photo>
            <img src={featured.image} alt={featured.imageAlt} />
          </Square>
          <div data-tile="featured-text" className={`${text.className} featured-text`} style={text.style}>
            {/* pushes the raven down to the bottom of the column on desktop */}
            <span className="featured-raven-spacer" aria-hidden="true" />
            {featured.paragraphs.map((paragraph, i) => (
              <Fragment key={i}>
                {/* before the last paragraph, so that paragraph wraps around it */}
                {i === featured.paragraphs.length - 1 && (
                  <img src={featured.raven} alt="" className="featured-raven" />
                )}
                <p>{withLinks(paragraph, featured.paragraphLinks)}</p>
              </Fragment>
            ))}
            <a href={featured.play.href} target="_blank" rel="noopener noreferrer" className="text-link featured-play">
              {featured.play.text}
            </a>
          </div>
        </section>

        <h2 className="tile-display other-heading">Other Projects</h2>
        <div className="other-projects">
          {otherProjects.map((project) => (
            <div key={project.id} className="project-pair">
              <Square id={`${project.id}-title`} reveal={reveal} href={project.href} color={project.color}>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </Square>
              <Square id={`${project.id}-screenshot`} reveal={reveal} href={project.href} color={project.tint} photo>
                <img src={project.screenshot} alt={project.screenshotAlt} className="project-screenshot" />
              </Square>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function fade(reveal: Reveal, id: string) {
  const { visible, delay } = reveal(id);
  return {
    className: `tile fade-element${visible ? " is-visible" : ""}`,
    style: { "--delay": `${delay}ms` } as CSSProperties,
  };
}

interface SquareProps {
  id: string;
  reveal: Reveal;
  href?: string;
  color?: string;
  // photos fill the square and don't get the ↗
  photo?: boolean;
  children: ReactNode;
}

// A square tile. With `href` it's a link that opens in a new tab.
function Square({ id, reveal, href, color, photo, children }: SquareProps) {
  const { className, style } = fade(reveal, id);
  const props = {
    "data-tile": id,
    className: `${className} tile-square ${photo ? "tile-photo" : "project-tile"}${href ? " tile-link" : ""}`,
    style: { ...style, backgroundColor: color },
  };

  return href ? (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      {!photo && (
        <span className="tile-arrow" aria-hidden="true">
          ↗
        </span>
      )}
    </a>
  ) : (
    <div {...props}>{children}</div>
  );
}
