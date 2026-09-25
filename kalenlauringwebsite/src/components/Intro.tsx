import { intro } from "../data/homepage";

export default function Intro() {
  return (
    <>
      <h1 className="tile-display">{intro.heading}</h1>
      <p className="tile-body flex flex-wrap gap-x-3 text-[15px] md:text-lg font-bold">
        <span>{intro.pronouns}</span>
        <a href={`mailto:${intro.email}`} className="underline hover:opacity-70">
          {intro.email}
        </a>
        <span>{intro.location}</span>
      </p>
      <ul className="mt-3 flex gap-3">
        {intro.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="block hover:opacity-70 transition-opacity"
            >
              <img src={social.icon} alt="" className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
