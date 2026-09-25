import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

// Everything on the site lives here: text, photos, colors, links, and the tiles
// on each page. The layout code in src/components/TileGrid.tsx reads from this file.

// Photos are looked up by filename in src/assets. A missing file shows as a
// gray placeholder square, so you can add photos later without breaking the build.
const assets = import.meta.glob<string>("../assets/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
});
const photo = (file: string) => ({ file, src: assets[`../assets/${file}`] });

export const palette = {
  blue: "#9CC8DC",
  pink: "#EC80D8",
};

export const links = {
  email: "lauringkalen@gmail.com",
  github: "https://github.com/kalenlauring",
  linkedin: "https://linkedin.com/in/kalen-lauring",
  // put the PDF at public/resume.pdf
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
  // a page on this site
  portfolio: "/portfolio",
  // TODO: replace with the game's live URL (or its repo). Used by the game
  // screenshot and the Play tile.
  game: "https://github.com/kalenlauring",
};

// The nav at the top of every page. `to` is a page on this site; `href` opens
// in a new tab.
export const nav: ({ label: string; to: string } | { label: string; href: string })[] = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: links.portfolio },
  { label: "Resume", href: links.resume },
];

export const intro = {
  heading: "Hello, I'm Kalen Lauring!",
  pronouns: "she/her",
  email: links.email,
  location: "📍 Medford, MA",
  socials: [
    { label: "GitHub", href: links.github, icon: github },
    { label: "LinkedIn", href: links.linkedin, icon: linkedin },
  ],
};

export const about = {
  heading: "About Me",
  paragraphs: [
    "I am a current Junior at Tufts University majoring in Computer Science and Sociology and minoring Asian American Studies. ",
    "In my work with tech, I’m interested in taking on projects that focus on improving our daily lives, both big and small, and creating equitable technology for all users.",
    "In my work with people, I'm interested in working to working within my community to cultivate mutual support and coalition-building through mentorship, advocacy, and community organizing.",
    "At school, I’ve served on the executive board for Tufts Vietnamese Student Association for the last 3 years, along with Tufts Student Sociology Board, Jumbocode, Symphony Orchestra.",
    " In my free time, I enjoy listening to NPR’s This American Life, doing the crossword, playing the bass, and hiking with friends. ",
  ],
};

export const experience = {
  heading: "Recent Work",
  // `stack` is optional
  entries: [
    {
      title: "Raven Rhythm",
      description:
        "A rhythm game with a custom timing system, beatmap engine, and gameplay systems built in Unity/C#.",
      stack: "Unity, C#, Audacity, Logic Pro",
    },
    {
      title: "Freelance Web Development",
      description: "Booking platform for a babysitting service.",
      stack: "WordPress, custom booking & payment plugins",
    },
    {
      title: "Product Design & Frontend Development Intern @ NeuroFore",
      description: "Clinical assessment web app.",
      stack: "React, Node, Prisma, PostgreSQL",
    },
    {
      title: "Judicial Intern @ Circuit Court for Baltimore City",
      description:
        "Researched case records and observed hearings in the chambers of the Honorable Catherine Chen.",
    },
    {
      title: "Developer @ Tufts Jumbocode",
      description:
        "Built a full-stack analytics dashboard automating reporting for School on Wheels MA.",
      stack: "TypeScript, React, Node.js, PostgreSQL",
    },
    {
      title: "UX & Product Design Intern @ MALP Education",
      description: "Researched and redesigned parts of MALP's teacher training platform.",
      stack: "Figma, UX Research",
    },
    
  ] as { title: string; description: string; stack?: string }[],
};

export type TextBlock = "intro" | "about" | "experience";

export type Tile =
  // a square photo; with `href` the whole tile is a link
  | { id: string; type: "photo"; file: string; src?: string; alt: string; href?: string }
  // a square of color with a centered label. `href` opens in a new tab; `to`
  // goes to a page on this site.
  | { id: string; type: "link"; label: string; href: string; color: string }
  | { id: string; type: "link"; label: string; to: string; color: string }
  // an empty cell, to leave a gap in the grid
  | { id: string; type: "empty" }
  // a decorative square of color; `label` is optional
  | { id: string; type: "color"; color: string; label?: string }
  // text spanning 2 or 3 columns, and optionally 2 rows (always full width,
  // one row, on mobile). Vertically centered unless `alignTop` is set.
  | { id: string; type: "text"; span: 2 | 3; rows?: 2; alignTop?: boolean; block: TextBlock };

// Each page's tiles. Desktop: 4 columns, filled left to right in `tiles` order.
// Mobile: 2 columns, in `mobileOrder` (tiles left out are hidden on mobile).
// `squares` is which two columns hold the squares on desktop; the other two
// columns are for text and stretch to fill the width on wide screens.
export interface PageTiles {
  tiles: Tile[];
  mobileOrder: string[];
  squares: "left" | "right";
}

export const homePage: PageTiles = {
  squares: "left",
  tiles: [
    // row 1
    { id: "headshot", type: "photo", ...photo("headshot.png"), alt: "Kalen Lauring's headshot" },
    { id: "intro", type: "text", span: 3, alignTop: true, block: "intro" },

    // rows 2-3: a 2x2 block on the left, About Me on the right across both rows
    { id: "resume", type: "link", label: "Resume", href: links.resume, color: palette.blue },
    { id: "band", type: "photo", ...photo("band.png"), alt: "Kalen playing with her band" },
    { id: "about", type: "text", span: 2, rows: 2, alignTop: true, block: "about" },
    { id: "water", type: "photo", ...photo("water.png"), alt: "Water and rocks" },
    { id: "portfolio", type: "link", label: "Portfolio ↗", to: links.portfolio, color: palette.pink },
  ],
  mobileOrder: [
    "headshot",
    "intro",
    "about",
    "resume", "band",
    "water", "portfolio",
  ],
};

export const portfolioPage: PageTiles = {
  squares: "right",
  tiles: [
    // rows 1-2: Recent Work on the left across both rows, a 2x2 block on the right
    { id: "experience", type: "text", span: 2, rows: 2, alignTop: true, block: "experience" },
    { id: "game", type: "photo", ...photo("ravenrhythm.png"), alt: "Play Raven Rhythm", href: links.game },
    { id: "play", type: "link", label: "Play ↗", href: links.game, color: palette.pink },
    { id: "water", type: "photo", ...photo("water.png"), alt: "Water and rocks" },
    { id: "pink", type: "color", color: palette.pink },
  ],
  mobileOrder: [
    "experience",
    "game", "play",
    "water", "pink",
  ],
};
