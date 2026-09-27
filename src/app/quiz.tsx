import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ImageViewer } from '../components/ImageViewer';
import { Button, Card, Screen, T } from '../components/ui';
import { articleById } from '../data/articles';
import { disciplineName, systemById } from '../data/meta';
import { questionById } from '../data/questions';
import type { Question } from '../data/types';
import { useStore } from '../lib/store';
import { useTheme } from '../lib/theme';

const LETTERS = 'ABCDEFGH';

export default function Quiz() {
  const params = useLocalSearchParams<{ ids: string; mode: 'tutor' | 'timed' }>();
  const questions = useMemo(() => (params.ids ?? '').split(',').map(questionById).filter(Boolean) as Question[], [params.ids]);
  const timed = params.mode === 'timed';
  const { state, recordAnswer, toggleFlag } = useStore();
  const { c } = useTheme();

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [struck, setStruck] = useState<Record<string, number[]>>({});
  const [finished, setFinished] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [left, setLeft] = useState(questions.length * 90);
  const scroll = useRef<ScrollView>(null);

  const finish = () => {
    if (timed) {
      questions.forEach((q) => {
        if (picked[q.id] !== undefined) recordAnswer(q.id, picked[q.id], picked[q.id] === q.answer);
      });
      const all: Record<string, boolean> = {};
      questions.forEach((q) => (all[q.id] = true));
      setRevealed(all);
    }
    setFinished(true);
  };

  useEffect(() => {
    if (!timed || finished) return;
    if (left <= 0) {
      finish();
      return;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left, timed, finished]);

  useEffect(() => {
    scroll.current?.scrollTo({ y: 0, animated: false });
  }, [idx]);

  if (!questions.length) {
    return (
      <Screen>
        <T>No questions found.</T>
      </Screen>
    );
  }

  if (finished && !reviewing) {
    const correct = questions.filter((q) => picked[q.id] === q.answer).length;
    return (
      <Screen>
        <Stack.Screen options={{ title: 'Results', headerBackVisible: false, headerLeft: () => null }} />
        <Card style={{ alignItems: 'center', gap: 4 }}>
          <T v="label">Score</T>
          <Text style={{ fontSize: 48, fontWeight: '800', color: correct / questions.length >= 0.7 ? c.success : c.warn }}>{Math.round((correct / questions.length) * 100)}%</Text>
          <T v="sub">
            {correct} of {questions.length} correct
          </T>
        </Card>
        {questions.map((q, i) => {
          const ok = picked[q.id] === q.answer;
          return (
            <Pressable
              key={q.id}
              onPress={() => {
                setIdx(i);
                setReviewing(true);
              }}
              style={{ flexDirection: 'row', gap: 10, backgroundColor: c.card, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: c.border, alignItems: 'center' }}
            >
              <Ionicons name={picked[q.id] === undefined ? 'remove-circle' : ok ? 'checkmark-circle' : 'close-circle'} size={24} color={picked[q.id] === undefined ? c.sub : ok ? c.success : c.danger} />
              <View style={{ flex: 1 }}>
                <T v="sub" color={c.text} numberOfLines={2}>
                  {q.stem}
                </T>
                <T v="small">{systemById(q.system).name}</T>
              </View>
            </Pressable>
          );
        })}
        <Button label="Done" onPress={() => router.back()} />
      </Screen>
    );
  }

  const q = questions[idx];
  const choice = picked[q.id];
  const shown = revealed[q.id];
  const flagged = state.flagged.includes(q.id);
  const article = q.articleId ? articleById(q.articleId) : null;
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, '0');

  const submit = () => {
    if (choice === undefined) return;
    if (timed) {
      if (idx < questions.length - 1) setIdx(idx + 1);
      else finish();
      return;
    }
    setRevealed({ ...revealed, [q.id]: true });
    recordAnswer(q.id, choice, choice === q.answer);
  };

  const next = () => {
    if (idx < questions.length - 1) setIdx(idx + 1);
    else if (reviewing) setReviewing(false);
    else finish();
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Stack.Screen
        options={{
          title: reviewing ? 'Review' : `${idx + 1} of ${questions.length}`,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 18, alignItems: 'center', paddingRight: 8 }}>
              {timed && !finished && (
                <Text style={{ color: left < 60 ? c.danger : c.text, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
                  {mm}:{ss}
                </Text>
              )}
              <Pressable onPress={() => router.push('/labs')} hitSlop={8} accessibilityLabel="Lab values">
                <Ionicons name="flask-outline" size={22} color={c.primary} />
              </Pressable>
              <Pressable onPress={() => toggleFlag(q.id)} hitSlop={8} accessibilityLabel="Flag question">
                <Ionicons name={flagged ? 'flag' : 'flag-outline'} size={22} color={flagged ? c.warn : c.primary} />
              </Pressable>
            </View>
          ),
        }}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, flexShrink: 0, borderBottomWidth: 1, borderBottomColor: c.border, backgroundColor: c.card }} contentContainerStyle={{ padding: 8, gap: 6 }}>
        {questions.map((qq, i) => {
          const r = revealed[qq.id];
          const bg = i === idx ? c.primary : r ? (picked[qq.id] === qq.answer ? c.successSoft : c.dangerSoft) : picked[qq.id] !== undefined ? c.primarySoft : c.chip;
          return (
            <Pressable key={qq.id} onPress={() => setIdx(i)} style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: i === idx ? c.onPrimary : c.text, fontWeight: '700', fontSize: 13 }}>{i + 1}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView ref={scroll} contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 40 }}>
        <T v="small">
          {systemById(q.system).name} · {disciplineName(q.discipline)} · {'●'.repeat(q.difficulty)}
          {'○'.repeat(3 - q.difficulty)}
        </T>
        <T style={{ fontSize: 16.5, lineHeight: 25 }}>{q.stem}</T>
        {q.imageId && <ImageViewer id={q.imageId} />}

        <View style={{ gap: 8 }}>
          {q.choices.map((ch, i) => {
            const isPicked = choice === i;
            const isRight = i === q.answer;
            const isStruck = struck[q.id]?.includes(i);
            let border = c.border;
            let bg = c.card;
            if (shown && isRight) {
              border = c.success;
              bg = c.successSoft;
            } else if (shown && isPicked) {
              border = c.danger;
              bg = c.dangerSoft;
            } else if (isPicked) {
              border = c.primary;
              bg = c.primarySoft;
            }
            return (
              <View key={i} style={{ gap: 4 }}>
                <Pressable
                  disabled={shown}
                  onPress={() => setPicked({ ...picked, [q.id]: i })}
                  onLongPress={() => {
                    const cur = struck[q.id] ?? [];
                    setStruck({ ...struck, [q.id]: cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i] });
                  }}
                  style={{ flexDirection: 'row', gap: 12, padding: 14, borderRadius: 12, borderWidth: 2, borderColor: border, backgroundColor: bg, alignItems: 'center' }}
                >
                  <View style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: isPicked ? border : c.sub, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: c.text, fontWeight: '700' }}>{LETTERS[i]}</Text>
                  </View>
                  <T style={{ flex: 1, textDecorationLine: isStruck ? 'line-through' : 'none', opacity: isStruck ? 0.5 : 1 }}>{ch}</T>
                  {shown && isRight && <Ionicons name="checkmark-circle" size={22} color={c.success} />}
                  {shown && isPicked && !isRight && <Ionicons name="close-circle" size={22} color={c.danger} />}
                </Pressable>
                {shown && !isRight && (
                  <T v="small" style={{ paddingHorizontal: 8 }}>
                    {q.whyWrong[i]}
                  </T>
                )}
              </View>
            );
          })}
        </View>
        {!shown && <T v="small">Long press a choice to cross it out.</T>}

        {shown && (
          <Card style={{ borderColor: choice === q.answer ? c.success : c.danger, borderWidth: 1 }}>
            <T v="label" color={choice === q.answer ? c.success : c.danger}>
              {choice === undefined ? 'Not answered' : choice === q.answer ? 'Correct' : 'Incorrect'}
            </T>
            <T v="h3">Answer: {LETTERS[q.answer]}. {q.choices[q.answer]}</T>
            <T>{q.explanation}</T>
            {article && <Button kind="ghost" icon="book" label={`Read: ${article.title}`} onPress={() => router.push(`/article/${article.id}`)} />}
          </Card>
        )}

        {!shown ? (
          <Button label={timed ? (idx < questions.length - 1 ? 'Next' : 'Finish block') : 'Submit'} disabled={choice === undefined} onPress={submit} />
        ) : (
          <Button label={idx < questions.length - 1 ? 'Next question' : reviewing ? 'Back to results' : 'See results'} onPress={next} />
        )}
        {timed && !finished && (
          <Button kind="secondary" label="End block now" onPress={finish} />
        )}
      </ScrollView>
    </View>
  );
}
