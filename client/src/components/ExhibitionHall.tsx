/*
 * THE PISTOLINKR CODE MUSEUM
 * ExhibitionHall — Main repository exhibit grid (Room 01)
 * Design: Neo-Noir Futurism | Staggered scroll-reveal grid with spotlight cards
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GitHubRepo } from "@/hooks/useGitHub";
import ExhibitCard from "./ExhibitCard";

interface ExhibitionHallProps {
  repos: GitHubRepo[];
  loading: boolean;
}

const LANGUAGES = ["All", "JavaScript", "TypeScript", "Python", "HTML", "Swift"];

export default function ExhibitionHall({ repos, loading }: ExhibitionHallProps) {
  const [filter, setFilter] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  const filtered = filter === "All"
    ? repos
    : repos.filter((r) => r.language === filter);

  return (
    <section id="exhibition" className="relative py-32 bg-[#0D1117]">
      {/* Top museum divider */}
      <div className="museum-divider mb-20" />
      {/* Room entrance indicator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pt-4 pointer-events-none">
        <div className="w-px h-12 bg-gradient-to-b from-[#00D4FF]/40 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="exhibit-label text-[11px]">Room 01</span>
            <div className="h-px flex-1 max-w-[60px] bg-[#C9A84C]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-white mb-4"
          >
            Exhibition Hall
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#6B7A8D] text-base max-w-xl leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Browse the complete collection of software exhibits. Each artifact represents
            a unique exploration of technology, science, and craft.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {LANGUAGES.map((lang) => {
            const count = lang === "All"
              ? repos.length
              : repos.filter((r) => r.language === lang).length;
            if (count === 0 && lang !== "All") return null;
            return (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`font-mono-museum text-[10px] tracking-wider uppercase px-4 py-2 border transition-all duration-300 ${
                  filter === lang
                    ? "border-[#00D4FF] text-[#00D4FF] bg-[#00D4FF]/10"
                    : "border-[rgba(0,212,255,0.15)] text-[#6B7A8D] hover:border-[#00D4FF]/40 hover:text-[#E8EDF2]"
                }`}
              >
                {lang}
                <span className="ml-2 opacity-50">({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-panel h-64 animate-pulse">
                <div className="p-6 space-y-4">
                  <div className="h-3 bg-[#00D4FF]/10 w-20" />
                  <div className="h-5 bg-[#00D4FF]/10 w-3/4" />
                  <div className="h-3 bg-[#00D4FF]/10 w-full" />
                  <div className="h-3 bg-[#00D4FF]/10 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Exhibit grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 6) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ExhibitCard repo={repo} index={i} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono-museum text-[#6B7A8D] text-sm tracking-wider">
              No exhibits found for this filter.
            </p>
          </div>
        )}
      </div>

      <div className="museum-divider mt-20" />
    </section>
  );
}
