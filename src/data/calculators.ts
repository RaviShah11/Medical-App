export type CalcInput =
  | { key: string; label: string; kind: 'number'; unit?: string }
  | { key: string; label: string; kind: 'toggle'; points: number }
  | { key: string; label: string; kind: 'select'; options: { label: string; value: number }[] };

export interface Calculator {
  id: string;
  name: string;
  category: string;
  description: string;
  inputs: CalcInput[];
  compute: (v: Record<string, number | undefined>) => { value: string; interpretation: string } | null;
}

const need = (v: Record<string, number | undefined>, keys: string[]) => keys.every((k) => v[k] !== undefined && !Number.isNaN(v[k]));
const sumPoints = (inputs: CalcInput[], v: Record<string, number | undefined>) =>
  inputs.reduce((s, i) => {
    if (i.kind === 'toggle') return s + (v[i.key] ? i.points : 0);
    if (i.kind === 'select') return s + (v[i.key] ?? 0);
    return s;
  }, 0);

const chads: CalcInput[] = [
  { key: 'chf', label: 'Congestive heart failure', kind: 'toggle', points: 1 },
  { key: 'htn', label: 'Hypertension', kind: 'toggle', points: 1 },
  { key: 'age', label: 'Age', kind: 'select', options: [{ label: 'Under 65', value: 0 }, { label: '65 to 74', value: 1 }, { label: '75 or older', value: 2 }] },
  { key: 'dm', label: 'Diabetes', kind: 'toggle', points: 1 },
  { key: 'stroke', label: 'Prior stroke, TIA, or thromboembolism', kind: 'toggle', points: 2 },
  { key: 'vasc', label: 'Vascular disease (MI, PAD, aortic plaque)', kind: 'toggle', points: 1 },
  { key: 'female', label: 'Female sex', kind: 'toggle', points: 1 },
];

const wellsPe: CalcInput[] = [
  { key: 'dvt', label: 'Clinical signs of DVT', kind: 'toggle', points: 3 },
  { key: 'alt', label: 'PE is the most likely diagnosis', kind: 'toggle', points: 3 },
  { key: 'hr', label: 'Heart rate above 100', kind: 'toggle', points: 1.5 },
  { key: 'immob', label: 'Immobilization or surgery in past 4 weeks', kind: 'toggle', points: 1.5 },
  { key: 'prior', label: 'Prior DVT or PE', kind: 'toggle', points: 1.5 },
  { key: 'hemo', label: 'Hemoptysis', kind: 'toggle', points: 1 },
  { key: 'ca', label: 'Active cancer', kind: 'toggle', points: 1 },
];

const wellsDvt: CalcInput[] = [
  { key: 'ca', label: 'Active cancer', kind: 'toggle', points: 1 },
  { key: 'para', label: 'Paralysis or recent leg cast', kind: 'toggle', points: 1 },
  { key: 'bed', label: 'Bedridden 3 days or surgery within 12 weeks', kind: 'toggle', points: 1 },
  { key: 'tender', label: 'Tenderness along deep veins', kind: 'toggle', points: 1 },
  { key: 'leg', label: 'Entire leg swollen', kind: 'toggle', points: 1 },
  { key: 'calf', label: 'Calf swelling 3 cm more than other side', kind: 'toggle', points: 1 },
  { key: 'pit', label: 'Pitting edema in symptomatic leg', kind: 'toggle', points: 1 },
  { key: 'coll', label: 'Collateral superficial veins', kind: 'toggle', points: 1 },
  { key: 'prior', label: 'Prior DVT', kind: 'toggle', points: 1 },
  { key: 'alt', label: 'Alternative diagnosis as likely', kind: 'toggle', points: -2 },
];

const curb: CalcInput[] = [
  { key: 'c', label: 'Confusion', kind: 'toggle', points: 1 },
  { key: 'u', label: 'BUN above 19 mg/dL', kind: 'toggle', points: 1 },
  { key: 'r', label: 'Respiratory rate 30 or more', kind: 'toggle', points: 1 },
  { key: 'b', label: 'SBP below 90 or DBP 60 or less', kind: 'toggle', points: 1 },
  { key: 'a', label: 'Age 65 or older', kind: 'toggle', points: 1 },
];

const centor: CalcInput[] = [
  { key: 'age', label: 'Age', kind: 'select', options: [{ label: '3 to 14', value: 1 }, { label: '15 to 44', value: 0 }, { label: '45 or older', value: -1 }] },
  { key: 'ex', label: 'Tonsillar exudate or swelling', kind: 'toggle', points: 1 },
  { key: 'ln', label: 'Tender anterior cervical nodes', kind: 'toggle', points: 1 },
  { key: 'fever', label: 'Temperature above 38 C', kind: 'toggle', points: 1 },
  { key: 'cough', label: 'Cough absent', kind: 'toggle', points: 1 },
];

