import { Link } from "wouter";
import { useGitHub } from "@/hooks/useGitHub";
import PhoneShell from "@/components/ggear/PhoneShell";
import BrandTitle from "@/components/ggear/BrandTitle";
import ServiceCard from "@/components/ggear/ServiceCard";
import SketchBorder from "@/components/ggear/SketchBorder";
import {
  currentLine,
  getCategory,
  reposForCategory,
  type CategoryId,
} from "@/lib/ggear";

export default function Category({ id }: { id: string }) {
  const category = getCategory(id);
  const { repos, profile, loading } = useGitHub();

  if (!category) {
    return (
      <PhoneShell>
        <div className="flex h-full flex-col items-center justify-center gap-4 px-8">
          <p className="font-brand text-2xl">pistolinkr</p>
          <Link href="/" className="text-sm underline">
            ← Go back
          </Link>
        </div>
      </PhoneShell>
    );
  }

  const list = reposForCategory(category.id as CategoryId, repos);

  return (
    <PhoneShell>
      <div className="flex h-full min-h-[100dvh] flex-col px-[22px] pb-[22px] pt-[max(48px,env(safe-area-inset-top))] md:min-h-0 md:h-full">
        <div className="mb-3 flex items-center justify-between">
          <BrandTitle className="text-[22px]" />
          <Link href="/">
            <span className="relative inline-flex items-center rounded-full bg-[#FAF6F1] px-[12px] py-[7px] text-[13px] font-medium text-[#1A1A1A]">
              ← Go back
              <SketchBorder className="rounded-full" radius={999} />
            </span>
          </Link>
        </div>

        <div className="h-[148px] shrink-0">
          <ServiceCard
            category={category}
            current={currentLine(list)}
            className="h-full"
          />
        </div>

        {category.id === "introduce" && profile && (
          <div className="relative mt-3 rounded-[24px] bg-[#FAF6F1] px-4 py-3">
            <SketchBorder radius={24} />
            <div className="relative z-0 flex items-center gap-3">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt=""
                  className="size-12 rounded-[14px] object-cover"
                />
              ) : null}
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#1A1A1A]">
                  {profile.name || "pistolinkr"}
                </p>
                <p className="truncate text-[12px] text-[#6B6B6B]">
                  @{profile.login}
                  {profile.bio ? ` · ${profile.bio}` : ""}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto pb-2">
          {loading && (
            <p className="px-1 py-6 text-center text-sm text-[#6B6B6B]">
              Loading exhibits…
            </p>
          )}
          {!loading && list.length === 0 && (
            <p className="px-1 py-6 text-center text-sm text-[#6B6B6B]">
              No repositories in this room yet.
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {list.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block rounded-[22px] bg-[#FAF6F1] px-4 py-3"
                >
                  <SketchBorder radius={22} />
                  <div className="relative z-0 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[#1A1A1A]">
                        {repo.name}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-[#6B6B6B]">
                        {repo.description || "GitHub repository"}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {repo.language || "Git"}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PhoneShell>
  );
}
