import type { Question } from '../types';
import { questionsPart1 } from './part1';
import { questionsPart2 } from './part2';

export const QUESTIONS: Question[] = [...questionsPart1, ...questionsPart2];

export const questionById = (id: string) => QUESTIONS.find((q) => q.id === id);
