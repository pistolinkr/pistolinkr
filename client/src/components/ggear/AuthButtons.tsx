import { getLoginUrl } from "@/const";
import SketchBorder from "./SketchBorder";

function continueUrl(): string {
  try {
    const url = getLoginUrl();
    if (url && !url.includes("undefined")) return url;
  } catch {
    /* env not configured */
  }
  return "https://github.com/Pistolinkr";
}

function AppleMark() {
  return (
    <img
      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M16.365 12.87c-.022-2.39 1.952-3.532 2.04-3.585-1.112-1.625-2.841-1.85-3.454-1.874-1.47-.149-2.87.866-3.614.866-.746 0-1.899-.844-3.126-.821-1.61.024-3.094.936-3.922 2.377-1.672 2.9-.428 7.188 1.201 9.54.797 1.151 1.747 2.444 2.994 2.398 1.2-.048 1.654-.776 3.106-.776 1.45 0 1.86.776 3.126.751 1.292-.024 2.11-1.172 2.9-2.329.914-1.337 1.29-2.631 1.312-2.699-.029-.013-2.518-.966-2.543-3.848zM14.87 6.51c.662-.802 1.108-1.917.986-3.03-1.004.04-2.218.668-2.938 1.51-.646.747-1.213 1.941-1.06 3.09 1.12.087 2.27-.57 3.012-1.57z'/></svg>"
      alt=""
      width={18}
      height={18}
      className="size-[18px] object-contain"
    />
  );
}

function GoogleMark() {
  return (
    <span className="flex size-[18px] items-center justify-center text-[15px] font-bold leading-none text-white">
      G
    </span>
  );
}

export default function AuthButtons() {
  const href = continueUrl();

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#5384ED]">
      <SketchBorder radius={28} />
      <a
        href={href}
        className="relative z-0 flex h-[52px] items-center justify-center gap-3 text-[15px] font-semibold text-white"
      >
        <AppleMark />
        Continue with Apple
      </a>
      <div className="relative z-0 mx-5 h-px bg-white/35" />
      <a
        href={href}
        className="relative z-0 flex h-[52px] items-center justify-center gap-3 text-[15px] font-semibold text-white"
      >
        <GoogleMark />
        Continue with Google
      </a>
    </div>
  );
}
