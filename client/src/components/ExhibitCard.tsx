/*
 * THE PISTOLINKR CODE MUSEUM
 * ExhibitCard — Individual repository display case
 * Design: Neo-Noir Futurism | Glass panel + spotlight glow + gold exhibit plaque
 * Animation: Framer Motion hover tilt + glow intensification
 */

import { motion, useMotionValue, useTransform } from "framer-motion";
import { GitHubRepo, getLanguageClass, formatExhibitNumber } from "@/hooks/useGitHub";
import { useRef } from "react";

interface ExhibitCardProps {
  repo: GitHubRepo;
  index: number;
}

export default function ExhibitCard({ repo, index }: ExhibitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const langClass = getLanguageClass(repo.language);
  const exhibitNum = formatExhibitNumber(index);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative group cursor-pointer"
    >
      {/* Spotlight glow above card */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.3)_0%,transparent_70%)]" />
      </div>
      {/* Spotlight beam */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-0.5 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,212,255,0.4), transparent)" }}
      />

      {/* Card */}
      <div className="glass-panel exhibit-glow rounded-none h-full flex flex-col transition-all duration-500 overflow-hidden relative">
        {/* Corner accents — display case frame */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00D4FF]/0 group-hover:border-[#00D4FF]/60 transition-all duration-500" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00D4FF]/0 group-hover:border-[#00D4FF]/60 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00D4FF]/0 group-hover:border-[#00D4FF]/60 transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00D4FF]/0 group-hover:border-[#00D4FF]/60 transition-all duration-500" />
        {/* Top accent bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Bottom gold plaque line */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/30 transition-all duration-700" />

        <div className="p-6 flex flex-col h-full">
          {/* Exhibit number + language */}
          <div className="flex items-center justify-between mb-5">
            <span className="exhibit-label">Exhibit {exhibitNum}</span>
            {repo.language && (
              <span
                className={`font-mono-museum text-[10px] px-2 py-0.5 rounded-none border ${langClass}`}
              >
                {repo.language}
              </span>
            )}
          </div>

          {/* Project name */}
          <h3 className="font-display text-xl font-semibold text-white mb-3 leading-tight group-hover:text-[#00D4FF] transition-colors duration-300">
            {repo.name}
          </h3>

          {/* Description */}
          <p className="text-[#6B7A8D] text-sm leading-relaxed mb-5 flex-1 line-clamp-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {repo.description || "No description provided for this exhibit."}
          </p>

          {/* Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {repo.topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="font-mono-museum text-[9px] px-2 py-0.5 border border-[#00D4FF]/15 text-[#6B7A8D] tracking-wider"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Stats row */}
          <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,212,255,0.1)] mt-auto">
            <div className="flex items-center gap-4">
              {/* Stars */}
              <div className="flex items-center gap-1.5 text-[#6B7A8D]">
                <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                </svg>
                <span className="font-mono-museum text-[10px]">{repo.stargazers_count}</span>
              </div>
              {/* Forks */}
              <div className="flex items-center gap-1.5 text-[#6B7A8D]">
                <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                  <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className="font-mono-museum text-[10px]">{repo.forks_count}</span>
              </div>
            </div>

            {/* View exhibit link */}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 font-mono-museum text-[10px] text-[#00D4FF] hover:text-white tracking-wider uppercase transition-colors duration-200 group/link"
            >
              View
              <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current group-hover/link:translate-x-0.5 transition-transform duration-200">
                <path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
