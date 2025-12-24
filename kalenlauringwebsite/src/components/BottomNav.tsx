import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

export default function BottomNav() {
  return (
    <div className="w-full flex justify-center pb-4 sm:pb-6">
      <nav className="flex gap-4 sm:gap-6 fade-element">
        <a href="https://github.com/kalenlauring" target="_blank" rel="noopener noreferrer">
          <img 
            src={github} 
            alt="GitHub" 
            className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer hover:opacity-70 transition-opacity"
          />
        </a>
        <a href="https://linkedin.com/in/kalen-lauring" target="_blank" rel="noopener noreferrer">
          <img 
            src={linkedin} 
            alt="LinkedIn" 
            className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer hover:opacity-70 transition-opacity"
          />
        </a>
      </nav>
    </div>
  );
}