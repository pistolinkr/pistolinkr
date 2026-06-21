/*
 * THE PISTOLINKR CODE MUSEUM
 * LiveDemos — Interactive iframe canvas viewer, 1920×1080 scaled display
 * Design: Neo-Noir Futurism | "Interactive Installations" museum room
 *
 * URLs are sourced LIVE from the GitHub API `homepage` field on each repo.
 * No hardcoded URLs — any change to a repo's website on GitHub is reflected here automatically.
 */

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GitHubRepo } from "@/hooks/useGitHub";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DemoEntry {
  name: string;
  url: string;          // sourced from repo.homepage
  description: string;
  language: string;
  stars: number;
  exhibitNum: string;   // Roman numeral label
  repoUrl: string;      // GitHub repo page link
}

// Sites known to block iframe embedding (X-Frame-Options: DENY/SAMEORIGIN).
// Add a repo name here if you know it restricts embedding — the fallback
// "Embedding Restricted" card will be shown instead of a broken blank iframe.
const NO_EMBED_REPOS = new Set(["DI2025checker"]);

// Roman numeral converter (supports 1–50, sufficient for any repo count)
const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X",
                "XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX",
                "XXI","XXII","XXIII","XXIV","XXV","XXVI","XXVII","XXVIII","XXIX","XXX"];

function toRoman(n: number): string {
  return ROMAN[n - 1] ?? String(n);
}

// Language color map
const LANG_COLORS: Record<string, string> = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python:     "#3572A5",
  HTML:       "#E34C26",
  CSS:        "#563D7C",
  Swift:      "#FA7343",
  default:    "#8B949E",
};

function getLangColor(lang: string | null) {
  return LANG_COLORS[lang ?? ""] || LANG_COLORS.default;
}

// Normalise a homepage URL — ensure it has a protocol prefix
function normaliseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

// ─── Derive DemoEntry list from live GitHub repos ─────────────────────────────
function buildDemos(repos: GitHubRepo[]): DemoEntry[] {
  const withHomepage = repos.filter((r) => r.homepage && r.homepage.trim() !== "");
  return withHomepage.map((repo, idx) => ({
    name:        repo.name,
    url:         normaliseUrl(repo.homepage!),
    description: repo.description ?? "No description provided for this exhibit.",
    language:    repo.language ?? "Unknown",
    stars:       repo.stargazers_count,
    exhibitNum:  toRoman(idx + 1),
    repoUrl:     repo.html_url,
  }));
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function DemosSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row gap-6 animate-pulse">
      <div className="xl:w-64 flex-shrink-0 space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 bg-white/5 border border-white/5" />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <div className="w-full bg-white/5 border border-white/5" style={{ paddingTop: "56.25%" }} />
        <div className="mt-4 h-20 bg-white/5 border border-white/5" />
      </div>
    </div>
  );
}

// ─── IFrame Canvas ────────────────────────────────────────────────────────────
// Renders the site at native 1920×1080 then scales it down to fit the container
function IFrameCanvas({ url, name }: { url: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);
  const iframeRef           = useRef<HTMLIFrameElement>(null);

  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      {/* Loading state */}
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#080D12] z-10"
          >
            <div className="relative mb-6">
              <div className="w-12 h-12 border border-[#00D4FF]/20 rounded-full" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t border-[#00D4FF] rounded-full"
              />
            </div>
            <p className="exhibit-label text-[10px]">Loading exhibit · {name}</p>
            <p className="font-mono-museum text-[#6B7A8D] text-[9px] mt-1 max-w-xs text-center truncate">{url}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error / embedding-blocked state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080D12] z-10 gap-4">
          <div className="w-10 h-10 border border-[#C9A84C]/30 flex items-center justify-center">
            <span className="text-[#C9A84C]/60 font-mono-museum text-xs">⊘</span>
          </div>
          <div className="text-center">
            <p className="exhibit-label text-[10px] text-[#C9A84C]/70 mb-1">Embedding Restricted</p>
            <p className="font-mono-museum text-[#6B7A8D] text-[9px]">This site restricts iframe embedding</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-5 py-2 border border-[#00D4FF]/30 text-[#00D4FF] font-mono-museum text-[10px] tracking-widest uppercase hover:bg-[#00D4FF]/10 transition-colors duration-300"
          >
            Open in New Tab →
          </a>
        </div>
      )}

      {/* Scaled iframe */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          title={name}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className="origin-top-left"
          style={{
            width: "1920px",
            height: "1080px",
            transform: "scale(var(--iframe-scale, 1))",
            transformOrigin: "0 0",
            border: "none",
            display: "block",
          }}
          data-scale-target="true"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          allow="fullscreen"
        />
      </div>
      <style>{`[data-scale-target="true"] { --iframe-scale: 1; }`}</style>
    </div>
  );
}

