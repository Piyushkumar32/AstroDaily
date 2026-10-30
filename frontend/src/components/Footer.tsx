import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-850/80 bg-slate-950/60 mt-auto py-8 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
        <p>
          Powered by{" "}
          <a
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
          >
            NASA Astronomy Picture of the Day (APOD) API
          </a>
        </p>
        <p className="text-slate-600">
          AstroDaily &bull; Exploring the cosmos, one day at a time.
        </p>
      </div>
    </footer>
  );
}
