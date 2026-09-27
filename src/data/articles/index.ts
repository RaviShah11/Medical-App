import type { Article } from '../types';
import { cardioPulmArticles } from './cardiopulm';
import { moreArticles } from './more';
import { organArticles } from './organ';

export const ARTICLES: Article[] = [...cardioPulmArticles, ...organArticles, ...moreArticles];

export const articleById = (id: string) => ARTICLES.find((a) => a.id === id);
