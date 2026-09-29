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
};
