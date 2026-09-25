import { NavLink } from "react-router-dom";
import { nav } from "../data/homepage";

const linkClass = "hover:opacity-70 transition-opacity underline-offset-4 decoration-2";

export default function Nav() {
  return (
    <nav aria-label="Main" className="mb-5">
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base sm:text-lg font-bold">
        {nav.map((item) => (
          <li key={item.label}>
            {"to" in item ? (
              <NavLink
                to={item.to}
                end
                className={({ isActive }) => `${linkClass}${isActive ? " underline" : ""}`}
              >
                {item.label}
              </NavLink>
            ) : (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
