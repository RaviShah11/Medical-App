import { ARTICLES } from '../data/articles';
import { CASES } from '../data/cases';
import { SYSTEMS } from '../data/meta';
import { QUESTIONS } from '../data/questions';
import type { ExamId, SystemId } from '../data/types';
import { allCards } from './srs';
import { dayKey, type State } from './store';

export const questionsForExam = (exam: ExamId | null) => (exam ? QUESTIONS.filter((q) => q.exams.includes(exam)) : QUESTIONS);

export function overall(state: State) {
  const answered = Object.values(state.answers);
  const correct = answered.filter((a) => a.correct).length;
  return { answered: answered.length, correct, accuracy: answered.length ? correct / answered.length : 0 };
}

export function bySystem(state: State) {
  return SYSTEMS.map((s) => {
    const qs = QUESTIONS.filter((q) => q.system === s.id);
    const done = qs.filter((q) => state.answers[q.id]);
    const correct = done.filter((q) => state.answers[q.id].correct).length;
    return { system: s, total: qs.length, answered: done.length, correct, accuracy: done.length ? correct / done.length : null };
  });
}

export function weakest(state: State): SystemId | null {
  const rows = bySystem(state).filter((r) => r.answered >= 2 && r.accuracy !== null);
  if (!rows.length) return null;
  rows.sort((a, b) => a.accuracy! - b.accuracy!);
  return rows[0].accuracy! < 0.75 ? rows[0].system.id : null;
}

export function dueCards(state: State) {
  const now = Date.now();
  return allCards(state.answers).filter((c) => (state.cards[c.id]?.due ?? 0) <= now);
}

export function daysUntil(date: string | null) {
  if (!date) return null;
  const target = new Date(date + 'T00:00:00');
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date(dayKey() + 'T00:00:00');
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

export interface PlanTask {
  id: string;
  label: string;
  detail: string;
  href: string;
  icon: 'help-circle' | 'layers' | 'book' | 'medkit' | 'scan';
}

export function todaysPlan(state: State): { focus: (typeof SYSTEMS)[number]; tasks: PlanTask[] } {
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / 86400000);
  const weak = weakest(state);
  const focus = SYSTEMS.find((s) => s.id === weak) ?? SYSTEMS[dayIndex % SYSTEMS.length];

  const pool = questionsForExam(state.exam);
  const unused = pool.filter((q) => !state.answers[q.id]).length;
  const days = daysUntil(state.examDate);
  const perDay = days && days > 0 ? Math.min(40, Math.max(5, Math.ceil(unused / days))) : 10;
  const qCount = Math.max(1, Math.min(perDay, unused || pool.length));

  const tasks: PlanTask[] = [
    { id: 'questions', label: `Do ${qCount} questions`, detail: unused ? `${unused} unused for your exam` : 'Review mode, all questions used', href: `/qbank`, icon: 'help-circle' },
    { id: 'cards', label: 'Review flashcards', detail: `${dueCards(state).length} due now`, href: '/flashcards', icon: 'layers' },
  ];

  const article = ARTICLES.find((a) => a.system === focus.id && !state.read[a.id]) ?? ARTICLES.find((a) => !state.read[a.id]);
  if (article) tasks.push({ id: `read:${article.id}`, label: `Read ${article.title}`, detail: `Focus system: ${focus.name}`, href: `/article/${article.id}`, icon: 'book' });

  const kase = CASES.find((k) => !state.cases[k.id]) ?? CASES[dayIndex % CASES.length];
  tasks.push({ id: `case:${kase.id}`, label: `Work a case: ${kase.title}`, detail: kase.patient, href: `/case/${kase.id}`, icon: 'medkit' });
  tasks.push({ id: 'images', label: 'Image challenge', detail: 'Name 5 findings', href: '/imaging/challenge', icon: 'scan' });

  return { focus, tasks };
}
