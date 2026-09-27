export const SYMPTOMS = [
  'Chest pain',
  'Dyspnea',
  'Cough',
  'Fever',
  'Hemoptysis',
  'Palpitations',
  'Syncope',
  'Leg swelling',
  'Orthopnea',
  'Wheezing',
  'Headache',
  'Neck stiffness',
  'Confusion',
  'Focal weakness',
  'Speech difficulty',
  'Seizure',
  'Rash',
  'Abdominal pain',
  'Nausea or vomiting',
  'Diarrhea',
  'Jaundice',
  'GI bleeding',
  'Weight loss',
  'Fatigue',
  'Polyuria and polydipsia',
  'Heat intolerance',
  'Cold intolerance',
  'Joint pain',
  'Back pain',
  'Dysuria',
  'Flank pain',
  'Decreased urine output',
  'Pelvic pain',
  'Vaginal bleeding',
  'Amenorrhea',
  'Depressed mood',
  'Decreased need for sleep',
  'Hallucinations',
  'Pallor',
  'Easy bruising',
  'Night sweats',
  'Lymphadenopathy',
  'Hypotension',
  'Tachycardia',
] as const;

export type Symptom = (typeof SYMPTOMS)[number];

export interface Dx {
  name: string;
  symptoms: Symptom[];
  articleId?: string;
  urgent?: boolean;
}

