/*
 * THE PISTOLINKR CODE MUSEUM
 * useGitHub hook — fetches live GitHub profile and repository data
 * GitHub username: Pistolinkr
 */

import { useState, useEffect } from "react";

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  company: string;
  blog: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  open_issues_count: number;
  visibility: string;
}

const GITHUB_USERNAME = "Pistolinkr";

export function useGitHub() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        setProfile(profileData);
        // Filter out forks and config repos, sort by stars then updated
        const filtered = (reposData as GitHubRepo[])
          .filter((r) => !r.fork && r.name !== "qklp1235")
          .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          });
        setRepos(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profile, repos, loading, error };
}

export function getLanguageClass(language: string | null): string {
  if (!language) return "lang-default";
  const map: Record<string, string> = {
    JavaScript: "lang-javascript",
    TypeScript: "lang-typescript",
    Python: "lang-python",
    HTML: "lang-html",
    CSS: "lang-css",
    Swift: "lang-swift",
  };
  return map[language] || "lang-default";
}

export function formatExhibitNumber(index: number): string {
  return String(index + 1).padStart(3, "0");
}

export function getYearFromDate(dateStr: string): number {
  return new Date(dateStr).getFullYear();
}
