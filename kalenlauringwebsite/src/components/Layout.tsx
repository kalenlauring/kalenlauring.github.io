import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white text-black px-4 py-4 sm:py-8 overflow-x-clip">
      <main className="w-full max-w-[1220px] mx-auto p-3 sm:p-6">
        {children}
      </main>
    </div>
  );
}
