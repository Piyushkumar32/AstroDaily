import React from "react";
import ApodShowcase from "@/components/ApodShowcase";
import CurrentDateBadge from "@/components/CurrentDateBadge";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 max-w-5xl space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
          <span>NASA Astronomy Picture of the Day</span>
          <span className="text-slate-500">&bull;</span>
          <CurrentDateBadge />
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
          Discover the Cosmos,{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            One Day at a Time
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
          Journey through the universe with daily imagery, deep space photographs, and scientific breakdowns curated directly from NASA&apos;s APOD archives.
        </p>
      </section>

      {/* APOD Main Showcase */}
      <section>
        <ApodShowcase />
      </section>

      {/* Feature Highlights Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xl font-bold">
            🌌
          </div>
          <h3 className="text-base font-semibold text-white">Daily Discoveries</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            A new astronomical wonder featured every day, highlighting stars, nebulas, galaxies, and planets.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl font-bold">
            🔭
          </div>
          <h3 className="text-base font-semibold text-white">Scientific Context</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Comprehensive explanations written and fact-checked by professional NASA astrophysicists.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center text-xl font-bold">
            ⚡
          </div>
          <h3 className="text-base font-semibold text-white">FastAPI Powered</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            High performance backend handling APOD caching, API quotas, and secure proxy requests.
          </p>
        </div>
      </section>
    </div>
  );
}
