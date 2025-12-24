import { useEffect } from "react";
import type { ReactNode } from "react";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
  fadeDelay?: number;
}

export default function Layout({ children, fadeDelay = 100 }: LayoutProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.fade-element');
      elements.forEach(el => el.classList.add('is-visible'));
    }, fadeDelay);

    return () => clearTimeout(timer);
  }, [fadeDelay]);

  return (
    <div className="min-h-screen w-full bg-[#FFFFFC] text-black flex flex-col px-4 overflow-x-hidden">
      <TopNav />
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}