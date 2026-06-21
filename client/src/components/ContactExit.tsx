/*
 * THE PISTOLINKR CODE MUSEUM
 * ContactExit — Museum exit / contact section (Room 05)
 * Design: Neo-Noir Futurism | Minimal exit hall with GitHub CTA
 */

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { GitHubProfile } from "@/hooks/useGitHub";

interface ContactExitProps {
  profile: GitHubProfile | null;
}

export default function ContactExit({ profile }: ContactExitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 bg-[#0D1117] overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
          <span className="exhibit-label text-[11px]">Room 05 · Exit</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl font-light text-white mb-6 leading-tight"
        >
          Thank you for visiting
          <br />
          <span className="italic text-[#00D4FF]">the museum</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#6B7A8D] text-base md:text-lg leading-relaxed mb-14 max-w-2xl mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          New exhibits are added regularly. Follow on GitHub to stay updated
          with the latest artifacts from the collection.
        </motion.p>

        {/* GitHub follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <a
            href="https://github.com/Pistolinkr"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-10 py-4 bg-[#00D4FF] text-[#0D1117] font-mono-museum text-xs tracking-[0.2em] uppercase font-medium hover:bg-white transition-colors duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Follow @{profile?.login || "Pistolinkr"}
          </a>

          {profile?.blog && (
            <a
              href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 border border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-300 font-mono-museum text-xs tracking-[0.2em] uppercase"
            >
              Visit Website
            </a>
          )}
        </motion.div>

        {/* Divider */}
        <div className="museum-divider mb-12" />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#3D4A57]"
        >
          <div className="font-mono-museum text-[10px] tracking-wider">
            © 2024–{new Date().getFullYear()} Pistolinkr · produced by g.gear services delta team
          </div>
          <div className="font-mono-museum text-[10px] tracking-wider">
            Data sourced from the GitHub API
          </div>
          <div className="flex items-center gap-1 font-mono-museum text-[10px] tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/40 animate-pulse" />
            Exhibition Open
          </div>
        </motion.div>
      </div>
    </section>
  );
}
