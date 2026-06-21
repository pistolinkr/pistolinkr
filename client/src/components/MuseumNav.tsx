/*
 * THE PISTOLINKR CODE MUSEUM
 * MuseumNav — top navigation bar styled as museum room guide
 * Design: Neo-Noir Futurism | Glass panel, DM Mono labels, cyan accents
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rooms = [
  { id: "lobby", label: "Lobby", number: "00" },
  { id: "exhibition", label: "Exhibition Hall", number: "01" },
  { id: "featured", label: "Featured Exhibits", number: "02" },
  { id: "timeline", label: "Archive", number: "03" },
  { id: "about", label: "About", number: "04" },
  { id: "live-demos", label: "Live Demos", number: "05" },
  { id: "contact", label: "Exit", number: "06" },
];

export default function MuseumNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeRoom, setActiveRoom] = useState("lobby");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = rooms.map((r) => document.getElementById(r.id));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveRoom(rooms[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-panel border-b border-[rgba(0,212,255,0.12)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("lobby")}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 border border-[#00D4FF]/40 flex items-center justify-center relative">
              <div className="w-3 h-3 bg-[#00D4FF]/60 group-hover:bg-[#00D4FF] transition-colors duration-300" />
              <div className="absolute inset-0 bg-[#00D4FF]/5 group-hover:bg-[#00D4FF]/10 transition-colors duration-300" />
            </div>
            <div>
              <div className="font-mono-museum text-[10px] text-[#C9A84C] tracking-[0.2em] uppercase leading-none">
                The
              </div>
              <div className="font-display text-base font-semibold text-white leading-none tracking-wide">
                Code Museum
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => scrollTo(room.id)}
                className={`relative px-4 py-2 group transition-all duration-300 ${
                  activeRoom === room.id ? "text-white" : "text-[#6B7A8D] hover:text-white"
                }`}
              >
                <span className="font-mono-museum text-[9px] text-[#C9A84C]/60 group-hover:text-[#C9A84C] absolute top-1 left-4 tracking-widest transition-colors duration-300">
                  {room.number}
                </span>
                <span className="font-mono-museum text-[11px] tracking-wider uppercase mt-3 block">
                  {room.label}
                </span>
                {activeRoom === room.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[1px] bg-[#00D4FF]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/Pistolinkr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 border border-[#00D4FF]/30 text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all duration-300 font-mono-museum text-[11px] tracking-wider uppercase"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block w-5 h-px bg-[#00D4FF] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-px bg-[#00D4FF] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-[#00D4FF] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 glass-panel border-b border-[rgba(0,212,255,0.12)] md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => scrollTo(room.id)}
                  className={`flex items-center gap-4 py-3 text-left transition-colors duration-200 ${
                    activeRoom === room.id ? "text-white" : "text-[#6B7A8D]"
                  }`}
                >
                  <span className="font-mono-museum text-[10px] text-[#C9A84C] w-6">{room.number}</span>
                  <span className="font-mono-museum text-xs tracking-wider uppercase">{room.label}</span>
                </button>
              ))}
              <a
                href="https://github.com/Pistolinkr"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 py-2 text-[#00D4FF] font-mono-museum text-xs tracking-wider uppercase"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
