import { cn } from "@/lib/utils";

interface BrandTitleProps {
  className?: string;
  weight?: "display" | "light";
}

export default function BrandTitle({
  className,
  weight = "display",
}: BrandTitleProps) {
  return (
    <p
      className={cn(
        "font-brand text-[#1A1A1A] tracking-tight",
        weight === "display"
          ? "text-[32px] font-bold leading-none"
          : "text-[28px] font-semibold leading-none text-[#2A2A2A]",
        className
      )}
    >
      pistolinkr
    </p>
  );
}
