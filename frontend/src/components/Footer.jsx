import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer data-testid="footer" className="bg-[#111111] px-6 py-16 text-[#F4F1EA] md:px-12">
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div className="max-w-sm">
          <Link to="/" className="font-display text-4xl font-bold tracking-tighter">
            JUCĂUȘ<span style={{ color: "#FF5C00" }}>.</span>
          </Link>
          <p className="mt-4 font-body text-sm leading-relaxed text-[#F4F1EA]/60">
            Revista culturii vizuale. Artă, modă, arhitectură și design fără griuri sigure.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {[
            { h: "Rubrici", items: ["Artă", "Modă", "Arhitectură", "Design"] },
            { h: "Revistă", items: ["Manifest", "Ediția 01", "Arhivă", "Despre"] },
            { h: "Social", items: ["Instagram", "Behance", "X", "Newsletter"] },
          ].map((col) => (
            <div key={col.h}>
              <h4 className="font-accent text-xs uppercase tracking-[0.2em] text-[#F4F1EA]/40">{col.h}</h4>
              <ul className="mt-4 space-y-2">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#articole" className="font-body text-sm text-[#F4F1EA]/80 transition-colors duration-200 hover:text-[#FFD600]">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[#F4F1EA]/15 pt-6 md:flex-row md:items-center">
        <span className="font-body text-xs text-[#F4F1EA]/50">© {new Date().getFullYear()} Jucăuș Magazine. Curaj cromatic.</span>
        <span className="font-body text-xs text-[#F4F1EA]/50">Făcut cu culoare, nu cu gri.</span>
      </div>
    </div>
  </footer>
);