// ─── Scale wrapper — handles both embeddable and restricted sites ─────────────
function ScaledIFrameWrapper({
  url, name, noEmbed,
}: {
  url: string; name: string; noEmbed?: boolean;
}) {
  // Pre-known restricted site: show a styled fallback immediately
  if (noEmbed) {
    return (
      <div
        className="relative w-full bg-[#080D12]"
        style={{ paddingTop: `${(1080 / 1920) * 100}%` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <div className="w-16 h-16 border border-[#C9A84C]/20 flex items-center justify-center relative">
            <div className="w-8 h-8 border border-[#C9A84C]/30 flex items-center justify-center">
              <span className="text-[#C9A84C]/50 text-lg">⊘</span>
            </div>
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
            <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
          </div>
          <div className="text-center px-8">
            <p className="exhibit-label text-[10px] text-[#C9A84C]/70 mb-2">Embedding Restricted</p>
            <p className="font-body text-[#6B7A8D] text-xs leading-relaxed max-w-sm">
              This exhibit does not permit iframe embedding due to security policy.
              Visit the live site directly to experience the full installation.
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-[#00D4FF]/30 text-[#00D4FF] font-mono-museum text-[10px] tracking-[0.2em] uppercase hover:bg-[#00D4FF]/10 transition-all duration-300 flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open {name} →
          </a>
          <p className="font-mono-museum text-[9px] text-[#6B7A8D]/50">{url}</p>
        </div>
      </div>
    );
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef    = useRef<HTMLIFrameElement>(null);
  const [scale, setScale]   = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);

  const updateScale = useCallback(() => {
    if (!containerRef.current) return;
    setScale(containerRef.current.offsetWidth / 1920);
  }, []);

  const containerCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      updateScale();
      const ro = new ResizeObserver(updateScale);
      ro.observe(node);
    },
    [updateScale]
  );

  return (
    <div
      ref={containerCallback}
      className="relative w-full bg-[#080D12] overflow-hidden"
      style={{ paddingTop: `${(1080 / 1920) * 100}%` }}
    >
      {/* Loading overlay */}
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#080D12] z-20"
          >
            <div className="relative mb-5">
              <div className="w-10 h-10 border border-[#00D4FF]/15 rounded-full" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t border-[#00D4FF]/70 rounded-full"
              />
            </div>
            <p className="exhibit-label text-[10px]">Initialising exhibit</p>
            <p className="font-mono-museum text-[#6B7A8D] text-[9px] mt-1">{url}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080D12] z-20 gap-3">
          <div className="w-8 h-8 border border-[#C9A84C]/30 flex items-center justify-center">
            <span className="text-[#C9A84C]/50 text-xs">⊘</span>
          </div>
          <p className="exhibit-label text-[10px] text-[#C9A84C]/70">Embedding Restricted</p>
          <p className="font-mono-museum text-[#6B7A8D] text-[9px] text-center px-8">
            This site does not permit iframe embedding (X-Frame-Options)
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 px-6 py-2.5 border border-[#00D4FF]/30 text-[#00D4FF] font-mono-museum text-[10px] tracking-[0.2em] uppercase hover:bg-[#00D4FF]/10 transition-colors duration-300"
          >
            Open Full Site →
          </a>
        </div>
      )}

      {/* Scaled iframe */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          title={name}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "1920px",
            height: "1080px",
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            border: "none",
            display: "block",
            pointerEvents: loaded ? "auto" : "none",
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          allow="fullscreen; autoplay"
        />
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function LiveDemos({ repos }: { repos: GitHubRepo[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode]       = useState<"canvas" | "grid">("canvas");

  // Derive demo list live from GitHub API data — updates automatically when repos change
  const demos = buildDemos(repos);

  // Clamp activeIndex in case the list shrinks between renders
  const safeIndex = Math.min(activeIndex, Math.max(0, demos.length - 1));
  const active    = demos[safeIndex];

  // Empty / loading state
  if (demos.length === 0) {
    return (
      <section id="live-demos" className="relative py-32 bg-[#080D12] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#00D4FF]/40" />
            <span className="exhibit-label text-[10px]">Room 05 · Interactive Installations</span>
          </div>
          <h2 className="font-display text-4xl text-white font-light mb-10">Live Exhibits</h2>
          {repos.length === 0 ? <DemosSkeleton /> : (
            <p className="font-body text-[#6B7A8D] text-sm">
              No repositories with a website URL were found. Add a homepage URL to any GitHub repository to display it here.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      id="live-demos"
      className="relative py-32 bg-[#080D12] overflow-hidden"
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* Room entrance indicator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pt-4 pointer-events-none">
        <div className="w-px h-12 bg-gradient-to-b from-[#00D4FF]/40 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/10" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#00D4FF]/40" />
            <span className="exhibit-label text-[10px]">Room 05 · Interactive Installations</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-white font-light leading-tight mb-3">
                Live Exhibits
              </h2>
              <p className="text-[#8B949E] font-body text-sm max-w-xl leading-relaxed">
                Interactive installations — each project rendered at native{" "}
                <span className="text-[#00D4FF]/80 font-mono-museum text-xs">1920 × 1080</span>{" "}
                resolution within a scaled canvas. Click to interact directly.
              </p>
              {/* Live source indicator */}
              <div className="flex items-center gap-2 mt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                <span className="font-mono-museum text-[9px] text-[#6B7A8D] tracking-widest">
                  URLs sourced live from GitHub API · {demos.length} installations
                </span>
              </div>
            </div>
            {/* View mode toggle */}
            <div className="flex items-center gap-1 border border-[rgba(0,212,255,0.15)] p-1">
              <button
                onClick={() => setViewMode("canvas")}
                className={`px-4 py-1.5 font-mono-museum text-[10px] tracking-widest uppercase transition-all duration-300 ${
                  viewMode === "canvas"
                    ? "bg-[#00D4FF] text-[#0D1117]"
                    : "text-[#6B7A8D] hover:text-[#00D4FF]"
                }`}
              >
                Canvas
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-1.5 font-mono-museum text-[10px] tracking-widest uppercase transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-[#00D4FF] text-[#0D1117]"
                    : "text-[#6B7A8D] hover:text-[#00D4FF]"
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── CANVAS MODE ── */}
        {viewMode === "canvas" && active && (
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Exhibit selector sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="xl:w-64 flex-shrink-0"
            >
              <div className="exhibit-label text-[9px] mb-3 pl-1">Select Installation</div>
              <div className="flex xl:flex-col gap-2 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0">
                {demos.map((demo, i) => (
                  <button
                    key={demo.name}
                    onClick={() => setActiveIndex(i)}
                    className={`group flex-shrink-0 xl:flex-shrink text-left px-4 py-3 border transition-all duration-300 ${
                      safeIndex === i
                        ? "border-[#00D4FF]/50 bg-[#00D4FF]/5"
                        : "border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,212,255,0.2)] bg-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono-museum text-[9px] transition-colors duration-300 ${
                          safeIndex === i ? "text-[#00D4FF]" : "text-[#6B7A8D]"
                        }`}
                      >
                        {demo.exhibitNum}
                      </span>
                      <div className="min-w-0">
                        <div
                          className={`font-display text-sm font-medium truncate transition-colors duration-300 ${
                            safeIndex === i ? "text-white" : "text-[#8B949E] group-hover:text-white"
                          }`}
                        >
                          {demo.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: getLangColor(demo.language) }}
                          />
                          <span className="font-mono-museum text-[9px] text-[#6B7A8D] truncate">
                            {demo.language}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Main canvas area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              {/* Exhibit label bar */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-3">
                  <span className="exhibit-label text-[9px]">
                    Installation {active.exhibitNum} · {active.name}
                  </span>
                  <span
                    className="font-mono-museum text-[9px] px-2 py-0.5 border"
                    style={{
                      color: getLangColor(active.language),
                      borderColor: getLangColor(active.language) + "40",
                      backgroundColor: getLangColor(active.language) + "10",
                    }}
                  >
                    {active.language}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono-museum text-[9px] text-[#6B7A8D]">
                    1920 × 1080
                  </span>
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-museum text-[9px] text-[#00D4FF]/60 hover:text-[#00D4FF] transition-colors duration-300 tracking-widest uppercase"
                  >
                    Open ↗
                  </a>
                </div>
              </div>

              {/* Canvas frame */}
              <div className="relative border border-[rgba(0,212,255,0.15)] overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00D4FF]/50 z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00D4FF]/50 z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00D4FF]/50 z-10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00D4FF]/50 z-10 pointer-events-none" />

                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.8) 2px, rgba(0,212,255,0.8) 3px)",
                    backgroundSize: "100% 4px",
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ScaledIFrameWrapper
                      url={active.url}
                      name={active.name}
                      noEmbed={NO_EMBED_REPOS.has(active.name)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Description plaque */}
              <div className="mt-4 px-5 py-4 border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.3)] flex items-start gap-4">
                <div className="w-px h-full min-h-[2rem] bg-[#C9A84C]/30 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#8B949E] font-body text-sm leading-relaxed">{active.description}</p>
                  <div className="mt-2 flex items-center gap-4 flex-wrap">
                    <span className="font-mono-museum text-[9px] text-[#6B7A8D]">
                      ★ {active.stars} stars
                    </span>
                    <a
                      href={active.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-museum text-[9px] text-[#00D4FF]/50 hover:text-[#00D4FF] transition-colors duration-300 truncate"
                    >
                      {active.url}
                    </a>
                    <a
                      href={active.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-museum text-[9px] text-[#6B7A8D]/60 hover:text-[#6B7A8D] transition-colors duration-300"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                  disabled={safeIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 border border-[rgba(255,255,255,0.08)] text-[#6B7A8D] font-mono-museum text-[10px] tracking-widest uppercase hover:border-[#00D4FF]/30 hover:text-[#00D4FF] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <div className="flex items-center gap-1.5">
                  {demos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`transition-all duration-300 ${
                        i === safeIndex
                          ? "w-4 h-1 bg-[#00D4FF]"
                          : "w-1 h-1 bg-[#6B7A8D]/40 hover:bg-[#6B7A8D]"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveIndex((i) => Math.min(demos.length - 1, i + 1))}
                  disabled={safeIndex === demos.length - 1}
                  className="flex items-center gap-2 px-4 py-2 border border-[rgba(255,255,255,0.08)] text-[#6B7A8D] font-mono-museum text-[10px] tracking-widest uppercase hover:border-[#00D4FF]/30 hover:text-[#00D4FF] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── GRID MODE ── */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {demos.map((demo, i) => (
              <motion.div
                key={demo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,212,255,0.25)] transition-all duration-500 overflow-hidden"
              >
                {/* Mini canvas preview */}
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => { setViewMode("canvas"); setActiveIndex(i); }}
                >
                  <ScaledIFrameWrapper
                    url={demo.url}
                    name={demo.name}
                    noEmbed={NO_EMBED_REPOS.has(demo.name)}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#0D1117]/0 group-hover:bg-[#0D1117]/30 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono-museum text-[10px] text-white tracking-widest uppercase border border-white/30 px-4 py-2 bg-[#0D1117]/60">
                      View Full →
                    </span>
                  </div>
                </div>
                {/* Card footer */}
                <div className="px-4 py-3 bg-[rgba(0,0,0,0.4)] flex items-center justify-between">
                  <div>
                    <div className="font-display text-sm text-white">{demo.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: getLangColor(demo.language) }}
                      />
                      <span className="font-mono-museum text-[9px] text-[#6B7A8D]">{demo.language}</span>
                    </div>
                  </div>
                  <a
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-museum text-[9px] text-[#00D4FF]/50 hover:text-[#00D4FF] transition-colors duration-300 tracking-widest uppercase"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open ↗
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom museum divider */}
        <div className="museum-divider mt-20" />
      </div>
    </section>
  );
}
