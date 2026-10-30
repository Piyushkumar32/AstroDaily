"use client";

import React, { useEffect, useState } from "react";

export default function CurrentDateBadge() {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <span className="text-slate-300 font-normal">
      {formattedDate || "Astronomy Highlights"}
    </span>
  );
}
