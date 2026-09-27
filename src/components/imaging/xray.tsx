import Svg, { Defs, Ellipse, G, Path, RadialGradient, Rect, Stop, LinearGradient } from 'react-native-svg';

export type CxrVariant = 'normal' | 'pneumothorax' | 'pneumonia' | 'chf' | 'effusion';

export const CXR_SIZE = { w: 400, h: 440 };

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Viewer's left is the patient's right (standard PA orientation)
const RIGHT_LUNG = 'M190,95 C150,90 110,110 92,160 C75,210 70,290 78,345 C110,335 150,330 185,335 C190,260 192,170 190,95 Z';
const LEFT_LUNG = 'M210,95 C250,90 290,110 308,160 C325,210 330,290 322,352 C290,345 255,338 215,332 C210,260 208,170 210,95 Z';
const COLLAPSED_RIGHT = 'M188,120 C165,118 140,140 132,180 C124,220 128,270 140,305 C160,305 175,300 186,300 C190,240 191,180 188,120 Z';

export function ChestXray({ variant, width }: { variant: CxrVariant; width: number }) {
  const { w, h } = CXR_SIZE;
  const rand = rng(11);
  const heartScale = variant === 'chf' ? 1.28 : 1;

  // Branching vessels fanning out from each hilum
  const markings: { d: string; sw: number }[] = [];
  const addMarkings = (hx: number, dir: number, skip: (x: number) => boolean) => {
    for (let i = 0; i < 26; i++) {
      const sx = hx + dir * rand() * 8;
      const sy = 195 + rand() * 40;
      const ang = ((-50 + rand() * 120) * Math.PI) / 180;
      const len = 25 + rand() * 75;
      const x2 = sx + dir * Math.cos(ang) * len;
      const y2 = sy + Math.sin(ang) * len * 0.9;
      if (skip(x2)) continue;
      const bend = (rand() - 0.5) * 16;
      markings.push({ d: `M${sx.toFixed(0)},${sy.toFixed(0)} Q${((sx + x2) / 2 + bend).toFixed(0)},${((sy + y2) / 2 + bend).toFixed(0)} ${x2.toFixed(0)},${y2.toFixed(0)}`, sw: 0.7 + rand() * 1.1 });
    }
  };
  addMarkings(180, -1, (x) => variant === 'pneumothorax' && x < 138);
  addMarkings(220, 1, () => false);

  const ribs = [];
  for (let i = 0; i < 9; i++) {
    const y = 105 + i * 28;
    ribs.push(`M195,${y} C150,${y - 18} 95,${y + 5} 80,${y + 40}`);
    ribs.push(`M205,${y} C250,${y - 18} 305,${y + 5} 320,${y + 40}`);
  }

  return (
    <Svg width={width} height={(width * h) / w} viewBox={`0 0 ${w} ${h}`}>
      <Defs>
        <RadialGradient id="body" cx="50%" cy="50%" r="60%">
          <Stop offset="0" stopColor="#6d6d6d" />
          <Stop offset="1" stopColor="#2a2a2a" />
        </RadialGradient>
        <LinearGradient id="lung" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#0c0c0c" />
          <Stop offset="1" stopColor="#222" />
        </LinearGradient>
        <LinearGradient id="abdomen" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#a4a4a4" />
          <Stop offset="1" stopColor="#6a6a6a" />
        </LinearGradient>
        <RadialGradient id="opac" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#d8d8d8" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#bdbdbd" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient id="heart" cx="40%" cy="45%" r="70%">
          <Stop offset="0" stopColor="#d4d4d4" />
          <Stop offset="1" stopColor="#9a9a9a" />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={w} height={h} fill="#050505" />
      <Path d="M40,440 C40,300 45,120 110,70 C150,45 250,45 290,70 C355,120 360,300 360,440 Z" fill="url(#body)" />
      <Path d={RIGHT_LUNG} fill={variant === 'pneumothorax' ? '#030303' : 'url(#lung)'} />
      {variant === 'pneumothorax' && (
        <G>
          <Path d={COLLAPSED_RIGHT} fill="#1c1c1c" />
          <Path d="M188,120 C165,118 140,140 132,180 C124,220 128,270 140,305" stroke="#e8e8e8" strokeWidth={1.4} fill="none" />
        </G>
      )}
      <Path d={LEFT_LUNG} fill="url(#lung)" />
      <G opacity={0.4}>
        {markings.map((m, i) => (
          <Path key={i} d={m.d} stroke="#9a9a9a" strokeWidth={m.sw} fill="none" strokeLinecap="round" />
        ))}
      </G>
      <Rect x={189} y={40} width={22} height={380} fill="#7d7d7d" opacity={0.55} />
      <Path d="M195,40 L205,40 L205,190 L195,190 Z" fill="#111" opacity={0.7} />
      <G transform={`translate(228 300) scale(${heartScale}) translate(-228 -300)`}>
        <Path d="M186,214 C172,236 170,282 178,318 C205,340 262,340 290,318 C294,284 274,238 242,222 C224,212 200,209 186,214 Z" fill="url(#heart)" />
      </G>
      <Path d="M58,440 L78,345 C110,318 150,316 190,336 C198,339 203,339 210,333 C250,312 290,322 322,352 L342,440 Z" fill="url(#abdomen)" />
      <Ellipse cx={262} cy={352} rx={14} ry={9} fill="#1a1a1a" opacity={0.7} />
      <G opacity={0.28}>
        {ribs.map((d, i) => (
          <Path key={i} d={d} stroke="#e0e0e0" strokeWidth={7} fill="none" />
        ))}
      </G>
      <Path d="M100,85 C140,70 175,78 195,88" stroke="#c9c9c9" strokeWidth={9} fill="none" opacity={0.75} />
      <Path d="M300,85 C260,70 225,78 205,88" stroke="#c9c9c9" strokeWidth={9} fill="none" opacity={0.75} />

      {variant === 'pneumonia' && (
        <G>
          <Ellipse cx={132} cy={295} rx={48} ry={36} fill="url(#opac)" />
          <Ellipse cx={150} cy={310} rx={30} ry={22} fill="url(#opac)" />
          <Path d="M125,290 L145,300 M140,285 L150,305" stroke="#1a1a1a" strokeWidth={2} opacity={0.7} />
        </G>
      )}
      {variant === 'chf' && (
        <G>
          <Ellipse cx={148} cy={215} rx={48} ry={58} fill="url(#opac)" opacity={0.75} />
          <Ellipse cx={252} cy={215} rx={48} ry={58} fill="url(#opac)" opacity={0.75} />
          {[0, 1, 2, 3].map((i) => (
            <Path key={i} d={`M82,${290 + i * 10} L100,${290 + i * 10}`} stroke="#dcdcdc" strokeWidth={1.3} />
          ))}
          <Path d="M79,345 C92,332 104,328 118,337 L80,350 Z" fill="#b8b8b8" />
          <Path d="M321,352 C308,340 296,336 282,344 L324,360 Z" fill="#b8b8b8" />
        </G>
      )}
      {variant === 'effusion' && <Path d="M215,268 C250,262 300,270 322,290 L325,352 C290,345 255,338 215,332 Z" fill="#c4c4c4" />}
    </Svg>
  );
}

