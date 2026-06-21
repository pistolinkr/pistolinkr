/*
 * THE PISTOLINKR CODE MUSEUM
 * FeaturedExhibits — Main exhibition pieces (Room 02)
 * Design: Neo-Noir Futurism | Large display layout for top repos
 * Uses museum exhibit display case image as visual backdrop
 */

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { GitHubRepo, getLanguageClass, formatExhibitNumber } from "@/hooks/useGitHub";

const EXHIBIT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663440167945/VFjb8XH7rXXAbLFgKfi3HN/museum-exhibit-glow-CMHfRMLcAj9acTU7azhx8c.webp";

interface FeaturedExhibitsProps {
  repos: GitHubRepo[];
}

export default function FeaturedExhibits({ repos }: FeaturedExhibitsProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  // Pick top 3: highest stars + interesting descriptions
  const featured = repos
    .filter((r) => r.description)
    .slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="relative py-32 bg-[#0F1923] overflow-hidden">
      {/* Background exhibit image — very subtle */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url(${EXHIBIT_BG})` }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#0F1923] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="exhibit-label text-[11px]">Room 02</span>
            <div className="h-px flex-1 max-w-[60px] bg-[#C9A84C]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-white mb-4"
          >
            Featured Exhibits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#6B7A8D] text-base max-w-xl leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            The museum's most distinguished artifacts — selected for their ambition,
            technical depth, and creative vision.
          </motion.p>
        </div>

        {/* Featured items */}
        <div className="space-y-8">
          {featured.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <FeaturedItem repo={repo} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedItem({ repo, index }: { repo: GitHubRepo; index: number }) {
  const langClass = getLanguageClass(repo.language);
  const exhibitNum = formatExhibitNumber(index);

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="glass-panel border border-[rgba(0,212,255,0.12)] group-hover:border-[rgba(0,212,255,0.35)] transition-all duration-500 overflow-hidden">
        {/* Top glow line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00D4FF]/0 to-transparent group-hover:via-[#00D4FF]/50 transition-all duration-700" />

        <div className="p-8 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-8 items-start">
          {/* Exhibit number — large display */}
          <div className="hidden md:block">
            <div className="font-display text-7xl font-light text-[#00D4FF]/10 group-hover:text-[#00D4FF]/20 transition-colors duration-500 leading-none select-none">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Label row */}
            <div className="flex items-center gap-3 mb-4">
              <span className="exhibit-label text-[10px]">Featured · Exhibit {exhibitNum}</span>
              {repo.language && (
                <span className={`font-mono-museum text-[10px] px-2 py-0.5 border ${langClass}`}>
                  {repo.language}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4 group-hover:text-[#00D4FF] transition-colors duration-300">
              {repo.name}
            </h3>

            {/* Description */}
            <p className="text-[#8A9AB0] text-sm md:text-base leading-relaxed max-w-2xl mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {repo.description}
            </p>

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {repo.topics.slice(0, 6).map((topic) => (
                  <span
                    key={topic}
                    className="font-mono-museum text-[9px] px-2.5 py-1 border border-[#00D4FF]/15 text-[#6B7A8D] tracking-wider"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Stats column */}
          <div className="flex md:flex-col gap-6 md:gap-4 items-center md:items-end">
            <div className="text-center md:text-right">
              <div className="font-display text-2xl font-semibold text-white">{repo.stargazers_count}</div>
              <div className="exhibit-label text-[9px]">Stars</div>
            </div>
            <div className="text-center md:text-right">
              <div className="font-display text-2xl font-semibold text-white">{repo.forks_count}</div>
              <div className="exhibit-label text-[9px]">Forks</div>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-[#00D4FF] font-mono-museum text-[10px] tracking-wider uppercase mt-2 group-hover:gap-2.5 transition-all duration-300">
              View Exhibit
              <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                <path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
