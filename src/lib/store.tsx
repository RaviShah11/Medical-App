import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ExamId } from '../data/types';
import { newCard, schedule, type CardState, type Rating } from './srs';

export type ThemePref = 'system' | 'light' | 'dark';

export interface AnswerRecord {
  choice: number;
  correct: boolean;
  at: number;
}

export interface State {
  onboarded: boolean;
  exam: ExamId | null;
  examDate: string | null;
  themePref: ThemePref;
  answers: Record<string, AnswerRecord>;
  flagged: string[];
  cards: Record<string, CardState>;
  bookmarks: string[];
  highlights: Record<string, string[]>;
  read: Record<string, number>;
  cases: Record<string, { score: number; at: number }>;
  imaging: Record<string, { correct: boolean; at: number }>;
  activity: Record<string, number>;
  planDone: Record<string, string[]>;
}

const INITIAL: State = {
  onboarded: false,
  exam: null,
  examDate: null,
  themePref: 'system',
  answers: {},
  flagged: [],
  cards: {},
  bookmarks: [],
  highlights: {},
  read: {},
  cases: {},
  imaging: {},
  activity: {},
  planDone: {},
};

const KEY = 'medstudy:v1';

export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

function bump(activity: Record<string, number>) {
  const k = dayKey();
  return { ...activity, [k]: (activity[k] ?? 0) + 1 };
}

function useStoreValue() {
  const [state, setState] = useState<State>(INITIAL);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) setState({ ...INITIAL, ...JSON.parse(raw) });
      })
      .catch(() => {})
      .finally(() => {
        loaded.current = true;
        setReady(true);
      });
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
  }, [state]);

  const update = useCallback((fn: (s: State) => State) => setState(fn), []);

  const actions = useMemo(
    () => ({
      finishOnboarding: (exam: ExamId, examDate: string | null) => update((s) => ({ ...s, onboarded: true, exam, examDate })),
      setExam: (exam: ExamId) => update((s) => ({ ...s, exam })),
      setExamDate: (examDate: string | null) => update((s) => ({ ...s, examDate })),
      setTheme: (themePref: ThemePref) => update((s) => ({ ...s, themePref })),
      recordAnswer: (qid: string, choice: number, correct: boolean) =>
        update((s) => ({ ...s, answers: { ...s.answers, [qid]: { choice, correct, at: Date.now() } }, activity: bump(s.activity) })),
      toggleFlag: (qid: string) => update((s) => ({ ...s, flagged: toggle(s.flagged, qid) })),
      reviewCard: (id: string, rating: Rating) =>
        update((s) => ({ ...s, cards: { ...s.cards, [id]: schedule(s.cards[id] ?? newCard(), rating) }, activity: bump(s.activity) })),
      toggleBookmark: (id: string) => update((s) => ({ ...s, bookmarks: toggle(s.bookmarks, id) })),
      toggleHighlight: (articleId: string, key: string) =>
        update((s) => ({ ...s, highlights: { ...s.highlights, [articleId]: toggle(s.highlights[articleId] ?? [], key) } })),
      markRead: (id: string) => update((s) => (s.read[id] ? s : { ...s, read: { ...s.read, [id]: Date.now() }, activity: bump(s.activity) })),
      recordCase: (id: string, score: number) =>
        update((s) => ({ ...s, cases: { ...s.cases, [id]: { score: Math.max(score, s.cases[id]?.score ?? 0), at: Date.now() } }, activity: bump(s.activity) })),
      recordImaging: (id: string, correct: boolean) =>
        update((s) => ({ ...s, imaging: { ...s.imaging, [id]: { correct, at: Date.now() } }, activity: bump(s.activity) })),
      togglePlanTask: (task: string) =>
        update((s) => {
          const k = dayKey();
          return { ...s, planDone: { ...s.planDone, [k]: toggle(s.planDone[k] ?? [], task) } };
        }),
      resetProgress: () => update((s) => ({ ...INITIAL, onboarded: true, exam: s.exam, examDate: s.examDate, themePref: s.themePref })),
    }),
    [update],
  );

  return { state, ready, ...actions };
}

type Store = ReturnType<typeof useStoreValue>;

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const value = useStoreValue();
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be inside StoreProvider');
  return ctx;
}

export function streak(activity: Record<string, number>) {
  let count = 0;
  const d = new Date();
  if (!activity[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (activity[dayKey(d)]) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}
