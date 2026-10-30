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

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl shadow-indigo-950/30 animate-pulse">
        {/* Skeleton Top Bar */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/50">
          <div className="h-4 w-48 bg-slate-800 rounded-md" />
          <div className="h-4 w-24 bg-slate-800 rounded-md" />
        </div>

        {/* Skeleton Media Viewer */}
        <div className="w-full aspect-video max-h-[60vh] bg-slate-950 flex flex-col items-center justify-center p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center text-2xl text-slate-600">
            🔭
          </div>
          <div className="h-3 w-40 bg-slate-800 rounded-full" />
        </div>

        {/* Skeleton Text Content */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="space-y-2">
            <div className="h-3 w-28 bg-slate-800 rounded-md" />
            <div className="h-7 w-3/4 bg-slate-800 rounded-md" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-800/80 rounded" />
            <div className="h-4 w-full bg-slate-800/80 rounded" />
            <div className="h-4 w-5/6 bg-slate-800/80 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Error State with Retry
  if (error || !apod) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-red-900/40 bg-slate-900/80 backdrop-blur-md p-8 sm:p-12 text-center space-y-5 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-800/50 flex items-center justify-center text-3xl mx-auto shadow-inner">
          🛰️
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-xl font-bold text-white">
            Cosmic Signal Interrupted
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {error || "Unable to fetch today's Astronomy Picture of the Day from the API."}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={fetchApodData}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            <span>🔄</span> Try Again
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Make sure your FastAPI backend is running at{" "}
          <code className="text-indigo-300 font-mono">http://localhost:8000</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl shadow-indigo-950/40">
      {/* Top Meta Bar */}
      <div className="px-6 py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-950/50">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
            Astronomy Picture of the Day
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 uppercase">
            {apod.media_type}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {apod.hdurl && (
            <a
              href={apod.hdurl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-indigo-950/90 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60 transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="View full high-resolution image in a new tab"
            >
              <span>🔍</span> View HD Image
            </a>
          )}
          {apod.date && (
            <div className="text-xs text-indigo-300 font-mono bg-indigo-950/60 px-3 py-1 rounded-md border border-indigo-800/50 shadow-sm">
              {apod.date}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Media Showcase Area */}
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

      {/* Content Section */}
      <div className="p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Featured Target
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 tracking-tight">
              {apod.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {apod.hdurl && (
              <a
                href={apod.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <span>🔍</span> View HD Image
              </a>
            )}
            {apod.media_type === "video" && (
              <a
                href={apod.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-purple-600 hover:bg-purple-500 active:scale-95 text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                <span>▶️</span> Open NASA Video
              </a>
            )}
          </div>
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
      </div>
    </div>
  );
}
