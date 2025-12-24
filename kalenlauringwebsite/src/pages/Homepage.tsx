import { useEffect } from "react";
import headshot from "../assets/headshot.png";
import "./Homepage.css";

export default function Homepage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.fade-element');
      elements.forEach(el => el.classList.add('is-visible'));
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FFFFFC] text-black flex items-center justify-center px-4 overflow-x-hidden">
      <div className="flex flex-col items-center gap-3 w-full max-w-3xl"> {/* Reduced gap from 4 to 3, max-w from 4xl to 3xl */}

        <div className="w-full flex justify-center">
          <div className="typewriter-container">
            <div className="typed-out-responsive">Hello, I'm Kalen Lauring!</div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px]"> {/* Reduced from xs/sm/md */}
          <img
            src={headshot}
            alt="Kalen Lauring's headshot"
            className="w-full h-auto aspect-square rounded-md object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
          />
          <p className="text-center mt-3 sm:mt-5 text-xs sm:text-sm md:text-base fade-element"> {/* Reduced from sm/base/lg */}
            welcome to my website!
          </p>
        </div>

      </div>

      <p className="underline absolute top-2 sm:top-4 text-xs sm:text-sm md:text-base left-2 sm:left-4 fade-element"> {/* Reduced from sm/base/lg */}
        about
      </p>
    </div>
  );
}