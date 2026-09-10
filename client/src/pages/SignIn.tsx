import { Link } from "wouter";
import PhoneShell from "@/components/ggear/PhoneShell";
import BrandTitle from "@/components/ggear/BrandTitle";
import AuthButtons from "@/components/ggear/AuthButtons";
import SketchBorder from "@/components/ggear/SketchBorder";

export default function SignIn() {
  return (
    <PhoneShell striped>
      <div className="relative flex h-full min-h-[100dvh] flex-col md:min-h-0 md:h-full">
        <BrandTitle
          weight="light"
          className="relative z-10 mb-2 pt-[max(56px,env(safe-area-inset-top))] text-center md:pt-14"
        />

        <div className="relative z-10 mt-[28px] px-[28px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[4px] h-[48px] bg-[#C5C5CD]"
          />
          <h1 className="relative font-sans text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111111]">
            Sign-in for
            <br />
            your service
          </h1>
        </div>

        <div className="relative z-10 mt-auto">
          <Link
            href="/"
            className="absolute -top-[18px] left-[18px] z-20"
          >
            <span className="relative inline-flex items-center rounded-full bg-[#F1E8DF] px-[14px] py-[8px] text-[14px] font-medium text-[#1A1A1A]">
              ← Go back
              <SketchBorder className="rounded-full" radius={999} />
            </span>
          </Link>

          <div className="rounded-t-[48px] bg-[#D85040] px-[22px] pb-[max(28px,env(safe-area-inset-bottom))] pt-[56px]">
            <AuthButtons />
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
