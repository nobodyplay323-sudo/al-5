import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CHAPTERS = [
  {
    n: "01",
    color: "#FF5C00",
    title: "Refuzăm griul",
    text: "Neutralitatea nu e maturitate. Alegem culoarea care ne sperie puțin și o punem pe primul plan, unde îi e locul.",
  },
  {
    n: "02",
    color: "#0047FF",
    title: "Forma poate râde",
    text: "Un colț rotunjit, o asimetrie voită, o umbră dură. Craft-ul nu trebuie să fie solemn ca să fie serios.",
  },
  {
    n: "03",
    color: "#FF66D8",
    title: "Imperfecțiunea e umană",
    text: "Textura, granulația, mica greșeală cu intenție — acolo se vede mâna. Perfecțiunea sterilă e uitată instant.",
  },
  {
    n: "04",
    color: "#FFD600",
    title: "Curajul e stilul",
    text: "Nu cerem permisiunea. Croim, colorăm, exagerăm — și lăsăm cititorul să tragă concluziile.",
  },
];

const Chapter = ({ ch, i }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? -60 : 60, 0]);

  return (
    <div
      ref={ref}
      data-testid={`manifesto-${ch.n}`}
      className="relative border-b-2 border-[#1A1A1A] py-10 md:py-16"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 md:flex-row md:items-center md:gap-16">
        <motion.span
          style={{ x }}
          className="font-accent text-[22vw] font-extrabold leading-[0.75] tracking-tighter md:text-[14vw] lg:text-[13rem]"
        >
          <span style={{ color: ch.color }}>{ch.n}</span>
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="md:max-w-lg"
        >
          <h3 className="font-display text-4xl font-semibold tracking-tighter md:text-6xl">
            {ch.title}
          </h3>
          <p className="mt-4 font-body text-lg leading-relaxed text-[#F4F1EA]/70">
            {ch.text}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export const Manifesto = () => (
  <section
    id="manifest"
    data-testid="manifesto"
    className="bg-[#111111] px-6 py-24 text-[#F4F1EA] md:px-12 md:py-32"
  >
    <div className="mx-auto mb-8 max-w-[1400px]">
      <span className="font-accent text-sm uppercase tracking-[0.25em] text-[#F4F1EA]/50">
        Ce ne conduce
      </span>
      <h2 className="mt-2 font-display text-5xl font-bold tracking-tighter md:text-8xl">
        Manifestul.
      </h2>
    </div>
    {CHAPTERS.map((ch, i) => (
      <Chapter key={ch.n} ch={ch} i={i} />
    ))}
  </section>
);
