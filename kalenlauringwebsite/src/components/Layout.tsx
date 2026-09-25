import { useEffect } from "react";
import type { ReactNode } from "react";
import Nav from "./Nav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // each page starts at the top, even when arriving from a scrolled page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen w-full bg-page text-black px-4 py-4 overflow-x-clip">
      <main className="w-full max-w-[1600px] mx-auto p-3 sm:px-6 sm:py-2">
        <Nav />
        {children}
      </main>
    </div>
  );
}
