import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const LINES = ["POVEȘTI", "COLORATE", "& IDEI VII"];

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={ref}
      data-testid="hero"
      className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pt-40"
    >
      {/* floating parallax objects */}
      <motion.img
        src="https://images.unsplash.com/photo-1686356513907-24c45338357f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHw0fHxjb2xvcmZ1bCUyMHN1cnJlYWwlMjBhcnQlMjBkZXNpZ258ZW58MHx8fHwxNzg2MzAwMzQ4fDA&ixlib=rb-4.1.0&q=85"
        alt=""
        style={{ y: y1, rotate: rot }}
        className="pointer-events-none absolute right-[4%] top-[14%] hidden h-56 w-44 rotate-6 border-2 border-[#1A1A1A] object-cover shadow-[8px_8px_0px_0px_#1A1A1A] md:block lg:h-72 lg:w-56"
      />
      <motion.img
        src="https://images.unsplash.com/photo-1602450069437-d52c62f52a71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHxjb2xvcmZ1bCUyMHN1cnJlYWwlMjBhYnN0cmFjdCUyMGFydHxlbnwwfHx8fDE3ODYzMDA0Mzh8MA&ixlib=rb-4.1.0&q=85"
        alt=""
        style={{ y: y2 }}
        className="pointer-events-none absolute bottom-[10%] right-[22%] hidden h-40 w-32 -rotate-6 border-2 border-[#1A1A1A] object-cover shadow-[8px_8px_0px_0px_#1A1A1A] lg:block"
      />

      <motion.div style={{ y: heroY }} className="relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-[#FF5C00]" />
          <span className="font-accent text-sm uppercase tracking-[0.25em]">
            Revista culturii vizuale · Ediția 01
          </span>
        </motion.div>

        <h1 className="font-display text-[15vw] font-bold uppercase leading-[0.85] tracking-tighter md:text-[13vw] lg:text-[11rem]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden py-[0.5vw]">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="show"
                className="block"
                style={i === 1 ? { color: "#0047FF" } : {}}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="max-w-md font-body text-base leading-relaxed text-[#555555] md:text-lg"
          >
            Un jurnal despre artă, modă, arhitectură și designul care refuză
            să fie plictisitor. Fără griuri sigure. Doar curaj cromatic.
          </motion.p>

          <motion.a
            href="#articole"
            data-testid="hero-scroll-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="group flex items-center gap-3 rounded-full border-2 border-[#1A1A1A] bg-[#1A1A1A] px-6 py-3 font-body font-bold text-[#F4F1EA] shadow-[6px_6px_0px_0px_#FF5C00] transition-[transform,box-shadow] duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#FF5C00]"
          >
            Explorează poveștile
            <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};
