/*
 * THE PISTOLINKR CODE MUSEUM
 * HeroSection — Museum Lobby / Entrance
 * Design: Neo-Noir Futurism | Cinematic hero with museum hall background
 * Typography: Cormorant Garamond display + DM Mono labels
 */

import { motion } from "framer-motion";
import { GitHubProfile } from "@/hooks/useGitHub";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663440167945/VFjb8XH7rXXAbLFgKfi3HN/museum-hero-bg-WoakLEWnv3mFGu3UG2XsBp.webp";

interface HeroSectionProps {
  profile: GitHubProfile | null;
  repoCount: number;
}

export default function HeroSection({ profile, repoCount }: HeroSectionProps) {
  const scrollToExhibition = () => {
    document.getElementById("exhibition")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="lobby"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/60 via-[#0D1117]/30 to-[#0D1117]" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0D1117_100%)]" />

      {/* Subtle scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.5) 2px, rgba(0,212,255,0.5) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-[#00D4FF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Museum admission label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
          <span className="exhibit-label text-[11px]">Digital Exhibition · Est. 2020</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none tracking-tight mb-4"
        >
          The{" "}
          <span className="italic font-medium" style={{ color: "#00D4FF" }}>
            Pistolinkr
          </span>
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none tracking-tight mb-10"
        >
          Code Museum
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="text-[#6B7A8D] text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          A curated digital exhibition of software artifacts, interactive experiments,
          etc. crafted by{" "}
          <span className="text-[#E8EDF2]">
            {profile?.name || "Pistolinkr"}
          </span>
          {profile?.location && (
            <> — <span className="text-[#C9A84C]">{profile.location}</span></>
          )}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-8 md:gap-16 mb-14"
        >
          {[
            { label: "Exhibits", value: repoCount || profile?.public_repos || "—" },
            { label: "Followers", value: profile?.followers ?? "—" },
            { label: "Following", value: profile?.following ?? "—" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-semibold text-white">
                {stat.value}
              </div>
              <div className="exhibit-label mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Museum entrance gate decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#00D4FF]/40" />
          <div className="w-2 h-2 border border-[#00D4FF]/60 rotate-45" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#00D4FF]/40" />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToExhibition}
            className="group relative px-8 py-3.5 bg-[#00D4FF] text-[#0D1117] font-mono-museum text-xs tracking-[0.2em] uppercase font-medium hover:bg-white transition-colors duration-300 overflow-hidden"
          >
            <span className="relative z-10">Enter Exhibition</span>
          </button>
          <a
            href="https://github.com/Pistolinkr"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-[#00D4FF]/40 text-[#00D4FF] font-mono-museum text-xs tracking-[0.2em] uppercase hover:bg-[#00D4FF]/10 transition-all duration-300"
          >
            View on GitHub
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="exhibit-label text-[9px]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#00D4FF]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
