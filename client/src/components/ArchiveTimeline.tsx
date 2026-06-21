/*
 * THE PISTOLINKR CODE MUSEUM
 * ArchiveTimeline — Development journey timeline (Room 03)
 * Design: Neo-Noir Futurism | Vertical timeline with year markers
 * Background: Timeline nebula image
 */

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { GitHubRepo } from "@/hooks/useGitHub";

const TIMELINE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663440167945/VFjb8XH7rXXAbLFgKfi3HN/museum-timeline-bg-WTACpWUCSizAWLw9LU9pGU.webp";

interface ArchiveTimelineProps {
  repos: GitHubRepo[];
}

interface TimelineGroup {
  year: number;
  repos: GitHubRepo[];
}

export default function ArchiveTimeline({ repos }: ArchiveTimelineProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  // Group repos by year
  const groups: TimelineGroup[] = [];
  const yearMap: Record<number, GitHubRepo[]> = {};

  repos.forEach((repo) => {
    const year = new Date(repo.created_at).getFullYear();
    if (!yearMap[year]) yearMap[year] = [];
    yearMap[year].push(repo);
  });

  Object.keys(yearMap)
    .map(Number)
    .sort((a, b) => b - a)
    .forEach((year) => {
      groups.push({ year, repos: yearMap[year] });
    });

  return (
    <section id="timeline" className="relative py-32 bg-[#0D1117] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: `url(${TIMELINE_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-transparent to-[#0D1117] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="exhibit-label text-[11px]">Room 03</span>
            <div className="h-px flex-1 max-w-[60px] bg-[#C9A84C]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-white mb-4"
          >
            Development Archive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#6B7A8D] text-base max-w-xl leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            A chronological record of creation — tracing the evolution of projects
            from inception to the present day.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF]/40 via-[#00D4FF]/20 to-transparent hidden md:block" />

          <div className="space-y-16">
            {groups.map((group, gi) => (
              <motion.div
                key={group.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: gi * 0.05 }}
                className="md:grid md:grid-cols-[8rem_1fr] gap-8"
              >
                {/* Year marker */}
                <div className="flex md:flex-col items-center md:items-end gap-4 mb-6 md:mb-0">
                  <div className="font-display text-4xl font-light text-[#00D4FF]/40 leading-none">
                    {group.year}
                  </div>
                  {/* Dot on timeline */}
                  <div className="hidden md:block w-3 h-3 rounded-full border-2 border-[#00D4FF] bg-[#0D1117] relative -mr-[6.5px] mt-2 flex-shrink-0">
                    <div className="absolute inset-0.5 rounded-full bg-[#00D4FF]/40" />
                  </div>
                </div>

                {/* Repos for this year */}
                <div className="space-y-3">
                  {group.repos.map((repo, ri) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: ri * 0.06 }}
                      className="flex items-start gap-4 p-4 glass-panel border border-[rgba(0,212,255,0.08)] hover:border-[rgba(0,212,255,0.25)] transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/40 group-hover:bg-[#00D4FF] transition-colors duration-300 mt-1.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-display text-base font-semibold text-white group-hover:text-[#00D4FF] transition-colors duration-300 truncate">
                            {repo.name}
                          </span>
                          {repo.language && (
                            <span className="font-mono-museum text-[9px] text-[#6B7A8D] flex-shrink-0">
                              {repo.language}
                            </span>
                          )}
                        </div>
                        {repo.description && (
                          <p className="text-[#6B7A8D] text-xs leading-relaxed line-clamp-2"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {repo.description}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-1 text-[#6B7A8D]">
                        <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                        </svg>
                        <span className="font-mono-museum text-[10px]">{repo.stargazers_count}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
