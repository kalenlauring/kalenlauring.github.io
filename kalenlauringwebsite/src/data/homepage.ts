import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

// Everything on the homepage lives here: text, photos, colors, and links.
// The layout code in src/components/TileGrid.tsx reads from this file.

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
  // TODO: replace with the game's live URL (or its repo). Used by the game
  // screenshot and the Play tile.
  game: "https://github.com/kalenlauring",
};

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
    "At Tufts, I’ve served as a member of the executive board for Tufts Vietnamese Student Association for 3 years, along with Tufts Student Sociology Board, Jumbocode, Symphony Orchestra.",
    " In my free time, I enjoy listening to NPR’s This American Life, doing the crossword, and playing the bass, and hiking with friends. ",
  ],
};

export const experience = {
  heading: "Experience & Projects",
  entries: [
    {
      title: "Raven Rhythm",
      description: "A rhythm game where x.",
      stack: "x, x",
    },
    {
      title: "Freelance Web Developer",
      description: "Booking platform for a babysitting service.",
      stack: "WordPress, custom booking & payments",
    },
    {
      title: "Freelance Web Developer",
      description: "Clinical assessment web app.",
      stack: "React, Node, Prisma, PostgreSQL",
    },
  ],
};

export type TextBlock = "intro" | "about" | "experience";

export type Tile =
  // a square photo; with `href` the whole tile is a link
  | { id: string; type: "photo"; file: string; src?: string; alt: string; href?: string }
  // a square of color with a centered label, linking out (opens in a new tab)
  | { id: string; type: "link"; label: string; href: string; color: string }
  // an empty cell, to leave a gap in the grid
  | { id: string; type: "empty" }
  // a decorative square of color; `label` is optional
  | { id: string; type: "color"; color: string; label?: string }
  // text spanning 2 or 3 columns, and optionally 2 rows (always full width,
  // one row, on mobile). Vertically centered unless `alignTop` is set.
  | { id: string; type: "text"; span: 2 | 3; rows?: 2; alignTop?: boolean; block: TextBlock };

// Desktop: 4 columns, filled left to right in this order.
export const tiles: Tile[] = [
  // row 1
  { id: "headshot", type: "photo", ...photo("headshot.png"), alt: "Kalen Lauring's headshot" },
  { id: "intro", type: "text", span: 3, alignTop: true, block: "intro" },

  // rows 2-3: a 2x2 block on the left with the band photo and Resume on a
  // diagonal, About Me on the right across both rows
  { id: "empty-1", type: "empty" },
  { id: "band", type: "photo", ...photo("band.png"), alt: "Kalen playing with her band" },
  { id: "about", type: "text", span: 2, rows: 2, alignTop: true, block: "about" },
  { id: "resume", type: "link", label: "Resume", href: links.resume, color: palette.blue },
  { id: "empty-2", type: "empty" },

  // rows 4-5: Experience & Projects on the left across both rows, a 2x2 block on the right
  { id: "experience", type: "text", span: 2, rows: 2, alignTop: true, block: "experience" },
  { id: "game", type: "photo", ...photo("ravenrhythm.png"), alt: "Play Raven Rhythm", href: links.game },
  { id: "play", type: "link", label: "Play ↗", href: links.game, color: palette.pink },
  { id: "water", type: "photo", ...photo("water.png"), alt: "Water and rocks" },
  { id: "pink", type: "color", color: palette.pink },
];

// Mobile: 2 columns, in this order. Tiles left out here are hidden on mobile.
export const mobileOrder: string[] = [
  "headshot",
  "intro",
  "about",
  "resume", "band",
  "experience",
  "game", "play",
  "water", "pink",
];
