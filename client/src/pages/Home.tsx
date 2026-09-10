import { useGitHub } from "@/hooks/useGitHub";
import { Link } from "wouter";
import PhoneShell from "@/components/ggear/PhoneShell";
import BrandTitle from "@/components/ggear/BrandTitle";
import ServiceCard from "@/components/ggear/ServiceCard";
import SketchBorder from "@/components/ggear/SketchBorder";
import { CATEGORIES, currentLine, reposForCategory } from "@/lib/ggear";

export default function Home() {
  const { repos } = useGitHub();

  return (
    <PhoneShell>
      <div className="flex h-full min-h-[100dvh] flex-col px-[22px] pb-[22px] pt-[max(56px,env(safe-area-inset-top))] md:min-h-0 md:h-full">
        <BrandTitle className="mb-[14px] text-center" />

        <div className="relative flex min-h-0 flex-1 flex-col">
          <Link
            href="/signin"
            className="absolute -top-[6px] right-0 z-20"
          >
            <span className="relative inline-flex items-center rounded-full bg-[#D85040] px-[14px] py-[7px] text-[13px] font-medium leading-none text-white">
              Sign in now →
              <SketchBorder className="rounded-full" radius={999} />
            </span>
          </Link>

          <div className="relative mt-[22px] flex min-h-0 flex-1 flex-col rounded-[42px] bg-[#FAF6F1] px-[12px] pb-[12px] pt-[28px]">
            <SketchBorder radius={42} />
            <div className="relative z-0 flex min-h-0 flex-1 flex-col gap-[10px]">
              {CATEGORIES.map((category) => (
                <ServiceCard
                  key={category.id}
                  category={category}
                  current={currentLine(reposForCategory(category.id, repos))}
                  to={`/c/${category.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
