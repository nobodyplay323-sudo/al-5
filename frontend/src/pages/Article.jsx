import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { fetchPost } from "@/lib/api";
import { onAccentText } from "@/lib/theme";
import { ArticleCard } from "@/components/ArticleCard";
import { fetchPosts } from "@/lib/api";

export default function Article() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setPost(null);
    setNotFound(false);
    fetchPost(slug)
      .then((p) => {
        setPost(p);
        fetchPosts(p.category).then((all) =>
          setRelated(all.filter((a) => a.slug !== p.slug).slice(0, 3))
        );
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="font-display text-6xl font-bold tracking-tighter">404</h1>
        <p className="font-body text-lg text-[#555555]">Poveastea asta s-a rătăcit.</p>
        <Link to="/" className="rounded-full border-2 border-[#1A1A1A] bg-[#FFD600] px-6 py-3 font-body font-bold shadow-[4px_4px_0px_0px_#1A1A1A]">
          Înapoi acasă
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1A1A1A] border-t-transparent" />
      </div>
    );
  }

  return (
    <main data-testid="article-page" className="pt-20">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-[65px] z-[900] h-1 w-full origin-left"
        data-testid="reading-progress"
      >
        <div className="h-full w-full" style={{ background: post.accent }} />
      </motion.div>

      {/* header */}
      <div className="px-6 pb-10 pt-12 md:px-12">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            data-testid="back-link"
            className="mb-8 inline-flex items-center gap-2 font-body text-sm font-medium text-[#555555] transition-colors hover:text-[#1A1A1A]"
          >
            <ArrowLeft size={16} /> Toate poveștile
          </Link>
          <span
            className="inline-block whitespace-nowrap rounded-full border-2 border-[#1A1A1A] px-3 py-1 font-body text-xs font-bold uppercase tracking-wide"
            style={{ background: post.accent, color: onAccentText(post.accent) }}
          >
            {post.category}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl"
          >
            {post.title}
          </motion.h1>
          <div className="mt-6 flex items-center gap-4 font-body text-sm text-[#555555]">
            <span className="font-medium text-[#1A1A1A]">{post.author}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.read_time} min de citit</span>
          </div>
        </div>
      </div>

      {/* full-bleed cover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="mx-6 mb-14 border-2 border-[#1A1A1A] shadow-[10px_10px_0px_0px_#1A1A1A] md:mx-12"
      >
        <img src={post.cover} alt={post.title} className="max-h-[70vh] w-full object-cover" />
      </motion.div>

      {/* body */}
      <article className="px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-3xl">
          {post.body.map((b, i) => {
            if (b.type === "h")
              return (
                <h2 key={i} className="mt-12 font-display text-3xl font-semibold tracking-tighter md:text-4xl">
                  {b.text}
                </h2>
              );
            if (b.type === "quote")
              return (
                <blockquote
                  key={i}
                  className="my-12 border-l-4 pl-6 font-display text-2xl font-medium leading-tight tracking-tight md:text-4xl"
                  style={{ borderColor: post.accent }}
                >
                  “{b.text}”
                </blockquote>
              );
            return (
              <p
                key={i}
                className={`mt-6 font-body text-lg leading-relaxed text-[#2a2a2a] ${i === 0 ? "dropcap" : ""}`}
              >
                {b.text}
              </p>
            );
          })}
        </div>
      </article>

      {/* related */}
      {related.length > 0 && (
        <section className="border-t-2 border-[#1A1A1A] px-6 py-20 md:px-12">
          <div className="mx-auto max-w-[1400px]">
            <h3 className="mb-10 font-display text-4xl font-bold tracking-tighter md:text-5xl">
              Continuă lectura
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((p, i) => (
                <ArticleCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