const gcs: CalcInput[] = [
  { key: 'e', label: 'Eye opening', kind: 'select', options: [{ label: 'Spontaneous (4)', value: 4 }, { label: 'To voice (3)', value: 3 }, { label: 'To pain (2)', value: 2 }, { label: 'None (1)', value: 1 }] },
  { key: 'v', label: 'Verbal', kind: 'select', options: [{ label: 'Oriented (5)', value: 5 }, { label: 'Confused (4)', value: 4 }, { label: 'Inappropriate words (3)', value: 3 }, { label: 'Sounds only (2)', value: 2 }, { label: 'None (1)', value: 1 }] },
  { key: 'm', label: 'Motor', kind: 'select', options: [{ label: 'Obeys (6)', value: 6 }, { label: 'Localizes pain (5)', value: 5 }, { label: 'Withdraws (4)', value: 4 }, { label: 'Flexion posturing (3)', value: 3 }, { label: 'Extension posturing (2)', value: 2 }, { label: 'None (1)', value: 1 }] },
];

export const CALCULATORS: Calculator[] = [
  {
    id: 'chads',
    name: 'CHA2DS2 VASc',
    category: 'Cardiology',
    description: 'Stroke risk in atrial fibrillation.',
    inputs: chads,
    compute: (v) => {
      const s = sumPoints(chads, v);
      const female = !!v.female;
      const anticoag = female ? s >= 3 : s >= 2;
      const consider = female ? s === 2 : s === 1;
      return {
        value: `${s} points`,
        interpretation: anticoag ? 'Anticoagulation recommended (DOAC preferred).' : consider ? 'Consider anticoagulation.' : 'Anticoagulation not needed.',
      };
    },
  },
  {
    id: 'wells-pe',
    name: 'Wells score for PE',
    category: 'Pulmonology',
    description: 'Pretest probability of pulmonary embolism.',
    inputs: wellsPe,
    compute: (v) => {
      const s = sumPoints(wellsPe, v);
      return { value: `${s} points`, interpretation: s > 4 ? 'PE likely. Get CT pulmonary angiography.' : 'PE unlikely. Check D dimer. Negative rules out PE.' };
    },
  },
  {
    id: 'wells-dvt',
    name: 'Wells score for DVT',
    category: 'Hematology',
    description: 'Pretest probability of deep vein thrombosis.',
    inputs: wellsDvt,
    compute: (v) => {
      const s = sumPoints(wellsDvt, v);
      return { value: `${s} points`, interpretation: s >= 2 ? 'DVT likely. Get compression ultrasound.' : 'DVT unlikely. Check D dimer.' };
    },
  },
  {
    id: 'curb65',
    name: 'CURB 65',
    category: 'Infectious Disease',
    description: 'Pneumonia severity and where to treat.',
    inputs: curb,
    compute: (v) => {
      const s = sumPoints(curb, v);
      return { value: `${s} points`, interpretation: s <= 1 ? 'Low risk. Treat as outpatient.' : s === 2 ? 'Moderate risk. Consider admission.' : 'High risk. Admit and consider ICU.' };
    },
  },
  {
    id: 'centor',
    name: 'Centor (McIsaac) score',
    category: 'Infectious Disease',
    description: 'Likelihood of strep pharyngitis.',
    inputs: centor,
    compute: (v) => {
      const s = sumPoints(centor, v);
      return { value: `${s} points`, interpretation: s <= 1 ? 'No testing or antibiotics.' : s <= 3 ? 'Do a rapid strep test and treat if positive.' : 'Test and consider empiric antibiotics.' };
    },
  },
  {
    id: 'gcs',
    name: 'Glasgow Coma Scale',
    category: 'Neurology',
    description: 'Level of consciousness after injury.',
    inputs: gcs,
    compute: (v) => {
      if (!need(v, ['e', 'v', 'm'])) return null;
      const s = v.e! + v.v! + v.m!;
      return { value: `${s} / 15`, interpretation: s <= 8 ? 'Severe. Intubate to protect the airway.' : s <= 12 ? 'Moderate injury.' : 'Mild injury.' };
    },
  },
  {
    id: 'anion-gap',
    name: 'Anion gap (albumin corrected)',
    category: 'Renal',
    description: 'Sorts metabolic acidosis.',
    inputs: [
      { key: 'na', label: 'Sodium', kind: 'number', unit: 'mEq/L' },
      { key: 'cl', label: 'Chloride', kind: 'number', unit: 'mEq/L' },
      { key: 'hco3', label: 'Bicarbonate', kind: 'number', unit: 'mEq/L' },
      { key: 'alb', label: 'Albumin (optional)', kind: 'number', unit: 'g/dL' },
    ],
    compute: (v) => {
      if (!need(v, ['na', 'cl', 'hco3'])) return null;
      const ag = v.na! - (v.cl! + v.hco3!);
      const corr = v.alb !== undefined && !Number.isNaN(v.alb) ? ag + 2.5 * (4 - v.alb) : ag;
      return { value: `${corr.toFixed(1)} mEq/L`, interpretation: corr > 12 ? 'High anion gap. Think MUDPILES.' : 'Normal anion gap.' };
    },
  },
  {
    id: 'winters',
    name: 'Winter formula',
    category: 'Renal',
    description: 'Expected PaCO2 in metabolic acidosis.',
    inputs: [{ key: 'hco3', label: 'Bicarbonate', kind: 'number', unit: 'mEq/L' }],
    compute: (v) => {
      if (!need(v, ['hco3'])) return null;
      const e = 1.5 * v.hco3! + 8;
      return { value: `${(e - 2).toFixed(0)} to ${(e + 2).toFixed(0)} mm Hg`, interpretation: 'Higher PaCO2 means added respiratory acidosis. Lower means added respiratory alkalosis.' };
    },
  },
  {
    id: 'aa-gradient',
    name: 'A a gradient',
    category: 'Pulmonology',
    description: 'Separates hypoventilation from V/Q problems.',
    inputs: [
      { key: 'fio2', label: 'FiO2', kind: 'number', unit: '% (21 on room air)' },
      { key: 'paco2', label: 'PaCO2', kind: 'number', unit: 'mm Hg' },
      { key: 'pao2', label: 'PaO2', kind: 'number', unit: 'mm Hg' },
      { key: 'age', label: 'Age', kind: 'number', unit: 'years' },
    ],
    compute: (v) => {
      if (!need(v, ['fio2', 'paco2', 'pao2', 'age'])) return null;
      const pA = (v.fio2! / 100) * (760 - 47) - v.paco2! / 0.8;
      const g = pA - v.pao2!;
      const expected = v.age! / 4 + 4;
      return { value: `${g.toFixed(0)} mm Hg`, interpretation: g > expected ? `Elevated (expected about ${expected.toFixed(0)}). Suggests V/Q mismatch, shunt, or diffusion defect.` : `Normal for age (expected about ${expected.toFixed(0)}). Consider hypoventilation or altitude.` };
    },
  },
  {
    id: 'corrected-ca',
    name: 'Corrected calcium',
    category: 'Endocrinology',
    description: 'Adjusts total calcium for low albumin.',
    inputs: [
      { key: 'ca', label: 'Calcium', kind: 'number', unit: 'mg/dL' },
      { key: 'alb', label: 'Albumin', kind: 'number', unit: 'g/dL' },
    ],
    compute: (v) => {
      if (!need(v, ['ca', 'alb'])) return null;
      const c = v.ca! + 0.8 * (4 - v.alb!);
      return { value: `${c.toFixed(1)} mg/dL`, interpretation: c > 10.5 ? 'Hypercalcemia.' : c < 8.5 ? 'Hypocalcemia.' : 'Normal.' };
    },
  },
  {
    id: 'corrected-na',
    name: 'Sodium corrected for glucose',
    category: 'Endocrinology',
    description: 'Adjusts sodium in hyperglycemia.',
    inputs: [
      { key: 'na', label: 'Sodium', kind: 'number', unit: 'mEq/L' },
      { key: 'glu', label: 'Glucose', kind: 'number', unit: 'mg/dL' },
    ],
    compute: (v) => {
      if (!need(v, ['na', 'glu'])) return null;
      const c = v.na! + 1.6 * ((v.glu! - 100) / 100);
      return { value: `${c.toFixed(1)} mEq/L`, interpretation: 'Uses 1.6 mEq/L per 100 mg/dL glucose above 100. Some use 2.4.' };
    },
  },
  {
    id: 'crcl',
    name: 'Creatinine clearance (Cockcroft Gault)',
    category: 'Renal',
    description: 'Estimates kidney function for drug dosing.',
    inputs: [
      { key: 'age', label: 'Age', kind: 'number', unit: 'years' },
      { key: 'wt', label: 'Weight', kind: 'number', unit: 'kg' },
      { key: 'cr', label: 'Creatinine', kind: 'number', unit: 'mg/dL' },
      { key: 'female', label: 'Female', kind: 'toggle', points: 0 },
    ],
    compute: (v) => {
      if (!need(v, ['age', 'wt', 'cr'])) return null;
      let c = ((140 - v.age!) * v.wt!) / (72 * v.cr!);
      if (v.female) c *= 0.85;
      return { value: `${c.toFixed(0)} mL/min`, interpretation: c < 30 ? 'Severely reduced. Adjust most renally cleared drugs.' : c < 60 ? 'Moderately reduced.' : 'Adequate for most drugs.' };
    },
  },
  {
    id: 'qtc',
    name: 'QTc (Bazett)',
    category: 'Cardiology',
    description: 'Heart rate corrected QT interval.',
    inputs: [
      { key: 'qt', label: 'QT interval', kind: 'number', unit: 'ms' },
      { key: 'hr', label: 'Heart rate', kind: 'number', unit: 'bpm' },
    ],
    compute: (v) => {
      if (!need(v, ['qt', 'hr'])) return null;
      const rr = 60 / v.hr!;
      const q = v.qt! / Math.sqrt(rr);
      return { value: `${q.toFixed(0)} ms`, interpretation: q > 500 ? 'Markedly prolonged. High torsades risk.' : q > 460 ? 'Prolonged.' : 'Normal.' };
    },
  },
  {
    id: 'map',
    name: 'Mean arterial pressure',
    category: 'Cardiology',
    description: 'Average perfusion pressure.',
    inputs: [
      { key: 'sbp', label: 'Systolic BP', kind: 'number', unit: 'mm Hg' },
      { key: 'dbp', label: 'Diastolic BP', kind: 'number', unit: 'mm Hg' },
    ],
    compute: (v) => {
      if (!need(v, ['sbp', 'dbp'])) return null;
      const m = (v.sbp! + 2 * v.dbp!) / 3;
      return { value: `${m.toFixed(0)} mm Hg`, interpretation: m < 65 ? 'Below 65. Organ perfusion at risk (sepsis target is 65 or higher).' : 'Adequate.' };
    },
  },
  {
    id: 'bmi',
    name: 'Body mass index',
    category: 'General',
    description: 'Weight relative to height.',
    inputs: [
      { key: 'wt', label: 'Weight', kind: 'number', unit: 'kg' },
      { key: 'ht', label: 'Height', kind: 'number', unit: 'cm' },
    ],
    compute: (v) => {
      if (!need(v, ['wt', 'ht'])) return null;
      const b = v.wt! / (v.ht! / 100) ** 2;
      return { value: `${b.toFixed(1)} kg/m2`, interpretation: b < 18.5 ? 'Underweight.' : b < 25 ? 'Normal.' : b < 30 ? 'Overweight.' : 'Obese.' };
    },
  },
  {
    id: 'meld',
    name: 'MELD Na',
    category: 'Gastroenterology',
    description: '90 day mortality in cirrhosis and transplant priority.',
    inputs: [
      { key: 'bili', label: 'Bilirubin', kind: 'number', unit: 'mg/dL' },
      { key: 'inr', label: 'INR', kind: 'number' },
      { key: 'cr', label: 'Creatinine', kind: 'number', unit: 'mg/dL' },
      { key: 'na', label: 'Sodium', kind: 'number', unit: 'mEq/L' },
      { key: 'dialysis', label: 'Dialysis twice in past week', kind: 'toggle', points: 0 },
    ],
    compute: (v) => {
      if (!need(v, ['bili', 'inr', 'cr', 'na'])) return null;
      const bili = Math.max(1, v.bili!);
      const inr = Math.max(1, v.inr!);
      const cr = v.dialysis ? 4 : Math.min(4, Math.max(1, v.cr!));
      const na = Math.min(137, Math.max(125, v.na!));
      let meld = 0.957 * Math.log(cr) + 0.378 * Math.log(bili) + 1.12 * Math.log(inr) + 0.643;
      meld = Math.round(meld * 10);
      if (meld > 11) meld = meld + 1.32 * (137 - na) - 0.033 * meld * (137 - na);
      const s = Math.round(meld);
      return { value: `${s}`, interpretation: s >= 40 ? 'About 71% 90 day mortality.' : s >= 30 ? 'About 53% 90 day mortality.' : s >= 20 ? 'About 20% 90 day mortality.' : s >= 10 ? 'About 6% 90 day mortality.' : 'About 2% 90 day mortality.' };
    },
  },
];

export const calculatorById = (id: string) => CALCULATORS.find((c) => c.id === id);
