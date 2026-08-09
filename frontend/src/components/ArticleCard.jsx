import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { onAccentText } from "@/lib/theme";

export const ArticleCard = ({ post, big = false, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        to={`/articol/${post.slug}`}
        data-testid={`article-card-${post.slug}`}
        className="group flex h-full flex-col overflow-hidden border-2 border-[#1A1A1A] bg-white shadow-[8px_8px_0px_0px_#1A1A1A] transition-[transform,box-shadow] duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#1A1A1A]"
      >
        <div className={`relative overflow-hidden border-b-2 border-[#1A1A1A] ${big ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
          />
          <span
            className="absolute left-4 top-4 whitespace-nowrap rounded-full border-2 border-[#1A1A1A] px-3 py-1 font-body text-xs font-bold uppercase tracking-wide"
            style={{ background: post.accent, color: onAccentText(post.accent) }}
          >
            {post.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <span className="font-accent text-xs uppercase tracking-[0.2em] text-[#555555]">
            {post.kicker}
          </span>
          <h3
            className={`mt-3 font-display font-semibold leading-[1.02] tracking-tight ${
              big ? "text-3xl md:text-5xl" : "text-2xl md:text-[1.7rem]"
            }`}
          >
            {post.title}
          </h3>
          {big && (
            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-[#555555]">
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between pt-6">
            <div className="flex items-center gap-3 font-body text-sm text-[#555555]">
              <span className="font-medium text-[#1A1A1A]">{post.author}</span>
              <span className="flex items-center gap-1">
                <Clock size={13} /> {post.read_time} min
              </span>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1A1A1A] transition-colors duration-200 group-hover:bg-[#FFD600]">
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:rotate-45" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
