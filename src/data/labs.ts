import type { LabValue } from './types';

export const LABS: LabValue[] = [
  // Electrolytes
  { name: 'Sodium (Na)', category: 'Electrolytes', range: '135 to 145 mEq/L', high: 'Dehydration, diabetes insipidus, hypertonic saline', low: 'SIADH, heart failure, cirrhosis, thiazides, psychogenic polydipsia' },
  { name: 'Potassium (K)', category: 'Electrolytes', range: '3.5 to 5.0 mEq/L', high: 'Kidney failure, ACE inhibitors, spironolactone, DKA, rhabdomyolysis, hemolyzed sample', low: 'Vomiting, diarrhea, loop and thiazide diuretics, insulin, hyperaldosteronism' },
  { name: 'Chloride (Cl)', category: 'Electrolytes', range: '95 to 105 mEq/L', high: 'Normal gap metabolic acidosis, saline infusion', low: 'Vomiting, metabolic alkalosis' },
  { name: 'Bicarbonate (HCO3)', category: 'Electrolytes', range: '22 to 28 mEq/L', high: 'Metabolic alkalosis, compensation for respiratory acidosis', low: 'Metabolic acidosis, compensation for respiratory alkalosis' },
  { name: 'Calcium, total', category: 'Electrolytes', range: '8.5 to 10.5 mg/dL', high: 'Hyperparathyroidism, malignancy, sarcoidosis, thiazides, vitamin D excess', low: 'Hypoparathyroidism, vitamin D deficiency, CKD, pancreatitis, low albumin' },
  { name: 'Magnesium', category: 'Electrolytes', range: '1.7 to 2.2 mg/dL', high: 'Kidney failure, magnesium therapy for preeclampsia', low: 'Alcohol use, diarrhea, PPIs, diuretics. Makes hypokalemia hard to correct' },
  { name: 'Phosphate', category: 'Electrolytes', range: '2.5 to 4.5 mg/dL', high: 'CKD, tumor lysis, hypoparathyroidism', low: 'Refeeding syndrome, hyperparathyroidism, DKA treatment' },
  // Renal
  { name: 'BUN', category: 'Renal', range: '7 to 20 mg/dL', high: 'Prerenal AKI, GI bleed, high protein intake, steroids', low: 'Liver failure, malnutrition, SIADH' },
  { name: 'Creatinine', category: 'Renal', range: '0.6 to 1.2 mg/dL', high: 'AKI, CKD, rhabdomyolysis, high muscle mass', low: 'Low muscle mass, pregnancy' },
  { name: 'eGFR', category: 'Renal', range: 'Above 90 mL/min/1.73m2', high: 'Hyperfiltration in early diabetes and pregnancy', low: 'CKD stage by GFR: 60 to 89 stage 2, 30 to 59 stage 3, 15 to 29 stage 4, below 15 stage 5' },
  // Liver
  { name: 'AST', category: 'Liver', range: '10 to 40 U/L', high: 'Hepatitis, alcohol (AST to ALT above 2), muscle injury, MI', low: 'Not clinically important' },
  { name: 'ALT', category: 'Liver', range: '7 to 56 U/L', high: 'Viral hepatitis, fatty liver, drug injury. More liver specific than AST', low: 'Not clinically important' },
  { name: 'Alkaline phosphatase', category: 'Liver', range: '44 to 147 U/L', high: 'Cholestasis, bone disease (Paget, metastases), pregnancy, growing children', low: 'Hypophosphatasia, Wilson disease with hemolysis' },
  { name: 'Total bilirubin', category: 'Liver', range: '0.1 to 1.2 mg/dL', high: 'Hemolysis and Gilbert (indirect). Obstruction and hepatitis (direct)', low: 'Not clinically important' },
  { name: 'Albumin', category: 'Liver', range: '3.5 to 5.5 g/dL', high: 'Dehydration', low: 'Cirrhosis, nephrotic syndrome, malnutrition, inflammation' },
  { name: 'Lipase', category: 'Liver', range: '0 to 160 U/L', high: 'Pancreatitis (3 times normal), kidney failure', low: 'Chronic pancreatitis with gland burnout' },
  // Heme
  { name: 'Hemoglobin', category: 'Hematology', range: 'Men 13.5 to 17.5, women 12 to 16 g/dL', high: 'Polycythemia vera, hypoxia, smoking, dehydration', low: 'Anemia from blood loss, low production, or hemolysis' },
  { name: 'MCV', category: 'Hematology', range: '80 to 100 fL', high: 'B12 or folate deficiency, alcohol, liver disease, hypothyroidism', low: 'Iron deficiency, thalassemia, chronic disease, sideroblastic anemia' },
  { name: 'WBC', category: 'Hematology', range: '4,500 to 11,000 /uL', high: 'Infection, steroids, leukemia, stress', low: 'Chemotherapy, viral infection, aplastic anemia, drugs like clozapine' },
  { name: 'Platelets', category: 'Hematology', range: '150,000 to 400,000 /uL', high: 'Iron deficiency, inflammation, essential thrombocythemia', low: 'ITP, TTP, HIT, DIC, marrow failure, splenic sequestration' },
  { name: 'Reticulocyte count', category: 'Hematology', range: '0.5% to 1.5%', high: 'Hemolysis, recovery from bleeding', low: 'Marrow failure, nutrient deficiency, CKD' },
  { name: 'Ferritin', category: 'Hematology', range: 'Men 24 to 336, women 11 to 307 ng/mL', high: 'Hemochromatosis, inflammation (acute phase reactant), Still disease', low: 'Iron deficiency (most specific test)' },
  { name: 'PT / INR', category: 'Hematology', range: 'PT 11 to 15 s, INR 0.8 to 1.2', high: 'Warfarin, liver disease, vitamin K deficiency, DIC', low: 'Not clinically important' },
  { name: 'aPTT', category: 'Hematology', range: '25 to 40 s', high: 'Heparin, hemophilia A or B, von Willebrand disease, lupus anticoagulant', low: 'Not clinically important' },
  { name: 'D dimer', category: 'Hematology', range: 'Below 0.5 ug/mL FEU', high: 'VTE, DIC, pregnancy, surgery, cancer, infection', low: 'Helps rule out VTE when pretest probability is low' },
  // Endo
  { name: 'Glucose, fasting', category: 'Endocrine', range: '70 to 99 mg/dL', high: 'Diabetes (126 or higher), stress, steroids', low: 'Insulin or sulfonylurea excess, insulinoma, adrenal insufficiency' },
  { name: 'HbA1c', category: 'Endocrine', range: 'Below 5.7%', high: '5.7% to 6.4% is prediabetes, 6.5% or higher is diabetes', low: 'Falsely low with hemolysis or recent transfusion' },
  { name: 'TSH', category: 'Endocrine', range: '0.4 to 4.0 mU/L', high: 'Primary hypothyroidism', low: 'Primary hyperthyroidism, central hypothyroidism' },
  { name: 'Free T4', category: 'Endocrine', range: '0.8 to 1.8 ng/dL', high: 'Hyperthyroidism', low: 'Hypothyroidism' },
  { name: 'Cortisol, morning', category: 'Endocrine', range: '5 to 23 ug/dL', high: 'Cushing syndrome, stress', low: 'Adrenal insufficiency' },
  // Cardiac
  { name: 'Troponin (hs)', category: 'Cardiac', range: 'Below 14 ng/L (assay dependent)', high: 'MI, myocarditis, PE, sepsis, CKD, heart failure', low: 'Normal' },
  { name: 'BNP', category: 'Cardiac', range: 'Below 100 pg/mL', high: 'Heart failure, PE, CKD', low: 'Falsely low in obesity. Normal BNP helps rule out HF' },
  { name: 'LDL cholesterol', category: 'Cardiac', range: 'Below 100 mg/dL (goal varies)', high: 'Familial hypercholesterolemia, hypothyroidism, nephrotic syndrome', low: 'Statin therapy, malnutrition, hyperthyroidism' },
  // ABG
  { name: 'pH (arterial)', category: 'Blood gas', range: '7.35 to 7.45', high: 'Alkalemia', low: 'Acidemia' },
  { name: 'PaCO2', category: 'Blood gas', range: '35 to 45 mm Hg', high: 'Hypoventilation, COPD, opioid overdose', low: 'Hyperventilation, PE, anxiety, early salicylate toxicity' },
  { name: 'PaO2', category: 'Blood gas', range: '75 to 100 mm Hg', high: 'Supplemental oxygen', low: 'V/Q mismatch, shunt, hypoventilation, diffusion defect, altitude' },
  { name: 'Lactate', category: 'Blood gas', range: '0.5 to 2.0 mmol/L', high: 'Sepsis, shock, ischemia, metformin, seizures', low: 'Not clinically important' },
  // CSF and urine
  { name: 'CSF glucose', category: 'CSF and urine', range: '40 to 70 mg/dL (about 2/3 of serum)', high: 'High serum glucose', low: 'Bacterial, fungal, or TB meningitis' },
  { name: 'CSF protein', category: 'CSF and urine', range: '15 to 45 mg/dL', high: 'Meningitis, Guillain Barre (with normal cells), tumors', low: 'Not clinically important' },
  { name: 'Urine specific gravity', category: 'CSF and urine', range: '1.005 to 1.030', high: 'Dehydration, SIADH', low: 'Diabetes insipidus, overhydration, ATN (fixed at 1.010)' },
  { name: 'Urine protein to creatinine', category: 'CSF and urine', range: 'Below 0.2', high: 'Above 3.5 is nephrotic range', low: 'Normal' },
];

export const LAB_CATEGORIES = Array.from(new Set(LABS.map((l) => l.category)));
