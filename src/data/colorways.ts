// Route -> colorway -> tokens. Values from the design guide (Guide 01 — colorways).
// Sections only read the CSS variables these become.

export interface Tokens {
  bg: string; fg: string; soft: string; line: string; dim: string;
  mark: string; accent: string; onAccent: string;
}

export const colorways = {
  paper:      { bg: '#F2F2F2', fg: '#0A0A0A', soft: '#3D3D3D', line: '#CFCFCF', dim: '#CFCFCF', mark: '#0A0A0A', accent: '#0A0A0A', onAccent: '#F2F2F2' },
  'ink-lime': { bg: '#1A1A1A', fg: '#E6E6E6', soft: '#B5B5B5', line: '#3A3A3A', dim: '#3A3A3A', mark: '#E1F451', accent: '#E1F451', onAccent: '#1A1A1A' },
  lilac:      { bg: '#E1A1E4', fg: '#0A0A0A', soft: '#2B2B2B', line: 'rgba(10,10,10,0.25)', dim: 'rgba(10,10,10,0.22)', mark: '#0A0A0A', accent: '#0A0A0A', onAccent: '#E1A1E4' },
  lime:       { bg: '#E1F451', fg: '#0A0A0A', soft: '#2B2B2B', line: 'rgba(10,10,10,0.25)', dim: 'rgba(10,10,10,0.18)', mark: '#0A0A0A', accent: '#0A0A0A', onAccent: '#E1F451' },
} satisfies Record<string, Tokens>;

export type ColorwayKey = keyof typeof colorways;

// route (no slashes; '' = "/") -> colorway
export const routes: Record<string, ColorwayKey> = {
  '': 'paper',
  paper: 'paper',
  ink: 'ink-lime',
  lilac: 'lilac',
  lime: 'lime',
};

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());

/** `--bg:#..;--fg:#..;...` for <html style>. */
export const cssVars = (key: ColorwayKey) =>
  Object.entries(colorways[key]).map(([k, v]) => `--${kebab(k)}:${v}`).join(';');
