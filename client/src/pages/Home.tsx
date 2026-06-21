/*
 * THE PISTOLINKR CODE MUSEUM
 * Home — Main page assembling all museum rooms
 * Design: Neo-Noir Futurism / Digital Noir Museum
 * 
 * Sections:
 *   00 — Lobby (HeroSection)
 *   01 — Exhibition Hall (ExhibitionHall)
 *   02 — Featured Exhibits (FeaturedExhibits)
 *   03 — Development Archive (ArchiveTimeline)
 *   04 — About the Creator (AboutCreator)
 *   05 — Live Demos / Interactive Installations (LiveDemos)
 *   06 — Exit / Contact (ContactExit)
 */

import { useGitHub } from "@/hooks/useGitHub";
import MuseumNav from "@/components/MuseumNav";
import HeroSection from "@/components/HeroSection";
import ExhibitionHall from "@/components/ExhibitionHall";
import FeaturedExhibits from "@/components/FeaturedExhibits";
import ArchiveTimeline from "@/components/ArchiveTimeline";
import AboutCreator from "@/components/AboutCreator";
import ContactExit from "@/components/ContactExit";
import CursorSpotlight from "@/components/CursorSpotlight";
import MuseumStats from "@/components/MuseumStats";
import LiveDemos from "@/components/LiveDemos";

export default function Home() {
  const { profile, repos, loading } = useGitHub();

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <CursorSpotlight />
      <MuseumNav />
      <HeroSection profile={profile} repoCount={repos.length} />
      <MuseumStats repos={repos} />
      <ExhibitionHall repos={repos} loading={loading} />
      <FeaturedExhibits repos={repos} />
      <ArchiveTimeline repos={repos} />
      <AboutCreator profile={profile} repos={repos} />
      <LiveDemos repos={repos} />
      <ContactExit profile={profile} />
    </div>
  );
}
