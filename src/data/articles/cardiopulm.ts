import type { Article } from '../types';

const CLIN = ['STEP1', 'STEP2', 'STEP3', 'COMLEX', 'PANCE', 'NCLEX'] as const;

export const cardioPulmArticles: Article[] = [
  {
    id: 'acs',
    title: 'Acute Coronary Syndrome',
    system: 'cardio',
    disciplines: ['pathology', 'clinical', 'pharmacology'],
    exams: [...CLIN],
    summary:
      'ACS covers unstable angina, NSTEMI, and STEMI. All three come from rupture of an atherosclerotic plaque with thrombus that cuts off blood flow to the myocardium.',
    sections: [
      {
        heading: 'Pathophysiology',
        paragraphs: [
          'A lipid rich plaque with a thin fibrous cap ruptures. Exposed collagen and tissue factor activate platelets and the coagulation cascade. The thrombus partially or fully blocks the artery.',
          'Partial occlusion causes subendocardial ischemia (unstable angina or NSTEMI). Complete occlusion causes transmural infarction (STEMI).',
        ],
      },
      {
        heading: 'Presentation',
        bullets: [
          'Pressure like chest pain radiating to the left arm or jaw, lasting over 20 minutes',
          'Diaphoresis, dyspnea, nausea',
          'Women, older adults, and diabetics often present atypically with fatigue or epigastric pain',
        ],
      },
      {
        heading: 'Diagnosis',
        bullets: [
          'ECG within 10 minutes of arrival',
          'STEMI means new ST elevation in 2 contiguous leads or a new LBBB',
          'Troponin rises in 3 to 4 hours, peaks at 24 hours, stays up 7 to 10 days',
          'Unstable angina has a normal troponin. NSTEMI has an elevated troponin without ST elevation',
        ],
      },
      {
        heading: 'Management',
        bullets: [
          'Aspirin plus a P2Y12 inhibitor (clopidogrel, ticagrelor)',
          'Anticoagulation with heparin',
          'Nitrates for pain unless hypotensive, RV infarct, or recent PDE5 inhibitor use',
          'Beta blocker, high intensity statin, ACE inhibitor',
          'STEMI needs PCI within 90 minutes of first medical contact, or fibrinolysis within 30 minutes if PCI is not available in 120 minutes',
        ],
      },
    ],
    highYield: [
      'Inferior MI (II, III, aVF) comes from the RCA. Avoid nitrates since RV infarcts are preload dependent.',
      'Anterior MI (V1 to V4) comes from the LAD.',
      'Papillary muscle rupture happens 2 to 7 days after MI and causes acute mitral regurgitation.',
      'Free wall rupture happens 5 to 14 days after MI and causes tamponade.',
      'Dressler syndrome is autoimmune pericarditis weeks after MI.',
    ],
    tables: [
      {
        title: 'ECG territory',
        headers: ['Leads', 'Territory', 'Artery'],
        rows: [
          ['V1 to V2', 'Septal', 'LAD'],
          ['V3 to V4', 'Anterior', 'LAD'],
          ['I, aVL, V5 to V6', 'Lateral', 'LCX'],
          ['II, III, aVF', 'Inferior', 'RCA'],
        ],
      },
    ],
    cards: [
      { front: 'Which artery causes an inferior STEMI in most patients?', back: 'Right coronary artery (RCA)' },
      { front: 'Door to balloon target time for STEMI?', back: '90 minutes from first medical contact' },
      { front: 'Complication 2 to 7 days post MI with a new holosystolic murmur?', back: 'Papillary muscle rupture causing acute mitral regurgitation' },
      { front: 'Why avoid nitrates in RV infarction?', back: 'The RV is preload dependent, so venodilation causes severe hypotension' },
    ],
    related: ['heart-failure', 'afib'],
    keywords: ['MI', 'STEMI', 'NSTEMI', 'chest pain', 'troponin', 'angina'],
  },
  {
    id: 'heart-failure',
    title: 'Heart Failure',
    system: 'cardio',
    disciplines: ['physiology', 'clinical', 'pharmacology'],
    exams: ['MCAT', ...CLIN],
    summary:
      'Heart failure means the heart cannot pump enough blood to meet the body\'s needs at normal filling pressures. We split it by ejection fraction into HFrEF and HFpEF.',
    sections: [
      {
        heading: 'Types',
        bullets: [
          'HFrEF (EF 40% or lower) is systolic failure, often from ischemia or dilated cardiomyopathy',
          'HFpEF (EF 50% or higher) is diastolic failure, often from hypertension and a stiff hypertrophied ventricle',
          'Left sided failure causes pulmonary congestion. Right sided failure causes systemic venous congestion',
        ],
      },
      {
        heading: 'Symptoms and signs',
        bullets: [
          'Dyspnea on exertion, orthopnea, paroxysmal nocturnal dyspnea',
          'Crackles, S3 gallop, displaced apical impulse',
          'JVD, hepatomegaly, peripheral edema in right sided failure',
        ],
      },
      {
        heading: 'Workup',
        bullets: [
          'BNP or NT proBNP is elevated',
          'Echocardiogram measures EF',
          'Chest film shows cardiomegaly, cephalization, Kerley B lines, effusions',
        ],
      },
      {
        heading: 'Treatment of HFrEF',
        paragraphs: [
          'Four drug classes cut mortality. Start them together when blood pressure and kidney function allow.',
        ],
        bullets: [
          'ARNI (sacubitril valsartan), or ACE inhibitor or ARB',
          'Evidence based beta blocker (carvedilol, metoprolol succinate, bisoprolol)',
          'Mineralocorticoid antagonist (spironolactone, eplerenone)',
          'SGLT2 inhibitor (dapagliflozin, empagliflozin)',
          'Loop diuretics relieve symptoms but do not improve survival',
        ],
      },
    ],
    highYield: [
      'S3 means volume overload. S4 means a stiff ventricle.',
      'BNP is released from ventricular myocytes when they stretch.',
      'Hydralazine plus isosorbide dinitrate improves survival in Black patients with HFrEF.',
      'Digoxin reduces hospitalizations but does not lower mortality.',
    ],
    cards: [
      { front: 'Four mortality lowering drug classes in HFrEF?', back: 'ARNI or ACEi or ARB, beta blocker, MRA, SGLT2 inhibitor' },
      { front: 'What does an S3 heart sound suggest in an adult?', back: 'Volume overload, as in systolic heart failure' },
      { front: 'Hormone released by stretched ventricular myocytes?', back: 'BNP (brain natriuretic peptide)' },
    ],
    related: ['acs', 'afib'],
    keywords: ['CHF', 'HFrEF', 'HFpEF', 'BNP', 'edema', 'dyspnea', 'ejection fraction'],
  },
  {
    id: 'afib',
    title: 'Atrial Fibrillation',
    system: 'cardio',
    disciplines: ['clinical', 'pharmacology'],
    exams: [...CLIN],
    summary:
      'Atrial fibrillation is the most common sustained arrhythmia. Chaotic atrial activity gives an irregularly irregular rhythm with no P waves and a risk of stroke from left atrial appendage clots.',
    sections: [
      {
        heading: 'Causes',
        bullets: ['Hypertension and structural heart disease', 'Hyperthyroidism', 'Alcohol ("holiday heart")', 'Mitral valve disease', 'Sleep apnea, age, post surgery'],
      },
      {
        heading: 'ECG',
        bullets: ['Irregularly irregular R to R intervals', 'No discrete P waves', 'Narrow QRS unless aberrancy'],
      },
      {
        heading: 'Management',
        bullets: [
          'Unstable patient means synchronized cardioversion now',
          'Rate control with beta blockers or nondihydropyridine calcium channel blockers',
          'Rhythm control with amiodarone, flecainide, or ablation for selected patients',
          'Anticoagulate based on CHA2DS2 VASc. DOACs are preferred except with mechanical valves or moderate to severe mitral stenosis',
        ],
      },
    ],
    highYield: [
      'Check TSH in new onset atrial fibrillation.',
      'CHA2DS2 VASc of 2 or more in men or 3 or more in women means anticoagulate.',
      'Warfarin is required for mechanical valves. DOACs are contraindicated there.',
      'AF lasting over 48 hours needs 3 weeks of anticoagulation or a TEE before elective cardioversion.',
    ],
    cards: [
      { front: 'Classic ECG of atrial fibrillation?', back: 'Irregularly irregular rhythm with no P waves' },
      { front: 'Anticoagulant for AF with a mechanical valve?', back: 'Warfarin (DOACs are contraindicated)' },
      { front: 'Most common site of thrombus in AF?', back: 'Left atrial appendage' },
    ],
    related: ['acs', 'heart-failure', 'stroke', 'thyroid'],
    keywords: ['AF', 'arrhythmia', 'CHA2DS2VASc', 'anticoagulation', 'irregular'],
  },
  {
    id: 'asthma-copd',
    title: 'Asthma and COPD',
    system: 'pulm',
    disciplines: ['physiology', 'clinical', 'pharmacology'],
    exams: ['MCAT', ...CLIN],
    summary:
      'Both are obstructive lung diseases with a reduced FEV1 to FVC ratio. Asthma is reversible airway inflammation. COPD is fixed obstruction, usually from smoking.',
    sections: [
      {
        heading: 'Asthma',
        bullets: [
          'Type 2 inflammation with eosinophils, IgE, IL 4, IL 5, IL 13',
          'Episodic wheeze, cough worse at night, triggers like allergens, exercise, cold air',
          'Spirometry shows obstruction that improves 12% or more with a bronchodilator',
          'Curschmann spirals and Charcot Leyden crystals in sputum',
        ],
      },
      {
        heading: 'COPD',
        bullets: [
          'Emphysema destroys alveolar walls and raises compliance. Centriacinar in smokers, panacinar in alpha 1 antitrypsin deficiency',
          'Chronic bronchitis means productive cough for 3 months in 2 consecutive years',
          'Barrel chest, pursed lip breathing, hyperinflation on chest film',
          'DLCO drops in emphysema but stays normal in asthma',
        ],
      },
      {
        heading: 'Treatment',
        bullets: [
          'Asthma relies on inhaled corticosteroids as the foundation. ICS formoterol works as both controller and reliever',
          'COPD relies on long acting bronchodilators (LAMA, LABA). Add ICS if eosinophils are high or exacerbations are frequent',
          'Smoking cessation and supplemental oxygen (if PaO2 is 55 or lower) are the only interventions that improve COPD survival',
          'Exacerbations are treated with bronchodilators, systemic steroids, and antibiotics when sputum changes',
        ],
      },
    ],
    highYield: [
      'A normal or rising PaCO2 in a severe asthma attack signals fatigue and impending respiratory failure.',
      'Give COPD patients target SpO2 of 88% to 92% to avoid worsening hypercapnia.',
      'Aspirin exacerbated respiratory disease is asthma, nasal polyps, and aspirin sensitivity.',
      'Early onset emphysema in a nonsmoker with liver disease suggests alpha 1 antitrypsin deficiency.',
    ],
    cards: [
      { front: 'Spirometry finding that defines obstruction?', back: 'FEV1 to FVC ratio below 0.7' },
      { front: 'Two interventions that improve COPD survival?', back: 'Smoking cessation and long term oxygen for significant hypoxemia' },
      { front: 'Why is a normal PaCO2 worrying in acute asthma?', back: 'The patient should be hyperventilating. Normal PaCO2 means fatigue and looming failure' },
    ],
    related: ['pe', 'pneumonia'],
    keywords: ['asthma', 'COPD', 'emphysema', 'bronchitis', 'spirometry', 'wheeze', 'FEV1'],
  },
  {
    id: 'pe',
    title: 'Pulmonary Embolism',
    system: 'pulm',
    disciplines: ['pathology', 'clinical'],
    exams: [...CLIN],
    summary:
      'A PE is a clot, usually from a deep leg vein, that lodges in the pulmonary arteries. It causes V/Q mismatch, hypoxemia, and in large cases right heart failure.',
    sections: [
      {
        heading: 'Risk factors (Virchow triad)',
        bullets: ['Stasis like immobility, long flights, surgery', 'Endothelial injury', 'Hypercoagulability like cancer, pregnancy, estrogen, factor V Leiden'],
      },
      {
        heading: 'Presentation',
        bullets: ['Sudden dyspnea and pleuritic chest pain', 'Tachycardia, tachypnea, hypoxemia', 'Hemoptysis, unilateral leg swelling', 'Syncope or shock in massive PE'],
      },
      {
        heading: 'Diagnosis',
        bullets: [
          'Assess pretest probability with Wells or PERC',
          'Low probability means D dimer. A negative result rules out PE',
          'High probability goes straight to CT pulmonary angiography',
          'Use V/Q scan when contrast is contraindicated',
          'ECG most often shows sinus tachycardia. S1Q3T3 is classic but uncommon',
        ],
      },
      {
        heading: 'Treatment',
        bullets: [
          'Anticoagulate with a DOAC or low molecular weight heparin',
          'Massive PE with hypotension gets systemic thrombolysis',
          'IVC filter only if anticoagulation is contraindicated',
        ],
      },
    ],
    highYield: [
      'Respiratory alkalosis with hypoxemia and a clear chest film is a classic PE pattern.',
      'Start anticoagulation before imaging if suspicion is high and bleeding risk is low.',
      'Use LMWH in pregnancy and cancer associated thrombosis in many cases. Warfarin is teratogenic.',
    ],
    cards: [
      { front: 'Imaging of choice for suspected PE?', back: 'CT pulmonary angiography' },
      { front: 'Classic but uncommon ECG finding in PE?', back: 'S1Q3T3 (deep S in I, Q wave and inverted T in III)' },
      { front: 'Most common ECG finding in PE?', back: 'Sinus tachycardia' },
    ],
    related: ['asthma-copd'],
    keywords: ['PE', 'DVT', 'embolism', 'D dimer', 'Wells', 'dyspnea', 'VTE'],
  },
];
