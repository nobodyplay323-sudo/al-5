import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { subscribe } from "@/lib/api";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await subscribe(email);
      toast.success(res.message, { description: res.already ? "" : "Îți mulțumim că ni te alături." });
      if (!res.already) setEmail("");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Ceva n-a mers. Verifică adresa de email.";
      toast.error(typeof msg === "string" ? msg : "Adresă de email invalidă.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      data-testid="newsletter"
      className="border-y-2 border-[#1A1A1A] bg-[#FFD600] px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-sm uppercase tracking-[0.25em]">Fără spam. Doar culoare.</span>
          <h2 className="mt-3 font-display text-5xl font-bold leading-[0.9] tracking-tighter md:text-7xl">
            Primește ediția în inbox.
          </h2>
          <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-[#1A1A1A]/70">
            O dată pe săptămână, cele mai îndrăznețe povești despre artă, modă și design.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          data-testid="newsletter-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="adresa@email.com"
            data-testid="newsletter-input"
            className="w-full flex-1 border-2 border-[#1A1A1A] bg-[#F4F1EA] px-5 py-4 font-body text-base outline-none placeholder:text-[#555555] focus:shadow-[4px_4px_0px_0px_#1A1A1A]"
          />
          <button
            type="submit"
            disabled={loading}
            data-testid="newsletter-submit"
            className="group flex items-center justify-center gap-2 border-2 border-[#1A1A1A] bg-[#1A1A1A] px-7 py-4 font-body font-bold text-[#F4F1EA] shadow-[5px_5px_0px_0px_#FF5C00] transition-[transform,box-shadow] duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#FF5C00] disabled:opacity-60"
          >
            {loading ? "Se trimite..." : "Abonează-te"}
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};
