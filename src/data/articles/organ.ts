import type { Article } from '../types';

const CLIN = ['STEP1', 'STEP2', 'STEP3', 'COMLEX', 'PANCE', 'NCLEX'] as const;

export const organArticles: Article[] = [
  {
    id: 'aki',
    title: 'Acute Kidney Injury',
    system: 'renal',
    disciplines: ['physiology', 'pathology', 'clinical'],
    exams: [...CLIN],
    summary:
      'AKI is a rise in creatinine of 0.3 mg/dL within 48 hours, a 1.5 fold rise within 7 days, or urine output below 0.5 mL/kg/h for 6 hours. Sort it into prerenal, intrinsic, and postrenal causes.',
    sections: [
      {
        heading: 'Prerenal',
        bullets: ['Low perfusion from volume loss, heart failure, cirrhosis, NSAIDs, ACE inhibitors', 'BUN to creatinine ratio above 20', 'FENa below 1%, urine osmolality above 500', 'Bland urine sediment or hyaline casts'],
      },
      {
        heading: 'Intrinsic',
        bullets: [
          'Acute tubular necrosis from ischemia or toxins (aminoglycosides, contrast, myoglobin). Muddy brown granular casts, FENa above 2%',
          'Acute interstitial nephritis from drugs (penicillins, PPIs, NSAIDs). Fever, rash, eosinophilia, WBC casts',
          'Glomerulonephritis gives RBC casts, hematuria, hypertension',
        ],
      },
      {
        heading: 'Postrenal',
        bullets: ['Obstruction from BPH, stones, tumors', 'Bilateral hydronephrosis on ultrasound', 'Treat with a Foley catheter or nephrostomy'],
      },
      {
        heading: 'Indications for urgent dialysis (AEIOU)',
        bullets: ['Acidosis that is refractory', 'Electrolytes, mainly hyperkalemia that does not respond', 'Ingestions like lithium, methanol, ethylene glycol, salicylates', 'Overload of fluid', 'Uremia with pericarditis or encephalopathy'],
      },
    ],
    highYield: [
      'FENa is unreliable on diuretics. Use FEUrea below 35% for prerenal instead.',
      'Rhabdomyolysis shows a positive urine dipstick for blood with no RBCs on microscopy.',
      'Ethylene glycol causes calcium oxalate crystals and AKI.',
    ],
    tables: [
      {
        title: 'Prerenal vs ATN',
        headers: ['Test', 'Prerenal', 'ATN'],
        rows: [
          ['BUN to Cr', 'Above 20', 'Below 15'],
          ['FENa', 'Below 1%', 'Above 2%'],
          ['Urine osm', 'Above 500', 'Below 350'],
          ['Sediment', 'Hyaline casts', 'Muddy brown casts'],
        ],
      },
    ],
    cards: [
      { front: 'Urine cast in acute tubular necrosis?', back: 'Muddy brown granular casts' },
      { front: 'FENa in prerenal AKI?', back: 'Below 1%' },
      { front: 'Triad of acute interstitial nephritis?', back: 'Fever, rash, eosinophilia (plus WBC casts)' },
    ],
    related: ['acid-base'],
    keywords: ['AKI', 'creatinine', 'FENa', 'ATN', 'dialysis', 'kidney'],
  },
  {
    id: 'acid-base',
    title: 'Acid Base Disorders',
    system: 'renal',
    disciplines: ['physiology', 'clinical'],
    exams: ['MCAT', ...CLIN],
    summary:
      'Read an ABG in steps. Check pH, find the primary process, check compensation, and calculate the anion gap in any metabolic acidosis.',
    sections: [
      {
        heading: 'Step by step',
        bullets: [
          'pH below 7.35 is acidemia. Above 7.45 is alkalemia',
          'If PaCO2 moves the same direction as pH, the problem is metabolic. If opposite, respiratory',
          'Winter formula for metabolic acidosis: expected PaCO2 = 1.5 x HCO3 + 8, plus or minus 2',
          'Anion gap = Na minus (Cl + HCO3). Normal is about 12',
          'In a high gap acidosis, check the delta ratio for a second hidden process',
        ],
      },
      {
        heading: 'High anion gap causes (MUDPILES)',
        bullets: ['Methanol', 'Uremia', 'DKA and other ketoacidosis', 'Propylene glycol', 'Iron, isoniazid', 'Lactic acidosis', 'Ethylene glycol', 'Salicylates'],
      },
      {
        heading: 'Normal anion gap causes (HARDASS)',
        bullets: ['Hyperalimentation', 'Addison disease', 'Renal tubular acidosis', 'Diarrhea', 'Acetazolamide', 'Spironolactone', 'Saline infusion'],
      },
      {
        heading: 'Metabolic alkalosis',
        bullets: ['Saline responsive (urine Cl below 20): vomiting, NG suction, diuretics (later)', 'Saline resistant (urine Cl above 20): hyperaldosteronism, Bartter, Gitelman, current diuretic use'],
      },
    ],
    highYield: [
      'Salicylate toxicity causes a mixed respiratory alkalosis and high gap metabolic acidosis.',
      'Correct the anion gap for albumin by adding 2.5 for each 1 g/dL drop below 4.',
      'Vomiting causes hypochloremic, hypokalemic metabolic alkalosis.',
    ],
    cards: [
      { front: 'Winter formula?', back: 'Expected PaCO2 = 1.5 x HCO3 + 8 (plus or minus 2)' },
      { front: 'Aspirin overdose acid base pattern?', back: 'Respiratory alkalosis plus high anion gap metabolic acidosis' },
      { front: 'Anion gap formula?', back: 'Na minus (Cl + HCO3)' },
    ],
    related: ['aki', 'diabetes'],
    keywords: ['ABG', 'anion gap', 'acidosis', 'alkalosis', 'MUDPILES', 'Winter'],
  },
  {
    id: 'stroke',
    title: 'Ischemic Stroke',
    system: 'neuro',
    disciplines: ['anatomy', 'clinical'],
    exams: [...CLIN],
    summary:
      'Ischemic stroke is sudden focal neurologic deficit from arterial occlusion. Time is brain. Rapid imaging decides who gets thrombolysis or thrombectomy.',
    sections: [
      {
        heading: 'Vascular syndromes',
        bullets: [
          'MCA: contralateral face and arm weakness greater than leg, aphasia if dominant hemisphere, neglect if nondominant',
          'ACA: contralateral leg weakness greater than arm, urinary incontinence',
          'PCA: contralateral homonymous hemianopia with macular sparing',
          'Lacunar: pure motor or pure sensory from small vessel disease (hypertension)',
          'PICA (lateral medullary): dysphagia, hoarseness, ipsilateral face and contralateral body pain loss, Horner',
        ],
      },
      {
        heading: 'Acute workup',
        bullets: ['Check glucose first. Hypoglycemia mimics stroke', 'Noncontrast CT head to exclude hemorrhage', 'CT angiography for large vessel occlusion'],
      },
      {
        heading: 'Treatment',
        bullets: [
          'IV alteplase or tenecteplase within 4.5 hours of last known well',
          'BP must be below 185/110 before thrombolysis',
          'Mechanical thrombectomy for large vessel occlusion up to 24 hours in selected patients',
          'Aspirin within 24 to 48 hours, statin, and address the source',
        ],
      },
    ],
    highYield: [
      'Early ischemic stroke often looks normal on CT. MRI diffusion weighted imaging catches it early.',
      'Permissive hypertension up to 220/120 if no thrombolysis is given.',
      'Carotid endarterectomy for symptomatic stenosis of 70% to 99%.',
    ],
    cards: [
      { front: 'Time window for IV thrombolysis in stroke?', back: '4.5 hours from last known well' },
      { front: 'MCA vs ACA stroke weakness pattern?', back: 'MCA: face and arm worse. ACA: leg worse' },
      { front: 'First test in suspected stroke?', back: 'Fingerstick glucose, then noncontrast CT head' },
    ],
    related: ['afib', 'intracranial-bleed'],
    keywords: ['stroke', 'CVA', 'tPA', 'MCA', 'aphasia', 'hemiparesis', 'TIA'],
  },
  {
    id: 'intracranial-bleed',
    title: 'Intracranial Hemorrhage',
    system: 'neuro',
    disciplines: ['anatomy', 'pathology', 'clinical'],
    exams: [...CLIN],
    summary:
      'Bleeding inside the skull is sorted by location. Each type has a classic cause, a classic CT shape, and a classic story.',
    sections: [
      {
        heading: 'Types',
        bullets: [
          'Epidural: middle meningeal artery tear after temporal bone fracture. Lens shaped (biconvex) and does not cross sutures. Lucid interval, then rapid decline',
          'Subdural: bridging vein tear. Crescent shaped and crosses sutures. Elderly, alcohol use, shaken babies',
          'Subarachnoid: ruptured berry aneurysm. Thunderclap "worst headache of my life." Blood in the cisterns',
          'Intraparenchymal: hypertension (basal ganglia, pons, thalamus) or amyloid angiopathy (lobar, elderly)',
        ],
      },
      {
        heading: 'Subarachnoid workup',
        bullets: ['Noncontrast CT first', 'If CT is negative and suspicion stays high, do a lumbar puncture for xanthochromia', 'Nimodipine prevents vasospasm, which peaks 4 to 12 days after the bleed'],
      },
    ],
    highYield: [
      'Berry aneurysms link to ADPKD, Ehlers Danlos, and Marfan syndrome.',
      'The most common berry aneurysm site is the anterior communicating artery.',
      'Charcot Bouchard microaneurysms cause hypertensive intraparenchymal bleeds.',
    ],
    cards: [
      { front: 'CT shape of an epidural hematoma?', back: 'Biconvex lens that does not cross suture lines' },
      { front: 'Vessel torn in a subdural hematoma?', back: 'Bridging veins' },
      { front: 'Drug that prevents vasospasm after SAH?', back: 'Nimodipine' },
    ],
    related: ['stroke'],
    keywords: ['epidural', 'subdural', 'subarachnoid', 'hemorrhage', 'aneurysm', 'headache', 'head trauma'],
  },
  {
    id: 'cirrhosis',
    title: 'Cirrhosis',
    system: 'gi',
    disciplines: ['pathology', 'clinical'],
    exams: [...CLIN],
    summary:
      'Cirrhosis is end stage fibrosis of the liver with regenerative nodules. It leads to portal hypertension and loss of liver function.',
    sections: [
      {
        heading: 'Common causes',
        bullets: ['Alcohol', 'MASLD (fatty liver from metabolic disease)', 'Hepatitis B and C', 'Hemochromatosis, Wilson disease, alpha 1 antitrypsin deficiency', 'Primary biliary cholangitis, primary sclerosing cholangitis'],
      },
      {
        heading: 'Complications',
        bullets: [
          'Ascites: check SAAG. A SAAG of 1.1 or more means portal hypertension',
          'Spontaneous bacterial peritonitis: ascitic PMNs 250 or more. Treat with ceftriaxone plus albumin',
          'Varices: screen with endoscopy. Nonselective beta blockers or banding',
          'Hepatic encephalopathy: lactulose, then rifaximin',
          'Hepatorenal syndrome and hepatocellular carcinoma',
        ],
      },
      {
        heading: 'Scoring',
        bullets: ['Child Pugh uses bilirubin, albumin, INR, ascites, encephalopathy', 'MELD uses bilirubin, INR, creatinine, sodium and ranks transplant priority'],
      },
    ],
    highYield: [
      'Screen for HCC with ultrasound every 6 months, with or without AFP.',
      'Acute variceal bleed: octreotide, ceftriaxone, and endoscopic banding within 12 hours.',
      'AST to ALT ratio above 2 suggests alcoholic liver disease.',
    ],
    cards: [
      { front: 'SAAG cutoff that means portal hypertension?', back: '1.1 g/dL or higher' },
      { front: 'Ascitic PMN count that diagnoses SBP?', back: '250 cells/uL or more' },
      { front: 'First line drug for hepatic encephalopathy?', back: 'Lactulose' },
    ],
    related: ['pancreatitis'],
    keywords: ['liver', 'cirrhosis', 'ascites', 'varices', 'MELD', 'jaundice', 'SBP'],
  },
  {
    id: 'pancreatitis',
    title: 'Acute Pancreatitis',
    system: 'gi',
    disciplines: ['pathology', 'clinical'],
    exams: [...CLIN],
    summary:
      'Acute pancreatitis is inflammation from premature activation of pancreatic enzymes. Gallstones and alcohol cause most cases.',
    sections: [
      {
        heading: 'Causes (I GET SMASHED)',
        bullets: ['Idiopathic', 'Gallstones', 'Ethanol', 'Trauma', 'Steroids', 'Mumps', 'Autoimmune', 'Scorpion sting', 'Hypertriglyceridemia, hypercalcemia', 'ERCP', 'Drugs like azathioprine, valproate, GLP 1 agonists'],
      },
      {
        heading: 'Diagnosis (2 of 3)',
        bullets: ['Epigastric pain radiating to the back', 'Lipase at least 3 times normal', 'Imaging findings on CT'],
      },
      {
        heading: 'Management',
        bullets: ['Aggressive but goal directed IV fluids with lactated Ringer', 'Pain control and early oral feeding', 'Cholecystectomy in the same admission for gallstone pancreatitis', 'ERCP only if cholangitis or ongoing obstruction'],
      },
    ],
    highYield: [
      'Cullen sign (periumbilical bruising) and Grey Turner sign (flank bruising) mean hemorrhagic pancreatitis.',
      'Pseudocysts form after 4 weeks and lack an epithelial lining.',
      'Hypocalcemia happens from fat saponification.',
    ],
    cards: [
      { front: 'Two most common causes of acute pancreatitis?', back: 'Gallstones and alcohol' },
      { front: 'Lipase threshold for diagnosis?', back: 'At least 3 times the upper limit of normal' },
      { front: 'Why does pancreatitis cause hypocalcemia?', back: 'Calcium binds free fatty acids (saponification)' },
    ],
    related: ['cirrhosis'],
    keywords: ['pancreatitis', 'lipase', 'epigastric pain', 'gallstones', 'alcohol'],
  },
  {
    id: 'diabetes',
    title: 'Diabetes Mellitus and DKA',
    system: 'endo',
    disciplines: ['biochem', 'physiology', 'pharmacology', 'clinical'],
    exams: ['MCAT', ...CLIN],
    summary:
      'Diabetes is chronic hyperglycemia from absent insulin (type 1) or insulin resistance with relative deficiency (type 2). DKA and HHS are the acute emergencies.',
    sections: [
      {
        heading: 'Diagnosis',
        bullets: ['Fasting glucose 126 mg/dL or higher', 'HbA1c 6.5% or higher', '2 hour OGTT glucose 200 or higher', 'Random glucose 200 or higher with symptoms'],
      },
      {
        heading: 'Type 2 treatment',
        bullets: [
          'Metformin first line plus lifestyle changes',
          'Add an SGLT2 inhibitor or GLP 1 agonist if the patient has ASCVD, heart failure, or CKD',
          'Insulin when A1c is very high or symptomatic hyperglycemia',
        ],
      },
      {
        heading: 'DKA',
        bullets: [
          'Glucose above 250, pH below 7.3, bicarbonate below 18, ketones present',
          'Kussmaul breathing, fruity breath, abdominal pain',
          'Treat with IV fluids, insulin infusion, and potassium replacement',
          'Do not start insulin if K is below 3.3. Replace potassium first',
          'Add dextrose when glucose falls below 250 and keep insulin going until the gap closes',
        ],
      },
      {
        heading: 'HHS',
        bullets: ['Usually type 2', 'Glucose often above 600, osmolality above 320', 'Minimal ketosis, profound dehydration, altered mental status'],
      },
    ],
    highYield: [
      'Total body potassium is low in DKA even when serum K looks normal or high.',
      'Metformin can cause lactic acidosis. Hold it with contrast in unstable renal function.',
      'SGLT2 inhibitors can cause euglycemic DKA and genital mycotic infections.',
    ],
    cards: [
      { front: 'Potassium level below which you hold insulin in DKA?', back: '3.3 mEq/L' },
      { front: 'First line drug for type 2 diabetes?', back: 'Metformin' },
      { front: 'A1c threshold that diagnoses diabetes?', back: '6.5% or higher' },
    ],
    related: ['acid-base', 'thyroid'],
    keywords: ['diabetes', 'DKA', 'HHS', 'insulin', 'metformin', 'glucose', 'A1c'],
  },
  {
    id: 'thyroid',
    title: 'Thyroid Disorders',
    system: 'endo',
    disciplines: ['physiology', 'pathology', 'clinical'],
    exams: ['MCAT', ...CLIN],
    summary:
      'TSH is the best screening test. High TSH with low T4 is primary hypothyroidism. Low TSH with high T4 is primary hyperthyroidism.',
    sections: [
      {
        heading: 'Hyperthyroidism',
        bullets: [
          'Graves disease: TSH receptor stimulating antibodies, diffuse goiter, exophthalmos, pretibial myxedema',
          'Toxic multinodular goiter and toxic adenoma: patchy or focal uptake on scan',
          'Subacute (de Quervain) thyroiditis: painful gland after a viral illness, low uptake',
          'Treat with beta blockers for symptoms, methimazole, radioactive iodine, or surgery',
        ],
      },
      {
        heading: 'Hypothyroidism',
        bullets: ['Hashimoto thyroiditis: anti TPO antibodies, most common in iodine sufficient areas', 'Fatigue, weight gain, cold intolerance, constipation, delayed reflexes', 'Treat with levothyroxine'],
      },
    ],
    highYield: [
      'Use propylthiouracil in the first trimester and thyroid storm. Methimazole is teratogenic early in pregnancy.',
      'Both methimazole and PTU can cause agranulocytosis. Check CBC with sore throat and fever.',
      'Hashimoto raises the risk of primary thyroid lymphoma.',
    ],
    cards: [
      { front: 'Best screening test for thyroid disease?', back: 'TSH' },
      { front: 'Antithyroid drug in the first trimester?', back: 'Propylthiouracil (PTU)' },
      { front: 'Antibody in Graves disease?', back: 'TSH receptor stimulating antibody (TSI)' },
    ],
    related: ['diabetes', 'afib'],
    keywords: ['thyroid', 'Graves', 'Hashimoto', 'TSH', 'hyperthyroid', 'hypothyroid'],
  },
];
