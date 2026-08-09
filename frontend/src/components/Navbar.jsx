import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Povești", to: "/#articole" },
  { label: "Manifest", to: "/#manifest" },
  { label: "Rubrici", to: "/#rubrici" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (to) => {
    setOpen(false);
    const hash = to.split("#")[1];
    if (hash) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      navigate(to);
    }
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-[1000] border-b-2 border-[#1A1A1A] transition-colors duration-300 ${
        scrolled ? "bg-[#F4F1EA]/90 backdrop-blur-xl" : "bg-[#F4F1EA]"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <Link
          to="/"
          data-testid="logo-link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-2xl font-bold tracking-tighter leading-none md:text-3xl"
        >
          JUCĂUȘ<span style={{ color: "#FF5C00" }}>.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.label}
              data-testid={`nav-${l.label.toLowerCase()}`}
              onClick={() => go(l.to)}
              className="group relative font-body text-sm font-medium"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#1A1A1A] transition-[width] duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            data-testid="nav-subscribe"
            onClick={() => go("/#newsletter")}
            className="group flex items-center gap-1 rounded-full border-2 border-[#1A1A1A] bg-[#FFD600] px-5 py-2 font-body text-sm font-bold shadow-[4px_4px_0px_0px_#1A1A1A] transition-[transform,box-shadow] duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#1A1A1A]"
          >
            Abonează-te
            <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:rotate-45" />
          </button>
        </nav>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1A1A1A] md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t-2 border-[#1A1A1A] bg-[#F4F1EA] md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-6">
              {LINKS.map((l) => (
                <button
                  key={l.label}
                  data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                  onClick={() => go(l.to)}
                  className="py-2 text-left font-display text-3xl font-semibold tracking-tighter"
                >
                  {l.label}
                </button>
              ))}
              <button
                data-testid="mobile-nav-subscribe"
                onClick={() => go("/#newsletter")}
                className="mt-3 rounded-full border-2 border-[#1A1A1A] bg-[#FFD600] px-5 py-3 text-center font-body font-bold shadow-[4px_4px_0px_0px_#1A1A1A]"
              >
                Abonează-te
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
