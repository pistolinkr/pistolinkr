import { Link } from "wouter";
import { cn } from "@/lib/utils";
import SketchBorder from "./SketchBorder";
import type { CategoryDef } from "@/lib/ggear";

interface ServiceCardProps {
  category: CategoryDef;
  current: string;
  className?: string;
  to?: string;
}

export default function ServiceCard({
  category,
  current,
  className,
  to,
}: ServiceCardProps) {
  const inner = (
    <>
      <SketchBorder radius={28} />
      <div className="relative z-0 flex items-center gap-4">
        <div
          className="size-[56px] shrink-0 rounded-[16px]"
          style={{ backgroundColor: category.chip }}
        />
        <h2 className="text-[22px] font-semibold leading-[1.12] text-white">
          {category.titleLines[0]}
          <br />
          {category.titleLines[1]}
        </h2>
      </div>
      <div className="relative z-0 mt-auto">
        <div className="mb-3 h-px w-full bg-white/90" />
        <p className="text-[12px] font-medium leading-none text-white/95">
          Current: {current}
        </p>
      </div>
    </>
  );

  const shared = cn(
    "relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden rounded-[28px] px-[18px] py-[16px]",
    className
  );

  if (to) {
    return (
      <Link
        href={to}
        className={shared}
        style={{ backgroundColor: category.color }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={shared} style={{ backgroundColor: category.color }}>
      {inner}
    </div>
  );
}