export const DIAGNOSES: Dx[] = [
  { name: 'Acute coronary syndrome', symptoms: ['Chest pain', 'Dyspnea', 'Nausea or vomiting', 'Syncope', 'Palpitations', 'Tachycardia'], articleId: 'acs', urgent: true },
  { name: 'Pulmonary embolism', symptoms: ['Chest pain', 'Dyspnea', 'Hemoptysis', 'Leg swelling', 'Syncope', 'Tachycardia', 'Cough'], articleId: 'pe', urgent: true },
  { name: 'Aortic dissection', symptoms: ['Chest pain', 'Back pain', 'Syncope', 'Focal weakness', 'Hypotension'], urgent: true },
  { name: 'Pneumothorax', symptoms: ['Chest pain', 'Dyspnea', 'Tachycardia'], urgent: true },
  { name: 'Heart failure', symptoms: ['Dyspnea', 'Orthopnea', 'Leg swelling', 'Fatigue', 'Cough'], articleId: 'heart-failure' },
  { name: 'Atrial fibrillation', symptoms: ['Palpitations', 'Dyspnea', 'Fatigue', 'Syncope', 'Tachycardia'], articleId: 'afib' },
  { name: 'Pericarditis', symptoms: ['Chest pain', 'Fever', 'Dyspnea'] },
  { name: 'Asthma exacerbation', symptoms: ['Dyspnea', 'Wheezing', 'Cough', 'Tachycardia'], articleId: 'asthma-copd' },
  { name: 'COPD exacerbation', symptoms: ['Dyspnea', 'Wheezing', 'Cough', 'Fatigue'], articleId: 'asthma-copd' },
  { name: 'Community acquired pneumonia', symptoms: ['Cough', 'Fever', 'Dyspnea', 'Chest pain', 'Tachycardia'], articleId: 'pneumonia' },
  { name: 'Tuberculosis', symptoms: ['Cough', 'Hemoptysis', 'Fever', 'Night sweats', 'Weight loss'] },
  { name: 'Lung cancer', symptoms: ['Cough', 'Hemoptysis', 'Weight loss', 'Dyspnea', 'Fatigue'] },
  { name: 'Bacterial meningitis', symptoms: ['Fever', 'Headache', 'Neck stiffness', 'Confusion', 'Rash', 'Seizure'], articleId: 'meningitis', urgent: true },
  { name: 'Subarachnoid hemorrhage', symptoms: ['Headache', 'Neck stiffness', 'Nausea or vomiting', 'Confusion', 'Syncope'], articleId: 'intracranial-bleed', urgent: true },
  { name: 'Ischemic stroke', symptoms: ['Focal weakness', 'Speech difficulty', 'Confusion'], articleId: 'stroke', urgent: true },
  { name: 'Migraine', symptoms: ['Headache', 'Nausea or vomiting'] },
  { name: 'Epilepsy', symptoms: ['Seizure', 'Confusion'] },
  { name: 'Delirium', symptoms: ['Confusion', 'Hallucinations', 'Fever'] },
  { name: 'Acute pancreatitis', symptoms: ['Abdominal pain', 'Nausea or vomiting', 'Back pain', 'Fever', 'Tachycardia'], articleId: 'pancreatitis' },
  { name: 'Appendicitis', symptoms: ['Abdominal pain', 'Nausea or vomiting', 'Fever'], urgent: true },
  { name: 'Cirrhosis', symptoms: ['Jaundice', 'Abdominal pain', 'GI bleeding', 'Confusion', 'Fatigue', 'Easy bruising', 'Leg swelling'], articleId: 'cirrhosis' },
  { name: 'Gastroenteritis', symptoms: ['Diarrhea', 'Nausea or vomiting', 'Abdominal pain', 'Fever'] },
  { name: 'Colorectal cancer', symptoms: ['GI bleeding', 'Weight loss', 'Fatigue', 'Abdominal pain', 'Pallor'] },
  { name: 'Peptic ulcer disease', symptoms: ['Abdominal pain', 'GI bleeding', 'Nausea or vomiting'] },
  { name: 'Diabetic ketoacidosis', symptoms: ['Polyuria and polydipsia', 'Abdominal pain', 'Nausea or vomiting', 'Confusion', 'Weight loss', 'Tachycardia'], articleId: 'diabetes', urgent: true },
  { name: 'Hyperthyroidism', symptoms: ['Heat intolerance', 'Palpitations', 'Weight loss', 'Diarrhea', 'Tachycardia'], articleId: 'thyroid' },
  { name: 'Hypothyroidism', symptoms: ['Cold intolerance', 'Fatigue', 'Depressed mood', 'Amenorrhea'], articleId: 'thyroid' },
  { name: 'Iron deficiency anemia', symptoms: ['Fatigue', 'Pallor', 'Dyspnea', 'Palpitations'], articleId: 'anemia' },
  { name: 'Leukemia', symptoms: ['Fatigue', 'Pallor', 'Easy bruising', 'Fever', 'Night sweats', 'Weight loss'] },
  { name: 'Lymphoma', symptoms: ['Lymphadenopathy', 'Night sweats', 'Fever', 'Weight loss'] },
  { name: 'Sickle cell crisis', symptoms: ['Chest pain', 'Joint pain', 'Back pain', 'Fever', 'Pallor', 'Dyspnea'], articleId: 'sickle-cell' },
  { name: 'Gout', symptoms: ['Joint pain'], articleId: 'gout-ra' },
  { name: 'Rheumatoid arthritis', symptoms: ['Joint pain', 'Fatigue'], articleId: 'gout-ra' },
  { name: 'Systemic lupus erythematosus', symptoms: ['Joint pain', 'Rash', 'Fever', 'Fatigue', 'Chest pain'] },
  { name: 'Septic arthritis', symptoms: ['Joint pain', 'Fever'], urgent: true },
  { name: 'Urinary tract infection', symptoms: ['Dysuria', 'Fever', 'Abdominal pain'] },
  { name: 'Pyelonephritis', symptoms: ['Flank pain', 'Fever', 'Dysuria', 'Nausea or vomiting'] },
  { name: 'Kidney stone', symptoms: ['Flank pain', 'Nausea or vomiting', 'Abdominal pain'] },
  { name: 'Acute kidney injury', symptoms: ['Decreased urine output', 'Leg swelling', 'Nausea or vomiting', 'Confusion', 'Fatigue'], articleId: 'aki' },
  { name: 'Ectopic pregnancy', symptoms: ['Pelvic pain', 'Vaginal bleeding', 'Amenorrhea', 'Syncope', 'Hypotension', 'Abdominal pain'], articleId: 'ectopic', urgent: true },
  { name: 'Preeclampsia', symptoms: ['Headache', 'Leg swelling', 'Abdominal pain', 'Seizure'], articleId: 'preeclampsia', urgent: true },
  { name: 'Pelvic inflammatory disease', symptoms: ['Pelvic pain', 'Fever', 'Vaginal bleeding'] },
  { name: 'Major depressive disorder', symptoms: ['Depressed mood', 'Fatigue', 'Weight loss'], articleId: 'mood' },
  { name: 'Bipolar disorder (mania)', symptoms: ['Decreased need for sleep', 'Hallucinations'], articleId: 'mood' },
  { name: 'Schizophrenia', symptoms: ['Hallucinations'] },
  { name: 'Sepsis', symptoms: ['Fever', 'Hypotension', 'Tachycardia', 'Confusion'], urgent: true },
  { name: 'HIV infection', symptoms: ['Fever', 'Weight loss', 'Night sweats', 'Lymphadenopathy', 'Rash', 'Diarrhea'] },
];

export function rankDiagnoses(selected: Symptom[]) {
  if (selected.length === 0) return [];
  return DIAGNOSES.map((d) => {
    const hits = d.symptoms.filter((s) => selected.includes(s));
    // Reward coverage of the patient's symptoms and specificity of the match
    const score = hits.length / selected.length + (hits.length / d.symptoms.length) * 0.5;
    return { dx: d, hits, score };
  })
    .filter((r) => r.hits.length > 0)
    .sort((a, b) => b.score - a.score || Number(!!b.dx.urgent) - Number(!!a.dx.urgent))
    .slice(0, 12);
}
