"use client";

import React, { useEffect, useState } from "react";
import { getApod, ApodData } from "@/lib/api";

export default function ApodShowcase() {
  const [apod, setApod] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApodData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getApod();
      setApod(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load Astronomy Picture of the Day.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApodData();
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl shadow-indigo-950/40">
      {/* Top Meta Bar */}
      <div className="px-6 py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-950/50">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
            Astronomy Picture of the Day
          </span>
        </div>
        {apod?.date && (
          <div className="text-xs text-indigo-300 font-mono bg-indigo-950/60 px-3 py-1 rounded-md border border-indigo-800/50 shadow-sm">
            {apod.date}
          </div>
        )}
      </div>

      {/* Dynamic Media Showcase Area */}
      {apod && (
        <div className="relative w-full bg-slate-950/80 p-3 sm:p-6 border-b border-slate-800/80 flex flex-col items-center justify-center overflow-hidden group">
          {apod.media_type === "video" ? (
            <div className="w-full aspect-video max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-black">
              <iframe
                src={apod.url}
                title={apod.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="relative w-full flex items-center justify-center rounded-xl overflow-hidden bg-slate-950">
              {/* Subtle cosmic glow behind the main image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={apod.url}
                alt={apod.title}
                className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl transition-all duration-500 ease-out group-hover:scale-[1.01]"
                loading="eager"
              />
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 sm:p-8 space-y-4">
        {apod && (
          <>
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Featured Target
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 tracking-tight">
                {apod.title}
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {apod.explanation}
            </p>

            {apod.copyright && (
              <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                <span className="text-slate-500">Image Credit &amp; Copyright:</span>{" "}
                <span className="text-slate-300 font-medium">{apod.copyright}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
