/*
 * THE PISTOLINKR CODE MUSEUM
 * MuseumStats — Aggregate statistics bar between sections
 * Design: Neo-Noir Futurism | Horizontal stats strip with animated counters
 */

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GitHubRepo } from "@/hooks/useGitHub";

interface MuseumStatsProps {
  repos: GitHubRepo[];
}

function AnimatedNumber({ target, duration = 1.5, inView }: { target: number; duration?: number; inView: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <>{current}</>;
}

export default function MuseumStats({ repos }: MuseumStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);
  const languages = new Set(repos.map((r) => r.language).filter(Boolean)).size;
  const totalIssues = repos.reduce((acc, r) => acc + r.open_issues_count, 0);

  const stats = [
    { label: "Total Exhibits", value: repos.length, icon: "⬡" },
    { label: "GitHub Stars", value: totalStars, icon: "★" },
    { label: "Forks", value: totalForks, icon: "⑂" },
    { label: "Languages", value: languages, icon: "◈" },
    { label: "Open Issues", value: totalIssues, icon: "◎" },
  ];

  if (repos.length === 0) return null;

  return (
    <div ref={ref} className="relative bg-[#0F1923] border-y border-[rgba(0,212,255,0.1)] py-12 overflow-hidden">
      {/* Subtle glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/25 to-transparent" />
      {/* Center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Museum collection label */}
        <div className="text-center mb-8">
          <span className="exhibit-label text-[10px]">Collection Statistics · Live GitHub Data</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="font-mono-museum text-[#00D4FF]/30 text-lg mb-1 group-hover:text-[#00D4FF]/60 transition-colors duration-300">
                {stat.icon}
              </div>
              <div className="font-display text-3xl md:text-4xl font-semibold text-white mb-1.5">
                <AnimatedNumber target={stat.value} inView={isInView} duration={1.2 + i * 0.1} />
              </div>
              <div className="exhibit-label text-[9px]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
