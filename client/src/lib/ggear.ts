import type { GitHubRepo } from "@/hooks/useGitHub";

export const PHONE_WIDTH = 390;
export const PHONE_HEIGHT = 844;

export const GGEAR = {
  cream: "#F1E8DF",
  panel: "#FAF6F1",
  ink: "#1A1A1A",
  coral: "#D85040",
  orange: "#F08C34",
  green: "#58A65B",
  blue: "#5384ED",
  stripe: "#D8D8DA",
  highlight: "#C5C5CD",
  chipRed: "#E8A396",
  chipOrange: "#E8C08A",
  chipGreen: "#A8C9A8",
} as const;

export type CategoryId = "planning" | "engineering" | "introduce";

export interface CategoryDef {
  id: CategoryId;
  titleLines: [string, string];
  color: string;
  chip: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: "planning",
    titleLines: ["Planning", "& Show"],
    color: GGEAR.coral,
    chip: GGEAR.chipRed,
  },
  {
    id: "engineering",
    titleLines: ["Engineering", "& Producing"],
    color: GGEAR.orange,
    chip: GGEAR.chipOrange,
  },
  {
    id: "introduce",
    titleLines: ["Introduce", "& Feature"],
    color: GGEAR.green,
    chip: GGEAR.chipGreen,
  },
];

export function getCategory(id: string | undefined): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function formatDotDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "10.08.26";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy}`;
}

export function langShort(language: string | null): string {
  if (!language) return "Eng";
  const map: Record<string, string> = {
    JavaScript: "JS",
    TypeScript: "TS",
    Python: "Py",
    HTML: "HTML",
    CSS: "CSS",
    Swift: "Sw",
  };
  return map[language] ?? language.slice(0, 3);
}

export function currentLine(
  repos: GitHubRepo[],
  fallback = "10.08.26 - Eng - Eng"
): string {
  if (!repos.length) return fallback;
  const latest = [...repos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  )[0];
  return `${formatDotDate(latest.pushed_at)} - ${langShort(latest.language)} - Eng`;
}

export function reposForCategory(
  id: CategoryId,
  repos: GitHubRepo[]
): GitHubRepo[] {
  if (!repos.length) return [];

  if (id === "planning") {
    const withSite = repos.filter((r) => r.homepage && r.homepage.trim() !== "");
    return (withSite.length ? withSite : repos.slice(0, 8)).slice(0, 12);
  }

  if (id === "engineering") {
    const code = repos.filter((r) =>
      ["TypeScript", "JavaScript", "Python", "Swift", "HTML", "CSS"].includes(
        r.language ?? ""
      )
    );
    return (code.length ? code : repos).slice(0, 16);
  }

  return repos.filter((r) => r.description).slice(0, 10);
}
