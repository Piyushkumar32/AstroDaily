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
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl shadow-indigo-950/30">
      {/* Top Meta Bar */}
      <div className="px-6 py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-400" />
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
            Astronomy Picture of the Day
          </span>
        </div>
        {apod?.date && (
          <div className="text-xs text-indigo-300 font-mono bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/50">
            {apod.date}
          </div>
        )}
      </div>

      {/* Basic Content Section */}
      <div className="p-6 sm:p-8 space-y-4">
        {apod && (
          <>
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Featured Target
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {apod.title}
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {apod.explanation}
            </p>

            {apod.copyright && (
              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400">
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
