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
            x="-8%"
            y="-8%"
            width="116%"
            height="116%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div className={cn("ggear-phone", className)}>
        {striped ? <div className="ggear-stripe-layer" /> : null}
        {children}
      </div>
    </div>
  );
}
