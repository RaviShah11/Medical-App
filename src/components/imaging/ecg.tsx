import Svg, { G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

// Scale: 25 mm/s and 10 mm/mV, 4 px per mm
const PX_MM = 4;
const PX_S = 25 * PX_MM;
const PX_MV = 10 * PX_MM;

interface Morph {
  p: number;
  q: number;
  r: number;
  s: number;
  st: number;
  t: number;
  tWidth?: number;
  qrsWidth?: number;
}


const LEADS: Record<string, Morph> = {
  I: { p: 0.1, q: -0.05, r: 0.7, s: -0.1, st: 0, t: 0.25 },
  II: { p: 0.15, q: -0.08, r: 1.1, s: -0.2, st: 0, t: 0.3 },
  III: { p: 0.08, q: -0.05, r: 0.5, s: -0.2, st: 0, t: 0.12 },
  aVR: { p: -0.1, q: 0, r: -0.7, s: 0.05, st: 0, t: -0.22 },
  aVL: { p: 0.05, q: -0.05, r: 0.4, s: -0.15, st: 0, t: 0.1 },
  aVF: { p: 0.1, q: -0.06, r: 0.8, s: -0.2, st: 0, t: 0.2 },
  V1: { p: 0.08, q: 0, r: 0.2, s: -0.9, st: 0, t: -0.1 },
  V2: { p: 0.1, q: 0, r: 0.4, s: -1.1, st: 0.05, t: 0.35 },
  V3: { p: 0.1, q: 0, r: 0.7, s: -0.7, st: 0.03, t: 0.4 },
  V4: { p: 0.1, q: -0.05, r: 1.2, s: -0.4, st: 0, t: 0.4 },
  V5: { p: 0.1, q: -0.08, r: 1.2, s: -0.2, st: 0, t: 0.35 },
  V6: { p: 0.1, q: -0.08, r: 1.0, s: -0.1, st: 0, t: 0.3 },
};

const LAYOUT = [
  ['I', 'aVR', 'V1', 'V4'],
  ['II', 'aVL', 'V2', 'V5'],
  ['III', 'aVF', 'V3', 'V6'],
];

const gauss = (t: number, c: number, w: number) => Math.exp(-((t - c) ** 2) / (2 * w * w));
const plateau = (t: number, a: number, b: number, edge: number) =>
  1 / (1 + Math.exp(-(t - a) / edge)) - 1 / (1 + Math.exp(-(t - b) / edge));

function beat(t: number, m: Morph, withP: boolean) {
  const qw = m.qrsWidth ?? 1;
  let y = 0;
  if (withP) y += m.p * gauss(t, -0.16, 0.025);
  y += m.q * gauss(t, -0.025 * qw, 0.008 * qw);
  y += m.r * gauss(t, 0, 0.011 * qw);
  y += m.s * gauss(t, 0.028 * qw, 0.01 * qw);
  y += m.st * plateau(t, 0.05 * qw, 0.24, 0.012);
  y += m.t * gauss(t, 0.28 + 0.02 * (qw - 1), m.tWidth ?? 0.05);
  return y;
}

// Deterministic pseudo random numbers
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type Rhythm = 'normal' | 'afib' | 'chb' | 'hyperk';

interface Beats {
  qrs: number[];
  pOnly: number[];
  linkedP: boolean;
}

function beatTimes(rhythm: Rhythm, duration: number): Beats {
  const rand = rng(7);
  if (rhythm === 'afib') {
    const qrs: number[] = [];
    let t = 0.25;
    while (t < duration) {
      qrs.push(t);
      t += 0.45 + rand() * 0.5;
    }
    return { qrs, pOnly: [], linkedP: false };
  }
  if (rhythm === 'chb') {
    const qrs: number[] = [];
    for (let t = 0.6; t < duration; t += 1.6) qrs.push(t);
    const pOnly: number[] = [];
    for (let t = 0.3; t < duration + 0.2; t += 0.72) pOnly.push(t);
    return { qrs, pOnly, linkedP: false };
  }
  const rr = rhythm === 'hyperk' ? 0.85 : 0.8;
  const qrs: number[] = [];
  for (let t = 0.35; t < duration; t += rr) qrs.push(t);
  return { qrs, pOnly: [], linkedP: true };
}

function tracePath(m: Morph, beats: Beats, rhythm: Rhythm, start: number, duration: number, x0: number, yBase: number) {
  const rand = rng(Math.round(start * 100) + 3);
  let d = '';
  for (let i = 0; i <= duration * 200; i++) {
    const t = start + i / 200;
    let y = 0;
    for (const q of beats.qrs) {
      if (Math.abs(t - q) < 0.6) y += beat(t - q, m, beats.linkedP);
    }
    for (const p of beats.pOnly) y += Math.abs(m.p) * 1.1 * gauss(t, p, 0.025) * Math.sign(m.p || 1);
    if (rhythm === 'afib') y += 0.04 * Math.sin(t * 38 + rand() * 2) + 0.025 * (rand() - 0.5);
    const x = x0 + (i / 200) * PX_S;
    const py = yBase - y * PX_MV;
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${py.toFixed(1)}`;
  }
  return d;
}

function Grid({ w, h }: { w: number; h: number }) {
  const lines = [];
  for (let x = 0; x <= w; x += PX_MM) {
    const major = (x / PX_MM) % 5 === 0;
    lines.push(<Line key={`x${x}`} x1={x} y1={0} x2={x} y2={h} stroke={major ? '#F2A7A7' : '#FBDADA'} strokeWidth={major ? 1 : 0.5} />);
  }
  for (let y = 0; y <= h; y += PX_MM) {
    const major = (y / PX_MM) % 5 === 0;
    lines.push(<Line key={`y${y}`} x1={0} y1={y} x2={w} y2={y} stroke={major ? '#F2A7A7' : '#FBDADA'} strokeWidth={major ? 1 : 0.5} />);
  }
  return (
    <G>
      <Rect x={0} y={0} width={w} height={h} fill="#FFF5F5" />
      {lines}
    </G>
  );
}

export const RHYTHM_SIZE = { w: 600, h: 160 };
export const TWELVE_SIZE = { w: 1000, h: 360 };

export function RhythmStrip({ rhythm, width }: { rhythm: Rhythm; width: number }) {
  const { w, h } = RHYTHM_SIZE;
  const beats = beatTimes(rhythm, 6);
  let m: Morph = LEADS.II;
  if (rhythm === 'hyperk') m = { ...LEADS.II, p: 0.04, t: 0.9, tWidth: 0.028, qrsWidth: 1.6 };
  if (rhythm === 'chb') m = { ...LEADS.II, qrsWidth: 1.8, t: -0.3 };
  const d = tracePath(m, beats, rhythm, 0, 6, 0, 100);
  return (
    <Svg width={width} height={(width * h) / w} viewBox={`0 0 ${w} ${h}`}>
      <Grid w={w} h={h} />
      <Path d={d} stroke="#111" strokeWidth={1.6} fill="none" />
      <SvgText x={6} y={16} fontSize={13} fill="#333" fontWeight="bold">
        II
      </SvgText>
    </Svg>
  );
}

export type Stemi = 'anterior' | 'inferior' | 'none';

export function TwelveLead({ stemi, width }: { stemi: Stemi; width: number }) {
  const { w, h } = TWELVE_SIZE;
  const beats = beatTimes('normal', 10);
  const leads: Record<string, Morph> = {};
  for (const k of Object.keys(LEADS)) leads[k] = { ...LEADS[k] };
  if (stemi === 'anterior') {
    for (const k of ['V1', 'V2', 'V3', 'V4']) {
      leads[k].st = 0.45;
      leads[k].t = 0.65;
      leads[k].s = leads[k].s * 0.5;
    }
    for (const k of ['II', 'III', 'aVF']) leads[k].st = -0.18;
  }
  if (stemi === 'inferior') {
    for (const k of ['II', 'III', 'aVF']) {
      leads[k].st = 0.45;
      leads[k].t = 0.6;
    }
    for (const k of ['I', 'aVL']) leads[k].st = -0.2;
  }
  const paths: { d: string; label: string; x: number; y: number }[] = [];
  LAYOUT.forEach((row, r) =>
    row.forEach((lead, c) => {
      const start = c * 2.5;
      const x0 = c * 250;
      const yBase = r * 120 + 70;
      paths.push({ d: tracePath(leads[lead], beats, 'normal', start, 2.5, x0, yBase), label: lead, x: x0 + 6, y: r * 120 + 18 });
    }),
  );
  return (
    <Svg width={width} height={(width * h) / w} viewBox={`0 0 ${w} ${h}`}>
      <Grid w={w} h={h} />
      {paths.map((p) => (
        <G key={p.label}>
          <Path d={p.d} stroke="#111" strokeWidth={1.4} fill="none" />
          <SvgText x={p.x} y={p.y} fontSize={14} fill="#333" fontWeight="bold">
            {p.label}
          </SvgText>
        </G>
      ))}
      {[1, 2, 3].map((c) => (
        <Line key={c} x1={c * 250} y1={0} x2={c * 250} y2={h} stroke="#555" strokeWidth={1} />
      ))}
    </Svg>
  );
}

// Percent position of the center of a lead cell, handy for hotspots
export function leadCenter(lead: string) {
  for (let r = 0; r < 3; r++) {
    const c = LAYOUT[r].indexOf(lead);
    if (c >= 0) return { x: ((c * 250 + 125) / 1000) * 100, y: ((r * 120 + 60) / 360) * 100 };
  }
  return { x: 50, y: 50 };
}
