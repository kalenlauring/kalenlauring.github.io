import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

// The homepage's text, photos, colors, and tiles, plus the links and nav shared
// by every page. The layout code in src/components/TileGrid.tsx reads from this
// file. The portfolio page's content is in portfolio.ts.

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
};

// The nav at the top of every page. `to` is a page on this site; `href` opens
// in a new tab.
export const nav: ({ label: string; to: string } | { label: string; href: string })[] = [
  { label: "home", to: "/" },
  { label: "portfolio", to: links.portfolio },
  { label: "resume", href: links.resume },
];

export const intro: {
  heading: string;
  tagline?: string;
  pronouns: string;
  email: string;
  location: string;
  socials: { label: string; href: string; icon: string }[];
} = {
  heading: "Hello, I'm Kalen Lauring!",
  // optional line under the heading; add `tagline: "..."` here to show one
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
    "I'm a current Junior at Tufts University majoring in Computer Science and Sociology, and minoring Asian American Studies. ",
    "In my work with tech, I’m interested in taking on projects that focus on improving our daily lives, both big and small, and creating equitable technology for all users.",
    "In my work with people, I'm interested in working to working within my community to cultivate mutual support and coalition-building through mentorship, advocacy, and community organizing.",
    "At school, I’ve served on the executive board for Tufts Vietnamese Student Association for the last 3 years, along with Tufts Sociology Advisory Board, Symphony Orchestra, and Jumbocode.",
    " In my free time, I enjoy listening to NPR’s This American Life, doing the crossword, playing the bass, and hiking with friends!. ",
  ],
  // text in the paragraphs to turn into links (the first match in each
  // paragraph); they open in a new tab
  paragraphLinks: [
    { text: "Tufts Sociology Advisory Board", href: "https://as.tufts.edu/sociology/people/student-advisory-board" },
    { text: "Jumbocode", href: "https://jumbocode.org/projects/school-on-wheels" },
  ],
};

export const experience = {
  heading: "Recent Work",
  // `stack` is optional
  entries: [
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

export type TextBlock = "intro" | "about";

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
  // text spanning 2 or 3 columns, and optionally 2 rows, on desktop. Below
  // 1024px, span 3 sits in the column beside a square and span 2 is full width.
  // Vertically centered unless `align: "top"` is set.
  | { id: string; type: "text"; span: 2 | 3; rows?: 2; align?: "top"; block: TextBlock };

// Each page's tiles. Desktop (1024px and up): 4 columns, filled left to right
// in `tiles` order. Tablet (640-1023px) and mobile: 2 columns, in
// `tabletOrder` and `mobileOrder` (tiles left out are hidden at that size).
// `squares` is which two columns hold the squares on desktop; the other two
// columns are for text and take the rest of the width.
export interface PageTiles {
  tiles: Tile[];
  tabletOrder: string[];
  mobileOrder: string[];
  squares: "left" | "right";
}

export const homePage: PageTiles = {
  squares: "left",
  tiles: [
    // row 1
    { id: "headshot", type: "photo", ...photo("headshot.png"), alt: "Kalen Lauring's headshot" },
    { id: "intro", type: "text", span: 3, align: "top", block: "intro" },

    // rows 2-3: a 2x2 block on the left, About Me on the right across both rows
    { id: "resume", type: "link", label: "Resume", href: links.resume, color: palette.blue },
    { id: "band", type: "photo", ...photo("band.png"), alt: "Kalen playing with her band" },
    { id: "about", type: "text", span: 2, rows: 2, align: "top", block: "about" },
    { id: "water", type: "photo", ...photo("water.png"), alt: "Water and rocks" },
    { id: "portfolio", type: "link", label: "Portfolio", to: links.portfolio, color: palette.pink },
  ],
  tabletOrder: [
    "headshot", "intro",
    "resume", "band",
    "water", "portfolio",
    "about",
  ],
  mobileOrder: [
    "headshot", "intro",
    "about",
    "resume", "band",
    "water", "portfolio",
  ],
};
