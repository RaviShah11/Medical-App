export type ExamId = 'MCAT' | 'STEP1' | 'STEP2' | 'STEP3' | 'COMLEX' | 'NCLEX' | 'PANCE';

export type SystemId =
  | 'cardio'
  | 'pulm'
  | 'renal'
  | 'neuro'
  | 'gi'
  | 'endo'
  | 'heme'
  | 'id'
  | 'msk'
  | 'derm'
  | 'psych'
  | 'obgyn'
  | 'peds';

export type DisciplineId = 'anatomy' | 'physiology' | 'pathology' | 'pharmacology' | 'micro' | 'biochem' | 'clinical';

export interface Section {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Table {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface Card {
  front: string;
  back: string;
}

export interface Article {
  id: string;
  title: string;
  system: SystemId;
  disciplines: DisciplineId[];
  exams: ExamId[];
  summary: string;
  sections: Section[];
  highYield: string[];
  tables?: Table[];
  cards: Card[];
  related: string[];
  keywords: string[];
}

export interface Question {
  id: string;
  system: SystemId;
  discipline: DisciplineId;
  exams: ExamId[];
  difficulty: 1 | 2 | 3;
  stem: string;
  imageId?: string;
  choices: string[];
  answer: number;
  explanation: string;
  whyWrong: string[];
  articleId?: string;
}

export interface CaseStep {
  id: string;
  label: string;
  result: string;
  relevant: boolean;
  imageId?: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  system: SystemId;
  exams: ExamId[];
  difficulty: 1 | 2 | 3;
  setting: string;
  patient: string;
  chiefComplaint: string;
  vitals: { label: string; value: string; abnormal?: boolean }[];
  history: CaseStep[];
  exam: CaseStep[];
  tests: (CaseStep & { kind: 'lab' | 'imaging' | 'other' })[];
  diagnoses: string[];
  answer: number;
  treatments: string[];
  treatmentAnswer: number;
  teaching: string[];
  articleId?: string;
}

export type Modality = 'Radiograph' | 'CT' | 'ECG' | 'Histology' | 'Dermatology' | 'Ultrasound';

export interface Finding {
  label: string;
  x: number;
  y: number;
  detail: string;
}

export interface ImagingStudy {
  id: string;
  title: string;
  modality: Modality;
  system: SystemId;
  clinical: string;
  diagnosis: string;
  findings: Finding[];
  teaching: string;
  options: string[];
  answer: number;
  articleId?: string;
}

export interface LabValue {
  name: string;
  category: string;
  range: string;
  high: string;
  low: string;
}

export interface Drug {
  id: string;
  name: string;
  drugClass: string;
  system: SystemId;
  mechanism: string;
  uses: string[];
  adverse: string[];
  interactions: string[];
  pearls: string;
  similar: string[];
}
