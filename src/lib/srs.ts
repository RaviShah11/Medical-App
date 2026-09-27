import { ARTICLES } from '../data/articles';
import { QUESTIONS } from '../data/questions';
import type { AnswerRecord } from './store';

// Simplified SM-2 scheduling
export type Rating = 0 | 1 | 2 | 3;

export interface CardState {
  due: number;
  interval: number;
  ease: number;
  reps: number;
}

const DAY = 24 * 60 * 60 * 1000;

export const newCard = (): CardState => ({ due: 0, interval: 0, ease: 2.5, reps: 0 });

export function schedule(c: CardState, rating: Rating, now = Date.now()): CardState {
  if (rating === 0) {
    return { due: now + 60 * 1000, interval: 0, ease: Math.max(1.3, c.ease - 0.2), reps: 0 };
  }
  let interval: number;
  let ease = c.ease;
  if (rating === 1) {
    interval = Math.max(1, Math.round(c.interval * 1.2));
    ease = Math.max(1.3, ease - 0.15);
  } else if (rating === 2) {
    interval = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.interval * ease);
  } else {
    interval = c.reps === 0 ? 4 : Math.round(c.interval * ease * 1.3);
    ease += 0.15;
  }
  return { due: now + interval * DAY, interval, ease, reps: c.reps + 1 };
}

export function previewInterval(c: CardState, rating: Rating) {
  if (rating === 0) return '1m';
  const next = schedule(c, rating, 0);
  return `${next.interval}d`;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  source: string;
  system: string;
}

export function allCards(answers: Record<string, AnswerRecord>): Flashcard[] {
  const cards: Flashcard[] = [];
  for (const a of ARTICLES) {
    a.cards.forEach((c, i) => cards.push({ id: `${a.id}#${i}`, front: c.front, back: c.back, source: a.title, system: a.system }));
  }
  for (const q of QUESTIONS) {
    if (answers[q.id] && !answers[q.id].correct) {
      cards.push({
        id: `q:${q.id}`,
        front: q.stem,
        back: `${q.choices[q.answer]}\n\n${q.explanation}`,
        source: 'Missed question',
        system: q.system,
      });
    }
  }
  return cards;
}
