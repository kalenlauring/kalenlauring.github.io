import ahavcare from "../assets/ahavcare.png";
import raven from "../assets/raven.png";
import ravenRhythm from "../assets/ravenrhythm.png";
import tally from "../assets/tally.png";

// Everything on the portfolio page: one featured project, then the other
// projects. The layout code in src/pages/Portfolio.tsx reads from this file.
// Links open in a new tab.

export const featured = {
  title: "Raven Rhythm",
  description: "Rhythm game inspired by Nintendo's Rhythm Heaven series. Built in Unity/C# with original music and art, and a custom beatmap engine.",
  color: "#B5D273",
  image: ravenRhythm,
  imageAlt: "Raven Rhythm game art",
  // shown at the bottom right of the description, with the text wrapping
  // around it; decorative, so no alt text
  raven,
  paragraphs: [
    "My favorite project I've ever worked on. I've always had a love for rhythm games, and this demo was my chance to bring that to life.",
    "Throughout the making of this game, I learned so much about prototyping, iterating on playtest feedback, and scoping features with a cross-disciplinary team, skills that have continued to serve me throughout my work.",
    "Us at Rhythm Studios hope that you enjoy our demo as much as we enjoyed making it! We hope to continue developing this game and bring it to a wider audience in the future.",
  ],
  // text in the paragraphs to turn into links (the first match in each
  // paragraph); they open in a new tab
  paragraphLinks: [{ text: "Rhythm Studios", href: "https://ravenrhythm.wixsite.com/my-site-1" }],
  // where the green square and the game art link to
  href: "https://github.com/kevinlukaixing/rhythm-raven",
  // a link at the bottom left of the description, beside the raven
  play: { text: "Click here to play!", href: "https://ravenrhythm.itch.io/raven-rhythm" },
};

export interface Project {
  id: string;
  title: string;
  description: string;
  // the title tile's background
  color: string;
  // a soft version of `color` behind the screenshot
  tint: string;
  screenshot: string;
  screenshotAlt: string;
  // leave out and the project's tiles aren't links
  href?: string;
}

// Shown in pairs (title tile + screenshot). Desktop: two projects per row with
// an empty cell between them. Mobile: one project per row. Add a project by
// adding an entry here.
export const otherProjects: Project[] = [
  {
    id: "tally",
    title: "Tally",
    description:
      "Reimbursement platform for Tufts University student orgs, developed for Tufts Hackathon 2026.",
    color: "#B9D0EE",
    tint: "#EEF4FB",
    screenshot: tally,
    screenshotAlt: "Tally's budget sheet",
    href: "https://github.com/Jet4stream/Tally",
  },
  {
    id: "ahavcare",
    title: "AhavCare",
    description:
      "Worked with the client to map real booking scenarios and turned them into custom WordPress plugins for flexible scheduling, notifications, and ranked-choice sitter matching.",
    color: "#E0609E",
    tint: "#FBEBF3",
    screenshot: ahavcare,
    screenshotAlt: "AhavCare's homepage",
    href: "https://ahavcare.com/",
  },
];
