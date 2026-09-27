import type { Article } from '../types';

const CLIN = ['STEP1', 'STEP2', 'STEP3', 'COMLEX', 'PANCE', 'NCLEX'] as const;

export const moreArticles: Article[] = [
  {
    id: 'anemia',
    title: 'Anemia Approach',
    system: 'heme',
    disciplines: ['pathology', 'physiology', 'clinical'],
    exams: ['MCAT', ...CLIN],
    summary: 'Sort anemia by MCV into microcytic, normocytic, and macrocytic. Then use the reticulocyte count and iron studies to narrow it down.',
    sections: [
      {
        heading: 'Microcytic (MCV below 80)',
        bullets: ['Iron deficiency: low ferritin, high TIBC', 'Anemia of chronic disease: high ferritin, low TIBC', 'Thalassemia: normal iron studies, target cells, Mentzer index below 13', 'Sideroblastic anemia: ringed sideroblasts, lead poisoning, B6 deficiency'],
      },
      {
        heading: 'Normocytic (MCV 80 to 100)',
        bullets: ['Low retic: chronic disease, kidney disease, aplastic anemia', 'High retic means hemolysis or bleeding', 'Hemolysis: high LDH, high indirect bilirubin, low haptoglobin'],
      },
      {
        heading: 'Macrocytic (MCV above 100)',
        bullets: ['Megaloblastic: B12 or folate deficiency with hypersegmented neutrophils', 'B12 deficiency causes neuro findings and high methylmalonic acid', 'Nonmegaloblastic: alcohol, liver disease, hypothyroidism'],
      },
    ],
    highYield: [
      'Ferritin is the single best test for iron deficiency.',
      'Iron deficiency anemia in an older adult means colon cancer until proven otherwise.',
      'Giving folate alone to a B12 deficient patient fixes the anemia but not the neuro damage.',
    ],
    tables: [
      {
        title: 'Iron studies',
        headers: ['Condition', 'Ferritin', 'TIBC', 'Serum iron'],
        rows: [
          ['Iron deficiency', 'Low', 'High', 'Low'],
          ['Chronic disease', 'High', 'Low', 'Low'],
          ['Hemochromatosis', 'High', 'Low', 'High'],
          ['Thalassemia', 'Normal', 'Normal', 'Normal'],
        ],
      },
    ],
    cards: [
      { front: 'Best single test for iron deficiency?', back: 'Serum ferritin' },
      { front: 'Lab that separates B12 from folate deficiency?', back: 'Methylmalonic acid (high only in B12 deficiency)' },
      { front: 'Hemolysis labs?', back: 'High LDH, high indirect bilirubin, low haptoglobin, high retic count' },
    ],
    related: ['sickle-cell'],
    keywords: ['anemia', 'MCV', 'ferritin', 'iron', 'B12', 'folate', 'hemolysis'],
  },
  {
    id: 'sickle-cell',
    title: 'Sickle Cell Disease',
    system: 'heme',
    disciplines: ['biochem', 'pathology', 'clinical'],
    exams: ['MCAT', ...CLIN],
    summary: 'A point mutation (glutamic acid to valine at position 6 of beta globin) makes HbS, which polymerizes when deoxygenated and sickles red cells.',
    sections: [
      {
        heading: 'Complications',
        bullets: [
          'Vaso occlusive pain crises',
          'Acute chest syndrome: new infiltrate plus chest pain, fever, or hypoxia. Leading cause of death',
          'Autosplenectomy raises risk of encapsulated organisms (S. pneumoniae, H. influenzae)',
          'Aplastic crisis from parvovirus B19',
          'Salmonella osteomyelitis, stroke, priapism, avascular necrosis of the hip',
        ],
      },
      {
        heading: 'Management',
        bullets: ['Hydroxyurea raises fetal hemoglobin (HbF)', 'Pain control, fluids, oxygen if hypoxic', 'Transfusion or exchange transfusion for acute chest syndrome and stroke', 'Penicillin prophylaxis until age 5 and full vaccination'],
      },
    ],
    highYield: [
      'Sickle cell trait protects against Plasmodium falciparum malaria.',
      'Howell Jolly bodies on smear show asplenia.',
      'Sickle cell trait can cause renal papillary necrosis and isosthenuria.',
    ],
    cards: [
      { front: 'Mutation in sickle cell disease?', back: 'Glutamic acid replaced by valine at position 6 of beta globin' },
      { front: 'How does hydroxyurea help sickle cell disease?', back: 'It increases fetal hemoglobin (HbF)' },
      { front: 'Virus that causes aplastic crisis in sickle cell disease?', back: 'Parvovirus B19' },
    ],
    related: ['anemia'],
    keywords: ['sickle cell', 'HbS', 'hydroxyurea', 'acute chest', 'vaso occlusive'],
  },
  {
    id: 'meningitis',
    title: 'Bacterial Meningitis',
    system: 'id',
    disciplines: ['micro', 'clinical'],
    exams: [...CLIN],
    summary: 'Meningitis is inflammation of the meninges. Bacterial meningitis is an emergency. Give antibiotics without delay.',
    sections: [
      {
        heading: 'Common organisms by age',
        bullets: ['Neonates: group B strep, E. coli, Listeria', 'Children and adults: S. pneumoniae, N. meningitidis', 'Over 50 or immunocompromised: add Listeria'],
      },
      {
        heading: 'Presentation',
        bullets: ['Fever, headache, neck stiffness, altered mental status', 'Petechial or purpuric rash suggests meningococcus', 'Kernig and Brudzinski signs are specific but not sensitive'],
      },
      {
        heading: 'Management',
        bullets: [
          'Blood cultures, then empiric antibiotics right away',
          'CT before LP only if focal deficits, papilledema, seizure, immunocompromise, or altered mentation',
          'Adults: vancomycin plus ceftriaxone, add ampicillin if over 50',
          'Dexamethasone before or with the first antibiotic dose for suspected pneumococcus',
          'Close contacts of meningococcal disease get rifampin, ciprofloxacin, or ceftriaxone',
        ],
      },
    ],
    highYield: [
      'Bacterial CSF: high neutrophils, low glucose, high protein, high opening pressure.',
      'Viral CSF: lymphocytes, normal glucose, mildly high protein.',
      'Fungal or TB CSF: lymphocytes, low glucose, high protein.',
    ],
    tables: [
      {
        title: 'CSF patterns',
        headers: ['Type', 'Cells', 'Glucose', 'Protein'],
        rows: [
          ['Bacterial', 'Neutrophils', 'Low', 'High'],
          ['Viral', 'Lymphocytes', 'Normal', 'Normal or mildly high'],
          ['Fungal or TB', 'Lymphocytes', 'Low', 'High'],
        ],
      },
    ],
    cards: [
      { front: 'Empiric meningitis therapy in a 60 year old?', back: 'Vancomycin, ceftriaxone, and ampicillin (for Listeria)' },
      { front: 'CSF glucose in bacterial meningitis?', back: 'Low' },
      { front: 'When do you give dexamethasone in meningitis?', back: 'Before or with the first antibiotic dose' },
    ],
    related: ['pneumonia'],
    keywords: ['meningitis', 'CSF', 'lumbar puncture', 'neck stiffness', 'fever', 'headache'],
  },
  {
    id: 'pneumonia',
    title: 'Community Acquired Pneumonia',
    system: 'id',
    disciplines: ['micro', 'clinical', 'pharmacology'],
    exams: [...CLIN],
    summary: 'Pneumonia is infection of the lung parenchyma. S. pneumoniae is the most common bacterial cause of community acquired pneumonia.',
    sections: [
      {
        heading: 'Organisms',
        bullets: ['Typical: S. pneumoniae (rusty sputum), H. influenzae, Moraxella', 'Atypical: Mycoplasma, Chlamydophila, Legionella', 'Legionella: hyponatremia, diarrhea, high fever, water systems', 'Klebsiella: alcohol use, currant jelly sputum', 'Staph aureus: after influenza, cavitation'],
      },
      {
        heading: 'Severity',
        bullets: ['CURB 65 score: Confusion, Urea above 19, RR 30 or more, BP below 90/60, age 65 or older', '0 to 1 outpatient, 2 consider admission, 3 or more consider ICU'],
      },
      {
        heading: 'Treatment',
        bullets: [
          'Healthy outpatient: amoxicillin or doxycycline',
          'Outpatient with comorbidities: amoxicillin clavulanate plus a macrolide, or a respiratory fluoroquinolone',
          'Inpatient: ceftriaxone plus azithromycin, or a respiratory fluoroquinolone',
        ],
      },
    ],
    highYield: [
      'Lobar consolidation with air bronchograms is typical of pneumococcus.',
      'Aspiration pneumonia favors the right lower lobe in upright patients.',
      'Repeat chest imaging in 6 to 8 weeks for smokers over 50 to exclude cancer.',
    ],
    cards: [
      { front: 'Most common cause of CAP?', back: 'Streptococcus pneumoniae' },
      { front: 'Pneumonia with hyponatremia and diarrhea?', back: 'Legionella' },
      { front: 'What is CURB 65?', back: 'Confusion, Urea above 19, RR 30 or more, low BP, age 65 or older' },
    ],
    related: ['asthma-copd', 'meningitis'],
    keywords: ['pneumonia', 'CAP', 'cough', 'fever', 'consolidation', 'CURB65'],
  },
  {
    id: 'gout-ra',
    title: 'Arthritis: Gout, RA, and OA',
    system: 'msk',
    disciplines: ['pathology', 'clinical', 'pharmacology'],
    exams: [...CLIN],
    summary: 'Joint fluid analysis and pattern of involvement separate the common arthritides.',
    sections: [
      {
        heading: 'Gout',
        bullets: ['Monosodium urate crystals: needle shaped and negatively birefringent (yellow when parallel)', 'Classic first MTP joint (podagra)', 'Acute: NSAIDs, colchicine, or steroids', 'Chronic: allopurinol or febuxostat to target urate below 6'],
      },
      {
        heading: 'Pseudogout',
        bullets: ['Calcium pyrophosphate crystals: rhomboid and positively birefringent', 'Knee is classic. Chondrocalcinosis on film', 'Associated with hemochromatosis, hyperparathyroidism'],
      },
      {
        heading: 'Rheumatoid arthritis',
        bullets: ['Symmetric small joint polyarthritis (MCP, PIP), spares DIP', 'Morning stiffness over 1 hour', 'Anti CCP is most specific', 'Methotrexate is first line'],
      },
      {
        heading: 'Osteoarthritis',
        bullets: ['Wear and tear, DIP (Heberden nodes) and PIP (Bouchard nodes)', 'Stiffness under 30 minutes, worse with use', 'Joint space narrowing, osteophytes, subchondral sclerosis'],
      },
    ],
    highYield: [
      'Never stop allopurinol during a flare. Starting it during a flare is fine if you cover with colchicine or an NSAID.',
      'Septic arthritis: synovial WBC above 50,000. Always rule it out in a hot joint.',
      'Check for HLA B*58:01 before allopurinol in high risk populations.',
    ],
    cards: [
      { front: 'Gout crystal appearance?', back: 'Needle shaped, negatively birefringent' },
      { front: 'Most specific antibody for RA?', back: 'Anti cyclic citrullinated peptide (anti CCP)' },
      { front: 'Joint spared in rheumatoid arthritis?', back: 'DIP joints' },
    ],
    related: [],
    keywords: ['gout', 'arthritis', 'RA', 'osteoarthritis', 'joint pain', 'uric acid', 'pseudogout'],
  },
  {
    id: 'skin-cancer',
    title: 'Skin Cancer',
    system: 'derm',
    disciplines: ['pathology', 'clinical'],
    exams: [...CLIN],
    summary: 'The three main skin cancers are basal cell carcinoma, squamous cell carcinoma, and melanoma. Sun exposure is the biggest risk factor for all three.',
    sections: [
      {
        heading: 'Melanoma (ABCDE)',
        bullets: ['Asymmetry', 'Border irregularity', 'Color variation', 'Diameter above 6 mm', 'Evolution over time', 'Breslow depth is the most important prognostic factor', 'BRAF V600E mutation is common'],
      },
      {
        heading: 'Basal cell carcinoma',
        bullets: ['Most common skin cancer', 'Pearly papule with rolled borders and telangiectasias', 'Palisading nuclei on histology', 'Rarely metastasizes'],
      },
      {
        heading: 'Squamous cell carcinoma',
        bullets: ['Scaly, ulcerated nodule on sun exposed skin', 'Actinic keratosis is the precursor', 'Keratin pearls on histology', 'Higher risk with immunosuppression (transplant)'],
      },
    ],
    highYield: [
      'Excisional biopsy with narrow margins for any suspected melanoma. Avoid shave biopsy.',
      'Marjolin ulcer is SCC arising in a chronic wound or burn scar.',
      'Mohs surgery is used for cancers on the face.',
    ],
    cards: [
      { front: 'Most important prognostic factor in melanoma?', back: 'Breslow depth (tumor thickness)' },
      { front: 'Histology of basal cell carcinoma?', back: 'Palisading nuclei' },
      { front: 'Precursor lesion of SCC?', back: 'Actinic keratosis' },
    ],
    related: [],
    keywords: ['melanoma', 'skin cancer', 'BCC', 'SCC', 'mole', 'ABCDE'],
  },
  {
    id: 'mood',
    title: 'Depression and Bipolar Disorder',
    system: 'psych',
    disciplines: ['clinical', 'pharmacology'],
    exams: ['MCAT', ...CLIN],
    summary: 'Major depressive disorder needs 5 of 9 symptoms for 2 weeks. Bipolar I needs at least one manic episode.',
    sections: [
      {
        heading: 'Major depression (SIG E CAPS)',
        bullets: ['Depressed mood or anhedonia must be present', 'Sleep change, Interest loss, Guilt, Energy loss, Concentration trouble, Appetite change, Psychomotor change, Suicidality', 'First line: SSRIs plus psychotherapy'],
      },
      {
        heading: 'Mania (DIG FAST)',
        bullets: ['Distractibility, Impulsivity, Grandiosity, Flight of ideas, Activity increase, Sleep need decreased, Talkativeness', 'Mania lasts 1 week or needs hospitalization. Hypomania lasts 4 days without major impairment', 'Treat with lithium, valproate, or atypical antipsychotics'],
      },
      {
        heading: 'Lithium',
        bullets: ['Narrow therapeutic window', 'Toxicity: tremor, ataxia, confusion, vomiting', 'Adverse effects: nephrogenic diabetes insipidus, hypothyroidism, Ebstein anomaly in pregnancy', 'Thiazides, NSAIDs, and ACE inhibitors raise levels'],
      },
    ],
    highYield: [
      'Antidepressants alone can trigger mania in bipolar disorder. Screen before starting.',
      'Serotonin syndrome: clonus, hyperreflexia, hyperthermia. Treat with cyproheptadine.',
      'Lithium lowers suicide risk.',
    ],
    cards: [
      { front: 'Duration of symptoms for major depression?', back: 'At least 2 weeks' },
      { front: 'Two classic lithium side effects?', back: 'Nephrogenic diabetes insipidus and hypothyroidism' },
      { front: 'Antidote for serotonin syndrome?', back: 'Cyproheptadine' },
    ],
    related: [],
    keywords: ['depression', 'bipolar', 'mania', 'SSRI', 'lithium', 'suicide', 'mood'],
  },
  {
    id: 'preeclampsia',
    title: 'Hypertension in Pregnancy',
    system: 'obgyn',
    disciplines: ['clinical', 'pathology'],
    exams: [...CLIN],
    summary: 'Preeclampsia is new hypertension after 20 weeks with proteinuria or end organ damage. The only cure is delivery.',
    sections: [
      {
        heading: 'Definitions',
        bullets: [
          'Gestational hypertension: BP 140/90 or higher after 20 weeks, no proteinuria',
          'Preeclampsia: adds proteinuria or end organ dysfunction',
          'Severe features: BP 160/110 or higher, platelets below 100k, doubled LFTs, creatinine above 1.1, pulmonary edema, headache, visual changes',
          'Eclampsia: preeclampsia plus seizures',
          'HELLP: Hemolysis, Elevated Liver enzymes, Low Platelets',
        ],
      },
      {
        heading: 'Management',
        bullets: ['Deliver at 37 weeks without severe features, at 34 weeks with severe features', 'Magnesium sulfate for seizure prevention', 'Labetalol, hydralazine, or nifedipine for severe BP', 'Low dose aspirin from 12 weeks prevents preeclampsia in high risk patients'],
      },
    ],
    highYield: [
      'Magnesium toxicity: lost reflexes first, then respiratory depression. Antidote is calcium gluconate.',
      'Abnormal placental spiral artery remodeling drives preeclampsia.',
      'Hypertension before 20 weeks suggests molar pregnancy.',
    ],
    cards: [
      { front: 'Drug to prevent eclamptic seizures?', back: 'Magnesium sulfate' },
      { front: 'Antidote for magnesium toxicity?', back: 'Calcium gluconate' },
      { front: 'What does HELLP stand for?', back: 'Hemolysis, Elevated Liver enzymes, Low Platelets' },
    ],
    related: ['ectopic'],
    keywords: ['preeclampsia', 'eclampsia', 'pregnancy', 'hypertension', 'HELLP', 'magnesium'],
  },
  {
    id: 'ectopic',
    title: 'Ectopic Pregnancy',
    system: 'obgyn',
    disciplines: ['clinical'],
    exams: [...CLIN],
    summary: 'An ectopic pregnancy implants outside the uterine cavity, most often in the ampulla of the fallopian tube. Rupture is a surgical emergency.',
    sections: [
      {
        heading: 'Risk factors',
        bullets: ['Prior ectopic', 'PID or tubal surgery', 'IUD in place (lower overall risk but higher proportion ectopic)', 'Assisted reproduction, smoking'],
      },
      {
        heading: 'Diagnosis',
        bullets: ['Positive hCG plus no intrauterine pregnancy on transvaginal ultrasound', 'Discriminatory zone: an IUP should be visible when hCG is above about 3,500', 'hCG should rise at least 35% to 50% in 48 hours in a viable IUP'],
      },
      {
        heading: 'Treatment',
        bullets: ['Unstable: surgery right away', 'Stable, small, unruptured, hCG below 5,000, reliable follow up: methotrexate', 'Otherwise laparoscopic salpingostomy or salpingectomy', 'Rh negative mothers get anti D immune globulin'],
      },
    ],
    highYield: [
      'Every woman of reproductive age with abdominal pain needs a pregnancy test.',
      'Methotrexate is contraindicated with breastfeeding, liver or kidney disease, or rupture.',
    ],
    cards: [
      { front: 'Most common site of ectopic pregnancy?', back: 'Ampulla of the fallopian tube' },
      { front: 'Medical treatment for ectopic pregnancy?', back: 'Methotrexate' },
    ],
    related: ['preeclampsia'],
    keywords: ['ectopic', 'pregnancy', 'hCG', 'pelvic pain', 'vaginal bleeding'],
  },
  {
    id: 'milestones',
    title: 'Developmental Milestones',
    system: 'peds',
    disciplines: ['clinical'],
    exams: ['MCAT', ...CLIN],
    summary: 'Milestones track gross motor, fine motor, language, and social development. Know the big ones cold.',
    sections: [
      {
        heading: 'How to use them',
        paragraphs: ['Adjust for prematurity until age 2. Loss of a skill already gained (regression) is always a red flag.'],
      },
    ],
    tables: [
      {
        title: 'Key milestones',
        headers: ['Age', 'Motor', 'Language and social'],
        rows: [
          ['2 months', 'Lifts head when prone', 'Social smile, coos'],
          ['4 months', 'Rolls front to back', 'Laughs'],
          ['6 months', 'Sits with support', 'Babbles, stranger anxiety begins'],
          ['9 months', 'Crawls, pincer grasp starts', 'Mama and dada nonspecific, waves bye'],
          ['12 months', 'Walks, good pincer grasp', '1 to 2 words, separation anxiety'],
          ['2 years', 'Runs, kicks a ball, climbs stairs', '2 word phrases, 50 words, parallel play'],
          ['3 years', 'Rides tricycle, copies circle', '3 word sentences, knows gender'],
          ['4 years', 'Hops, copies cross', 'Tells stories, cooperative play'],
        ],
      },
    ],
    highYield: [
      'No words by 16 months or no 2 word phrases by 24 months needs evaluation.',
      'Hand preference before 12 months suggests weakness on the other side.',
      'Screen for autism at 18 and 24 months with M CHAT.',
    ],
    cards: [
      { front: 'Age of social smile?', back: '2 months' },
      { front: 'Age of independent walking?', back: 'About 12 months' },
      { front: 'Age a child rides a tricycle?', back: '3 years' },
    ],
    related: [],
    keywords: ['milestones', 'development', 'pediatrics', 'walking', 'language', 'autism'],
  },
];
