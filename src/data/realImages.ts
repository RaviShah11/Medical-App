// Real images from Wikimedia Commons. Generated list, keep credits accurate.
import type { ImageSourcePropType } from 'react-native';

export interface RealImage {
  source: ImageSourcePropType;
  width: number;
  height: number;
  author: string;
  license: string;
  page: string;
}

export const REAL_IMAGES: Record<string, RealImage> = {
  'ecg-normal': { source: require('../../assets/imaging/ecg-normal.jpg'), width: 1040, height: 407, author: "MoodyGroove", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:12_lead_ECG_of_a_26_year_old_male.jpg" },
  'ecg-afib': { source: require('../../assets/imaging/ecg-afib.jpg'), width: 1280, height: 595, author: "Ewingdo", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:ECG_Atrial_Fibrillation_98_bpm.jpg" },
  'ecg-chb': { source: require('../../assets/imaging/ecg-chb.jpg'), width: 1280, height: 624, author: "James Heilman, MD", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:CompleteHeartBlock.jpg" },
  'ecg-hyperk': { source: require('../../assets/imaging/ecg-hyperk.jpg'), width: 1158, height: 893, author: "Michael-Joseph F. Agbayani and Eddieson Gonzales", license: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Hyperkalemia_ECG.jpg" },
  'ecg-anterior-stemi': { source: require('../../assets/imaging/ecg-anterior-stemi.jpg'), width: 1280, height: 752, author: "Displaced", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:12_Lead_EKG_ST_Elevation_tracing_only.jpg" },
  'ecg-inferior-stemi': { source: require('../../assets/imaging/ecg-inferior-stemi.jpg'), width: 1280, height: 630, author: "Andrewmeyerson", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:ST_Segment_Elevation_Myocardial_Infarction_Unlabeled.jpg" },
  'cxr-normal': { source: require('../../assets/imaging/cxr-normal.jpg'), width: 960, height: 1098, author: "Mikael H\u00e4ggstr\u00f6m", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Normal_posteroanterior_(PA)_chest_radiograph_(X-ray).jpg" },
  'cxr-chf': { source: require('../../assets/imaging/cxr-chf.jpg'), width: 960, height: 862, author: "Mikael H\u00e4ggstr\u00f6m", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Chest_radiograph_of_a_lung_with_Kerley_B_lines.jpg" },
  'cxr-pneumothorax': { source: require('../../assets/imaging/cxr-pneumothorax.jpg'), width: 960, height: 883, author: "Clinical Cases (Wikimedia Commons user)", license: "CC BY-SA 2.5", page: "https://commons.wikimedia.org/wiki/File:Pneumothorax_CXR.jpg" },
  'cxr-pneumonia': { source: require('../../assets/imaging/cxr-pneumonia.jpg'), width: 960, height: 790, author: "Malvinder S. Parmar, BMC Infectious Diseases 2005", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:X-ray_lung_consolidation.jpg" },
  'ct-epidural': { source: require('../../assets/imaging/ct-epidural.jpg'), width: 960, height: 1179, author: "James Heilman, MD", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:EpiduralHematoma.jpg" },
  'derm-melanoma': { source: require('../../assets/imaging/derm-melanoma.jpg'), width: 960, height: 668, author: "Unknown author", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Melanoma.jpg" },
  'derm-bcc': { source: require('../../assets/imaging/derm-bcc.jpg'), width: 960, height: 639, author: "Unknown author", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma.jpg" },
  'smear-megaloblastic': { source: require('../../assets/imaging/smear-megaloblastic.jpg'), width: 960, height: 802, author: "Ed Uthman from Houston, TX, USA", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Hypersegmented_neutrophil.jpg" },
  'smear-sickle': { source: require('../../assets/imaging/smear-sickle.jpg'), width: 960, height: 1120, author: "NIDDK", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Sicklecells.jpg" },
};
