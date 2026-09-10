import { cn } from "@/lib/utils";

interface SketchBorderProps {
  className?: string;
  radius?: number;
}

export default function SketchBorder({
  className,
  radius = 28,
}: SketchBorderProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      style={{
        borderRadius: radius,
        boxShadow: "0 0 0 1.5px #2A221C",
        filter: "url(#ggear-sketch)",
      }}
    />
  );
}
