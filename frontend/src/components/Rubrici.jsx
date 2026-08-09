import React from "react";
import { motion } from "framer-motion";
import { Palette, Shirt, Building2, Sparkles } from "lucide-react";

const RUBRICI = [
  { icon: Palette, name: "Artă", color: "#FF5C00", desc: "Ateliere, pânze și minți care refuză neutralitatea." },
  { icon: Shirt, name: "Modă", color: "#FF66D8", desc: "Garderoba ca formă de vorbire liberă." },
  { icon: Building2, name: "Arhitectură", color: "#0047FF", desc: "Clădiri care aleg bucuria în locul monumentalității." },
  { icon: Sparkles, name: "Design", color: "#FFD600", desc: "Craft-ul imperfect, textura și curajul formelor." },
];

export const Rubrici = () => (
  <section id="rubrici" data-testid="rubrici" className="px-6 py-24 md:px-12 md:py-32">
    <div className="mx-auto max-w-[1400px]">
      <div className="mb-12">
        <span className="font-accent text-sm uppercase tracking-[0.25em] text-[#555555]">
          Pe secțiuni
        </span>
        <h2 className="mt-2 font-display text-5xl font-bold tracking-tighter md:text-7xl">
          Rubricile noastre
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {RUBRICI.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.a
              key={r.name}
              href="#articole"
              data-testid={`rubrica-${r.name.toLowerCase()}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-4 border-2 border-[#1A1A1A] bg-white p-7 shadow-[6px_6px_0px_0px_#1A1A1A] transition-[transform,box-shadow] duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_0px_#1A1A1A]"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#1A1A1A]"
                style={{ background: r.color }}
              >
                <Icon size={24} color="#1A1A1A" />
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tighter">{r.name}</h3>
              <p className="font-body text-sm leading-relaxed text-[#555555]">{r.desc}</p>
            </motion.a>
          );
        })}
      </div>
    </div>
  </section>
);
