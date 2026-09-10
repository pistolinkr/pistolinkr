import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PhoneShellProps {
  children: ReactNode;
  className?: string;
  striped?: boolean;
}

export default function PhoneShell({
  children,
  className,
  striped = false,
}: PhoneShellProps) {
  return (
    <div className="ggear-stage">
      <svg
        aria-hidden
        width="0"
        height="0"
        className="absolute overflow-hidden"
      >
        <defs>
          <filter
            id="ggear-sketch"
            x="-4%"
            y="-4%"
            width="108%"
            height="108%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div className={cn("ggear-phone", striped && "ggear-stripes", className)}>
        {children}
      </div>
    </div>
  );
}
