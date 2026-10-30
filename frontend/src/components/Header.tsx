import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all">
            <span className="text-white text-lg font-bold">✨</span>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              Astro<span className="text-indigo-400">Daily</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
              NASA APOD
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <a
            href="https://github.com/Piyushkumar32/AstroDaily"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/60"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
