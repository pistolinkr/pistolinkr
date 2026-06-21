/*
 * THE PISTOLINKR CODE MUSEUM
 * CursorSpotlight — Subtle radial glow that follows the cursor
 * Design: Neo-Noir Futurism | Museum spotlight effect
 */

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotRef.current) return;
      spotRef.current.style.left = `${e.clientX}px`;
      spotRef.current.style.top = `${e.clientY}px`;
      spotRef.current.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      if (spotRef.current) {
        spotRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="fixed pointer-events-none z-[9999] opacity-0 transition-opacity duration-300"
      style={{
        width: "400px",
        height: "400px",
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 60%)",
        borderRadius: "50%",
      }}
    />
  );
}