export type CtVariant = 'epidural' | 'subdural' | 'normal';
export const CT_SIZE = { w: 400, h: 400 };

export function CtHead({ variant, width }: { variant: CtVariant; width: number }) {
  const { w, h } = CT_SIZE;
  const shift = variant === 'normal' ? 0 : 14;
  return (
    <Svg width={width} height={(width * h) / w} viewBox={`0 0 ${w} ${h}`}>
      <Defs>
        <RadialGradient id="brain" cx="50%" cy="50%" r="55%">
          <Stop offset="0" stopColor="#8a8a8a" />
          <Stop offset="1" stopColor="#6e6e6e" />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={w} height={h} fill="#000" />
      <Ellipse cx={200} cy={205} rx={150} ry={175} fill="#f2f2f2" />
      <Ellipse cx={200} cy={205} rx={138} ry={163} fill="url(#brain)" />
      {variant === 'epidural' && <Path d="M320,150 C350,190 350,240 318,275 C300,240 298,190 320,150 Z" fill="#dedede" />}
      {variant === 'subdural' && (
        <Path d="M300,80 C360,140 362,270 300,335 C318,280 322,140 300,80 Z" fill="#d4d4d4" />
      )}
      <G transform={`translate(${-shift} 0)`}>
        <Path d={`M200,50 L200,360`} stroke="#555" strokeWidth={2} />
        <Path d="M185,150 C165,165 160,200 172,230 L192,225 C185,200 188,175 196,160 Z" fill="#1e1e1e" />
        <Path d="M215,150 C235,165 240,200 228,230 L208,225 C215,200 212,175 204,160 Z" fill="#1e1e1e" opacity={variant === 'normal' ? 1 : 0.55} />
        <Ellipse cx={200} cy={275} rx={6} ry={8} fill="#1e1e1e" />
      </G>
      <G opacity={0.22}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <G key={i}>
            <Path d={`M${92 + i * 6},${95 + i * 40} q28,-12 48,6`} stroke="#333" strokeWidth={2} fill="none" />
            <Path d={`M${308 - i * 6},${95 + i * 40} q-28,-12 -48,6`} stroke="#333" strokeWidth={2} fill="none" />
          </G>
        ))}
      </G>
      <Ellipse cx={200} cy={205} rx={150} ry={175} fill="none" stroke="#fff" strokeWidth={3} />
    </Svg>
  );
}
