import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Chip, ChipRow, Screen, Stat, T } from '../../components/ui';
import { DISCIPLINES, examName, SYSTEMS } from '../../data/meta';
import { QUESTIONS } from '../../data/questions';
import type { DisciplineId, Question, SystemId } from '../../data/types';
import { overall } from '../../lib/stats';
import { useStore } from '../../lib/store';

type Source = 'unused' | 'all' | 'incorrect' | 'flagged';

const shuffle = <T,>(a: T[]) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

export default function Qbank() {
  const { state } = useStore();
  const params = useLocalSearchParams<{ quick?: string }>();
  const [mode, setMode] = useState<'tutor' | 'timed'>('tutor');
  const [source, setSource] = useState<Source>('unused');
  const [systems, setSystems] = useState<SystemId[]>([]);
  const [discs, setDiscs] = useState<DisciplineId[]>([]);
  const [diff, setDiff] = useState<number | null>(null);
  const [count, setCount] = useState(10);
  const [myExam, setMyExam] = useState(true);

  const pool = useMemo(() => {
    return QUESTIONS.filter((q: Question) => {
      if (myExam && state.exam && !q.exams.includes(state.exam)) return false;
      if (systems.length && !systems.includes(q.system)) return false;
      if (discs.length && !discs.includes(q.discipline)) return false;
      if (diff && q.difficulty !== diff) return false;
      const a = state.answers[q.id];
      if (source === 'unused') return !a;
      if (source === 'incorrect') return a && !a.correct;
      if (source === 'flagged') return state.flagged.includes(q.id);
      return true;
    });
  }, [state, myExam, systems, discs, diff, source]);

  const start = (ids: string[], m: 'tutor' | 'timed') => router.push(`/quiz?ids=${ids.join(',')}&mode=${m}`);

  const quickDone = useRef(false);
  useEffect(() => {
    if (params.quick && !quickDone.current) {
      quickDone.current = true;
      const unused = QUESTIONS.filter((q) => !state.answers[q.id] && (!state.exam || q.exams.includes(state.exam)));
      const src = unused.length ? unused : QUESTIONS;
      start(shuffle(src).slice(0, 10).map((q) => q.id), 'tutor');
      router.setParams({ quick: undefined });
    }
  }, [params.quick, state]);

  const o = overall(state);
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <Screen>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Stat label="Questions" value={`${QUESTIONS.length}`} />
        <Stat label="Used" value={`${o.answered}`} />
        <Stat label="Correct" value={o.answered ? `${Math.round(o.accuracy * 100)}%` : 'None'} />
      </View>

      <Card>
        <T v="label">Mode</T>
        <ChipRow>
          <Chip label="Tutor" active={mode === 'tutor'} onPress={() => setMode('tutor')} />
          <Chip label="Timed exam" active={mode === 'timed'} onPress={() => setMode('timed')} />
        </ChipRow>
        <T v="small">{mode === 'tutor' ? 'See the explanation right after each answer.' : '90 seconds per question. Explanations at the end.'}</T>
      </Card>

      <Card>
        <T v="label">Questions</T>
        <ChipRow>
          {(['unused', 'all', 'incorrect', 'flagged'] as Source[]).map((s) => (
            <Chip key={s} label={s[0].toUpperCase() + s.slice(1)} active={source === s} onPress={() => setSource(s)} />
          ))}
        </ChipRow>
        {state.exam && (
          <ChipRow>
            <Chip label={`${examName(state.exam)} only`} active={myExam} onPress={() => setMyExam(true)} />
            <Chip label="All exams" active={!myExam} onPress={() => setMyExam(false)} />
          </ChipRow>
        )}
      </Card>

      <Card>
        <T v="label">Systems {systems.length ? `(${systems.length})` : '(all)'}</T>
        <ChipRow>
          {SYSTEMS.map((s) => (
            <Chip key={s.id} label={s.name} color={s.color} active={systems.includes(s.id)} onPress={() => setSystems(toggle(systems, s.id))} />
          ))}
        </ChipRow>
      </Card>

      <Card>
        <T v="label">Disciplines {discs.length ? `(${discs.length})` : '(all)'}</T>
        <ChipRow>
          {DISCIPLINES.map((d) => (
            <Chip key={d.id} label={d.name} active={discs.includes(d.id)} onPress={() => setDiscs(toggle(discs, d.id))} />
          ))}
        </ChipRow>
        <T v="label" style={{ marginTop: 6 }}>
          Difficulty
        </T>
        <ChipRow>
          <Chip label="Any" active={diff === null} onPress={() => setDiff(null)} />
          <Chip label="Easy" active={diff === 1} onPress={() => setDiff(1)} />
          <Chip label="Medium" active={diff === 2} onPress={() => setDiff(2)} />
          <Chip label="Hard" active={diff === 3} onPress={() => setDiff(3)} />
        </ChipRow>
      </Card>

      <Card>
        <T v="label">Block size</T>
        <ChipRow>
          {[5, 10, 20, 40].map((n) => (
            <Chip key={n} label={`${n}`} active={count === n} onPress={() => setCount(n)} />
          ))}
        </ChipRow>
      </Card>

      <T v="sub" style={{ textAlign: 'center' }}>
        {pool.length} questions match your filters
      </T>
      <Button
        label={pool.length ? `Start ${Math.min(count, pool.length)} questions` : 'No questions match'}
        icon="play"
        disabled={!pool.length}
        onPress={() => start(shuffle(pool).slice(0, count).map((q) => q.id), mode)}
      />
    </Screen>
  );
}
