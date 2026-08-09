import React from "react";
import Marquee from "react-fast-marquee";

const WORDS = ["ARTĂ", "MODĂ", "ARHITECTURĂ", "DESIGN", "CULTURĂ", "CULOARE"];

export const EditorialMarquee = () => (
  <div
    data-testid="marquee"
    className="border-y-2 border-[#1A1A1A] bg-[#FF66D8] py-5 md:py-7"
  >
    <Marquee speed={45} gradient={false} autoFill>
      {WORDS.map((w, i) => (
        <span key={i} className="mx-6 flex items-center gap-6">
          <span
            className={`font-accent text-4xl font-extrabold uppercase tracking-tight md:text-6xl ${
              i % 2 === 0 ? "text-[#1A1A1A]" : "text-stroke"
            }`}
          >
            {w}
          </span>
          <span className="text-3xl md:text-5xl">✦</span>
        </span>
      ))}
    </Marquee>
  </div>
);
