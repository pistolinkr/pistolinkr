import { describe, expect, it } from "vitest";
import { currentLine, formatDotDate, langShort } from "./ggear";

describe("ggear date format", () => {
  it("formats dates as DD.MM.YY", () => {
    const iso = "2026-08-10T12:00:00.000Z";
    const d = new Date(iso);
    const expected = `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getFullYear()).slice(-2)}`;
    expect(formatDotDate(iso)).toBe(expected);
  });

  it("shortens languages and falls back to Eng", () => {
    expect(langShort("TypeScript")).toBe("TS");
    expect(langShort(null)).toBe("Eng");
  });

  it("uses the Figma current-line fallback when empty", () => {
    expect(currentLine([])).toBe("10.08.26 - Eng - Eng");
  });
});
