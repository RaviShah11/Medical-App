import Svg, { Circle, Defs, Ellipse, G, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const SMEAR_SIZE = { w: 400, h: 300 };

export type SmearVariant = 'sickle' | 'megaloblastic';

export function BloodSmear({ variant, width }: { variant: SmearVariant; width: number }) {
  const { w, h } = SMEAR_SIZE;
  const rand = rng(variant === 'sickle' ? 5 : 9);
  const cells: { x: number; y: number; r: number; rot: number }[] = [];
  let tries = 0;
  while (cells.length < 34 && tries < 2000) {
    tries++;
    const r = variant === 'megaloblastic' ? 20 + rand() * 6 : 15 + rand() * 3;
    const x = r + rand() * (w - 2 * r);
    const y = r + rand() * (h - 2 * r);
    if (x > 150 && x < 250 && y > 100 && y < 200) continue;
    if (Math.hypot(x - 90, y - 70) < r + 28 || Math.hypot(x - 310, y - 230) < r + 26) continue;
    if (cells.some((c) => Math.hypot(c.x - x, c.y - y) < c.r + r + 2)) continue;
    cells.push({ x, y, r, rot: rand() * 180 });
  }
  return (
    <Svg width={width} height={(width * h) / w} viewBox={`0 0 ${w} ${h}`}>
      <Defs>
        <RadialGradient id="rbc" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#f7d2d2" />
          <Stop offset="0.45" stopColor="#efb0b0" />
          <Stop offset="1" stopColor="#d9777e" />
        </RadialGradient>
        <RadialGradient id="target" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#d9777e" />
          <Stop offset="0.25" stopColor="#d9777e" />
          <Stop offset="0.35" stopColor="#f7d2d2" />
          <Stop offset="0.7" stopColor="#f2c4c4" />
          <Stop offset="1" stopColor="#d9777e" />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={w} height={h} fill="#fbeef0" />
      {cells.map((c, i) => {
        if (variant === 'sickle' && i % 4 === 0) {
          return (
            <G key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.rot})`}>
              <Path d="M-22,0 C-12,-14 12,-14 22,0 C12,-6 -12,-6 -22,0 Z" fill="#d9777e" />
            </G>
          );
        }
        if (variant === 'sickle' && i % 7 === 1) {
          return <Circle key={i} cx={c.x} cy={c.y} r={c.r} fill="url(#target)" />;
        }
        if (variant === 'megaloblastic') {
          return <Ellipse key={i} cx={c.x} cy={c.y} rx={c.r} ry={c.r * 0.8} fill="url(#rbc)" transform={`rotate(${c.rot} ${c.x} ${c.y})`} />;
        }
        return <Circle key={i} cx={c.x} cy={c.y} r={c.r} fill="url(#rbc)" />;
      })}
      {variant === 'sickle' && (
        <G>
          <G transform="translate(90 70) rotate(-20)">
            <Path d="M-24,0 C-13,-15 13,-15 24,0 C13,-6 -13,-6 -24,0 Z" fill="#c9606a" />
          </G>
          <Circle cx={310} cy={230} r={17} fill="url(#target)" />
          <Circle cx={200} cy={150} r={17} fill="url(#rbc)" />
          <Circle cx={205} cy={146} r={3.5} fill="#4b2a6b" />
        </G>
      )}
      {variant === 'megaloblastic' && (
        <G>
          <Ellipse cx={90} cy={70} rx={27} ry={21} fill="url(#rbc)" />
          <Circle cx={200} cy={150} r={34} fill="#e7d7ec" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2;
            return <Ellipse key={i} cx={200 + Math.cos(a) * 16} cy={150 + Math.sin(a) * 16} rx={8} ry={6} fill="#5b2d82" transform={`rotate(${(a * 180) / Math.PI} ${200 + Math.cos(a) * 16} ${150 + Math.sin(a) * 16})`} />;
          })}
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 6) * Math.PI * 2 + 0.5;
            return <Path key={i} d={`M${200 + Math.cos(a) * 16},${150 + Math.sin(a) * 16} L${200 + Math.cos(a + 1.05) * 16},${150 + Math.sin(a + 1.05) * 16}`} stroke="#5b2d82" strokeWidth={2} />;
          })}
        </G>
      )}
    </Svg>
  );
}

export const DERM_SIZE = { w: 400, h: 300 };
export type DermVariant = 'melanoma' | 'bcc';

export function SkinLesion({ variant, width }: { variant: DermVariant; width: number }) {
  const { w, h } = DERM_SIZE;
  const rand = rng(21);
  const pores = Array.from({ length: 120 }, () => ({ x: rand() * w, y: rand() * h, r: 0.6 + rand() * 1.2 }));
  return (
    <Svg width={width} height={(width * h) / w} viewBox={`0 0 ${w} ${h}`}>
      <Defs>
        <RadialGradient id="skin" cx="50%" cy="45%" r="70%">
          <Stop offset="0" stopColor="#f3cfb3" />
          <Stop offset="1" stopColor="#dca98a" />
        </RadialGradient>
        <RadialGradient id="pearl" cx="45%" cy="40%" r="55%">
          <Stop offset="0" stopColor="#fbe7e3" />
          <Stop offset="0.7" stopColor="#efc0b8" />
          <Stop offset="1" stopColor="#d99a8f" />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={w} height={h} fill="url(#skin)" />
      {pores.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#c48f72" opacity={0.35} />
      ))}
      {variant === 'melanoma' && (
        <G>
          <Path
            d="M150,112 L165,92 L188,96 L205,78 L228,90 L252,86 L270,104 L268,122 L290,140 L286,160 L302,182 L284,200 L262,198 L246,218 L220,210 L196,222 L176,206 L150,210 L138,190 L122,176 L132,156 L126,134 Z"
            fill="#7a4a2a"
          />
          <Path d="M160,120 L182,104 L210,98 L236,108 L246,132 L238,160 L214,178 L186,176 L166,160 L156,140 Z" fill="#3a2214" />
          <Path d="M176,128 L196,118 L214,124 L220,144 L206,160 L186,158 L174,146 Z" fill="#1c100a" />
          <Path d="M248,146 L268,152 L276,174 L262,188 L246,182 L240,164 Z" fill="#2c3552" opacity={0.85} />
          <Path d="M136,168 L152,160 L164,176 L156,194 L140,190 Z" fill="#a4503c" opacity={0.85} />
          <Path d="M204,186 L222,182 L230,198 L214,206 L200,200 Z" fill="#d9c3b4" opacity={0.8} />
          {Array.from({ length: 28 }, (_, i) => {
            const a = (i / 28) * Math.PI * 2;
            const r = 40 + (i % 5) * 9;
            return <Circle key={i} cx={210 + Math.cos(a) * r} cy={150 + Math.sin(a) * r * 0.75} r={1.6 + (i % 3)} fill="#3a2214" opacity={0.7} />;
          })}
        </G>
      )}
      {variant === 'bcc' && (
        <G>
          <Ellipse cx={200} cy={150} rx={62} ry={50} fill="url(#pearl)" />
          <Ellipse cx={200} cy={150} rx={62} ry={50} fill="none" stroke="#f8e3dc" strokeWidth={8} opacity={0.8} />
          <Ellipse cx={203} cy={153} rx={20} ry={15} fill="#c56f62" opacity={0.8} />
          <Path d="M160,130 C175,125 180,140 195,132 M215,120 C225,130 235,122 240,135 M170,170 C180,160 190,175 200,168 M220,172 C230,165 238,178 246,168" stroke="#c0392b" strokeWidth={1.4} fill="none" />
        </G>
      )}
    </Svg>
  );
}

export const US_SIZE = { w: 400, h: 320 };

export function Ultrasound({ width }: { width: number }) {
  const { w, h } = US_SIZE;
  const rand = rng(33);
  const speckle = Array.from({ length: 900 }, () => ({ x: rand() * w, y: rand() * h, o: rand() * 0.5 }));
  return (
    <Svg width={width} height={(width * h) / w} viewBox={`0 0 ${w} ${h}`}>
      <Defs>
        <RadialGradient id="fan" cx="50%" cy="0%" r="100%">
          <Stop offset="0" stopColor="#5b5b5b" />
          <Stop offset="1" stopColor="#262626" />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={w} height={h} fill="#000" />
      <Path d="M170,10 L230,10 L380,300 C260,330 140,330 20,300 Z" fill="url(#fan)" />
      <G>
        {speckle.map((s, i) =>
          s.y > 10 ? <Circle key={i} cx={s.x} cy={s.y} r={1.1} fill="#cfcfcf" opacity={s.o * 0.5} /> : null,
        )}
      </G>
      <Ellipse cx={150} cy={140} rx={70} ry={45} fill="#6d6d6d" />
      <Path d="M95,140 C120,132 180,132 205,140" stroke="#e6e6e6" strokeWidth={3} fill="none" />
      <Circle cx={285} cy={150} r={24} fill="#8a8a8a" />
      <Circle cx={285} cy={150} r={13} fill="#161616" />
      <Circle cx={285} cy={150} r={24} fill="none" stroke="#dcdcdc" strokeWidth={4} />
      <Path d="M80,230 C140,205 260,205 330,240 C300,265 110,265 80,230 Z" fill="#050505" />
      <Path d="M170,10 L230,10 L380,300 C260,330 140,330 20,300 Z" fill="none" stroke="#333" />
    </Svg>
  );
}
