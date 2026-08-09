import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArticleCard } from "@/components/ArticleCard";
import { fetchPosts, fetchCategories } from "@/lib/api";

export const FeaturedGrid = () => {
  const [posts, setPosts] = useState([]);
  const [cats, setCats] = useState(["Toate"]);
  const [active, setActive] = useState("Toate");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(setCats).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPosts(active)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [active]);

  const [lead, ...rest] = posts;

  return (
    <section id="articole" data-testid="featured-grid" className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-accent text-sm uppercase tracking-[0.25em] text-[#555555]">
              Ce citim acum
            </span>
            <h2 className="mt-2 font-display text-5xl font-bold tracking-tighter md:text-7xl">
              Poveștile ediției
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" data-testid="category-filters">
            {cats.map((c) => (
              <button
                key={c}
                data-testid={`filter-${c.toLowerCase()}`}
                onClick={() => setActive(c)}
                className={`rounded-full border-2 border-[#1A1A1A] px-4 py-2 font-body text-sm font-medium transition-[transform,background-color] duration-200 hover:translate-y-[-2px] ${
                  active === c ? "bg-[#1A1A1A] text-[#F4F1EA]" : "bg-transparent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-80 animate-pulse border-2 border-[#1A1A1A] bg-black/5 ${
                  i === 0 ? "md:col-span-8" : "md:col-span-4"
                }`}
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="font-body text-lg text-[#555555]">Nicio poveste aici încă.</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {lead && (
              <div className="md:col-span-8">
                <ArticleCard post={lead} big index={0} />
              </div>
            )}
            {rest[0] && (
              <div className="md:col-span-4">
                <ArticleCard post={rest[0]} index={1} />
              </div>
            )}
            {rest.slice(1).map((p, i) => (
              <div key={p.slug} className="md:col-span-4">
                <ArticleCard post={p} index={i + 2} />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
