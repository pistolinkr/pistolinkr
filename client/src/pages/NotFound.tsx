import { Link } from "wouter";
import PhoneShell from "@/components/ggear/PhoneShell";
import BrandTitle from "@/components/ggear/BrandTitle";
import SketchBorder from "@/components/ggear/SketchBorder";

export default function NotFound() {
  return (
    <PhoneShell>
      <div className="flex h-full min-h-[100dvh] flex-col items-center justify-center px-8 text-center md:min-h-0">
        <BrandTitle className="mb-6" />
        <p className="mb-8 text-[18px] font-semibold text-[#1A1A1A]">
          This page is not in the archive.
        </p>
        <Link href="/">
          <span className="relative inline-flex items-center rounded-full bg-[#D85040] px-5 py-2.5 text-sm font-medium text-white">
            ← Go back
            <SketchBorder className="rounded-full" radius={999} />
          </span>
        </Link>
      </div>
    </PhoneShell>
  );
}
