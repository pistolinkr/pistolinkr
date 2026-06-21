/*
 * THE PISTOLINKR CODE MUSEUM
 * AboutCreator — Developer profile section (Room 04)
 * Design: Neo-Noir Futurism | Hexagonal grid background, profile card
 */

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { GitHubProfile, GitHubRepo } from "@/hooks/useGitHub";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663440167945/VFjb8XH7rXXAbLFgKfi3HN/museum-about-bg-7qN2uKzgNA4sek7graC48g.webp";

interface AboutCreatorProps {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
}

export default function AboutCreator({ profile, repos }: AboutCreatorProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  // Derive tech stack from repos
  const langCounts: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
  });
  const techStack = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([lang]) => lang);

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

  return (
    <section id="about" className="relative py-32 bg-[#0F1923] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: `url(${ABOUT_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923] via-[#0F1923]/80 to-[#0F1923] pointer-events-none" />
      {/* Radial accent glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(0,212,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="exhibit-label text-[11px]">Room 04</span>
            <div className="h-px flex-1 max-w-[60px] bg-[#C9A84C]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-white mb-4"
          >
            About the Creator
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-panel border border-[rgba(0,212,255,0.15)] p-8">
              {/* Avatar + name */}
              <div className="flex items-start gap-6 mb-8">
                <div className="relative flex-shrink-0">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name || "Pistolinkr"}
                      className="w-20 h-20 rounded-none border-2 border-[#00D4FF]/30"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center">
                      <span className="font-display text-2xl text-[#00D4FF]">P</span>
                    </div>
                  )}
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0F1923] border border-[#00D4FF]/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-pulse" />
                  </div>
                </div>
                <div>
                  <div className="exhibit-label text-[10px] mb-1">Curator & Creator</div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-1">
                    {profile?.name || "Pistolinkr"}
                  </h3>
                  <div className="font-mono-museum text-xs text-[#6B7A8D]">
                    @{profile?.login || "pistolinkr"}
                  </div>
                  {profile?.company && (
                    <div className="font-mono-museum text-xs text-[#C9A84C] mt-1">
                      {profile.company}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              {profile?.bio && (
                <p className="text-[#8A9AB0] text-sm leading-relaxed mb-8 border-l-2 border-[#00D4FF]/30 pl-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {profile.bio}
                </p>
              )}

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {profile?.location && (
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#6B7A8D] fill-current flex-shrink-0">
                      <path d="M8 0a5.53 5.53 0 00-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.562 0 6.105 0 8a5 5 0 005 5h.5v1.5a.5.5 0 001 0V13H8v1.5a.5.5 0 001 0V13h.5a5 5 0 005-5c0-1.895-1.266-3.438-2.942-4.275-.143-.863-.698-1.723-1.464-2.383A5.53 5.53 0 008 0zm0 1c1.09 0 2.1.363 2.912 1.003.81.64 1.32 1.518 1.32 2.497v.5l.5.125C13.816 5.57 15 6.68 15 8a4 4 0 01-4 4H5a4 4 0 01-4-4c0-1.32 1.184-2.43 2.268-2.875L3.768 5v-.5c0-.979.51-1.857 1.32-2.497A4.53 4.53 0 018 1z"/>
                    </svg>
                    <span className="text-[#8A9AB0] text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {profile.location}
                    </span>
                  </div>
                )}
                {profile?.blog && (
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#6B7A8D] fill-current flex-shrink-0">
                      <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/>
                    </svg>
                    <a
                      href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00D4FF] text-xs hover:underline truncate"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {profile.blog}
                    </a>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(0,212,255,0.1)]">
                {[
                  { label: "Repositories", value: profile?.public_repos ?? "—" },
                  { label: "Total Stars", value: totalStars },
                  { label: "Followers", value: profile?.followers ?? "—" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="exhibit-label text-[9px] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tech stack + description */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Description */}
            <div className="glass-panel border border-[rgba(0,212,255,0.1)] p-8">
              <div className="exhibit-label text-[10px] mb-4">Curatorial Statement</div>
              <p className="font-display text-xl font-light text-[#C8D5E0] leading-relaxed italic">
                "An evolving developer documenting their journey through code. Pistolinkr showcases consistent experimentation, learning-driven projects, and a curiosity that spans across tools and technologies."
              </p>
            </div>

            {/* Tech stack */}
            <div className="glass-panel border border-[rgba(0,212,255,0.1)] p-8">
              <div className="exhibit-label text-[10px] mb-6">Technical Disciplines</div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="px-4 py-2 border border-[rgba(0,212,255,0.2)] text-[#E8EDF2] font-mono-museum text-xs tracking-wider hover:border-[#00D4FF]/50 hover:text-[#00D4FF] transition-all duration-300"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/Pistolinkr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 py-4 border border-[#00D4FF]/30 text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all duration-300 font-mono-museum text-xs tracking-wider uppercase"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Follow on GitHub
              </a>
              {profile?.blog && (
                <a
                  href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 py-4 border border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-300 font-mono-museum text-xs tracking-wider uppercase"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
                    <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/>
                  </svg>
                  Visit Website
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
