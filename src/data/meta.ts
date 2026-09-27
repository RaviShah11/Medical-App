import type { DisciplineId, ExamId, SystemId } from './types';

export const SYSTEMS: { id: SystemId; name: string; icon: string; color: string }[] = [
  { id: 'cardio', name: 'Cardiology', icon: 'heart', color: '#E5484D' },
  { id: 'pulm', name: 'Pulmonology', icon: 'cloud', color: '#3E8FE0' },
  { id: 'renal', name: 'Renal', icon: 'water', color: '#12A594' },
  { id: 'neuro', name: 'Neurology', icon: 'flash', color: '#8E4EC6' },
  { id: 'gi', name: 'Gastroenterology', icon: 'nutrition', color: '#E08A1E' },
  { id: 'endo', name: 'Endocrinology', icon: 'pulse', color: '#D6409F' },
  { id: 'heme', name: 'Hematology & Oncology', icon: 'color-fill', color: '#CE2C31' },
  { id: 'id', name: 'Infectious Disease', icon: 'bug', color: '#46A758' },
  { id: 'msk', name: 'Musculoskeletal', icon: 'body', color: '#A18072' },
  { id: 'derm', name: 'Dermatology', icon: 'hand-left', color: '#F76B15' },
  { id: 'psych', name: 'Psychiatry', icon: 'happy', color: '#5B5BD6' },
  { id: 'obgyn', name: 'OB/GYN', icon: 'woman', color: '#E93D82' },
  { id: 'peds', name: 'Pediatrics', icon: 'happy-outline', color: '#0090FF' },
];

export const DISCIPLINES: { id: DisciplineId; name: string }[] = [
  { id: 'anatomy', name: 'Anatomy' },
  { id: 'physiology', name: 'Physiology' },
  { id: 'pathology', name: 'Pathology' },
  { id: 'pharmacology', name: 'Pharmacology' },
  { id: 'micro', name: 'Microbiology' },
  { id: 'biochem', name: 'Biochemistry' },
  { id: 'clinical', name: 'Clinical Medicine' },
];

export const EXAMS: { id: ExamId; name: string; blurb: string }[] = [
  { id: 'MCAT', name: 'MCAT', blurb: 'Premed science foundations' },
  { id: 'STEP1', name: 'USMLE Step 1', blurb: 'Basic science mechanisms' },
  { id: 'STEP2', name: 'USMLE Step 2 CK', blurb: 'Diagnosis and management' },
  { id: 'STEP3', name: 'USMLE Step 3', blurb: 'Independent practice' },
  { id: 'COMLEX', name: 'COMLEX', blurb: 'Osteopathic licensing' },
  { id: 'NCLEX', name: 'NCLEX', blurb: 'Nursing licensure' },
  { id: 'PANCE', name: 'PANCE', blurb: 'Physician assistant boards' },
];

export const systemById = (id: SystemId) => SYSTEMS.find((s) => s.id === id)!;
export const examName = (id: ExamId) => EXAMS.find((e) => e.id === id)?.name ?? id;
export const disciplineName = (id: DisciplineId) => DISCIPLINES.find((d) => d.id === id)?.name ?? id;
