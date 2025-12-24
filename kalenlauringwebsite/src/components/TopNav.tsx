import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'portfolio', path: '/portfolio' }
];
const navLinkClass = "underline text-xs sm:text-sm md:text-base cursor-pointer hover:opacity-70 transition-opacity";

export default function TopNav() {
  return (
    <div className="w-full flex justify-center pt-2 sm:pt-4">
      <nav className="flex gap-4 sm:gap-6 md:gap-8 fade-element">
        {navLinks.map((link) => (
          <Link key={link.name} to={link.path} className={navLinkClass}>
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}