import { RhythmStrip, RHYTHM_SIZE, TWELVE_SIZE, TwelveLead } from './ecg';
import { BloodSmear, DERM_SIZE, SkinLesion, SMEAR_SIZE, Ultrasound, US_SIZE } from './micro';
import { ChestXray, CT_SIZE, CtHead, CXR_SIZE } from './xray';

type Size = { w: number; h: number };

const RENDERERS: Record<string, { size: Size; render: (width: number) => React.ReactElement }> = {
  'ecg-normal': { size: RHYTHM_SIZE, render: (w) => <RhythmStrip rhythm="normal" width={w} /> },
  'ecg-afib': { size: RHYTHM_SIZE, render: (w) => <RhythmStrip rhythm="afib" width={w} /> },
  'ecg-chb': { size: RHYTHM_SIZE, render: (w) => <RhythmStrip rhythm="chb" width={w} /> },
  'ecg-hyperk': { size: RHYTHM_SIZE, render: (w) => <RhythmStrip rhythm="hyperk" width={w} /> },
  'ecg-anterior-stemi': { size: TWELVE_SIZE, render: (w) => <TwelveLead stemi="anterior" width={w} /> },
  'ecg-inferior-stemi': { size: TWELVE_SIZE, render: (w) => <TwelveLead stemi="inferior" width={w} /> },
  'cxr-normal': { size: CXR_SIZE, render: (w) => <ChestXray variant="normal" width={w} /> },
  'cxr-pneumothorax': { size: CXR_SIZE, render: (w) => <ChestXray variant="pneumothorax" width={w} /> },
  'cxr-pneumonia': { size: CXR_SIZE, render: (w) => <ChestXray variant="pneumonia" width={w} /> },
  'cxr-chf': { size: CXR_SIZE, render: (w) => <ChestXray variant="chf" width={w} /> },
  'cxr-effusion': { size: CXR_SIZE, render: (w) => <ChestXray variant="effusion" width={w} /> },
  'ct-epidural': { size: CT_SIZE, render: (w) => <CtHead variant="epidural" width={w} /> },
  'ct-subdural': { size: CT_SIZE, render: (w) => <CtHead variant="subdural" width={w} /> },
  'smear-sickle': { size: SMEAR_SIZE, render: (w) => <BloodSmear variant="sickle" width={w} /> },
  'smear-megaloblastic': { size: SMEAR_SIZE, render: (w) => <BloodSmear variant="megaloblastic" width={w} /> },
  'derm-melanoma': { size: DERM_SIZE, render: (w) => <SkinLesion variant="melanoma" width={w} /> },
  'derm-bcc': { size: DERM_SIZE, render: (w) => <SkinLesion variant="bcc" width={w} /> },
  'us-ectopic': { size: US_SIZE, render: (w) => <Ultrasound width={w} /> },
};

export function imageAspect(id: string) {
  const r = RENDERERS[id];
  return r ? r.size.h / r.size.w : 0.75;
}

export function ImagingRenderer({ id, width }: { id: string; width: number }) {
  const r = RENDERERS[id];
  if (!r) return null;
  return r.render(width);
}
