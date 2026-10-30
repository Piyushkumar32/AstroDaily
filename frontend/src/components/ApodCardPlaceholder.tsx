import React from "react";

export default function ApodCardPlaceholder() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl shadow-indigo-950/30">
      {/* Top Banner / Meta */}
      <div className="px-6 py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
            Astronomy Picture of the Day Placeholder
          </span>
        </div>
        <div className="text-xs text-slate-400 font-mono bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">
          Today &bull; 2026-10-30
        </div>
      </div>

      {/* Media Placeholder Area */}
      <div className="relative aspect-video w-full bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-900 flex flex-col items-center justify-center p-8 text-center border-b border-slate-800/80 overflow-hidden">
        {/* Decorative cosmic rings */}
        <div className="absolute w-80 h-80 rounded-full border border-indigo-500/10 -top-10 -right-10 pointer-events-none" />
        <div className="absolute w-96 h-96 rounded-full border border-purple-500/10 -bottom-20 -left-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-md space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl shadow-inner shadow-indigo-500/20">
            🔭
          </div>
          <h3 className="text-lg font-semibold text-white">
            Cosmic Viewfinder
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            NASA APOD integration placeholder. Live high-resolution cosmic imagery, videos, and astronomical photography will be rendered here.
          </p>
          <span className="text-xs font-medium text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-3 py-1 rounded-full">
            Ready for Phase 2 API connection
          </span>
        </div>
      </div>

      {/* Details / Text Description Placeholder */}
      <div className="p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Featured Target
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Cosmic Cliffs of the Carina Nebula (Sample Placeholder)
          </h2>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          This landscape of &quot;mountains&quot; and &quot;valleys&quot; speckled with glittering stars is actually the edge of a nearby, young, star-forming region NGC 3324 in the Carina Nebula. Captured in infrared light by NASA&apos;s space telescopes, this reveals for the first time previously invisible areas of star birth.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 text-xs text-slate-400">
          <div>
            <span className="text-slate-500">Image Credit &amp; Copyright:</span>{" "}
            <span className="text-slate-300 font-medium">NASA / ESA / CSA</span>
          </div>
          <div className="flex gap-2">
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md text-slate-300 border border-slate-700/50">
              HD Media
            </span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md text-slate-300 border border-slate-700/50">
              Interactive
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
