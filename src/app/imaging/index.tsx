import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Button, Chip, ChipRow, Row, Screen } from '../../components/ui';
import { IMAGING } from '../../data/imaging';
import { systemById } from '../../data/meta';
import type { Modality } from '../../data/types';
import { useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';

const MODALITIES: Modality[] = ['ECG', 'Radiograph', 'CT', 'Ultrasound', 'Histology', 'Dermatology'];

export default function ImagingAtlas() {
  const [mod, setMod] = useState<Modality | null>(null);
  const { state } = useStore();
  const { c } = useTheme();
  const list = IMAGING.filter((i) => !mod || i.modality === mod);
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Imaging atlas' }} />
      <Button label="Start image challenge" icon="eye" onPress={() => router.push('/imaging/challenge')} />
      <ChipRow>
        <Chip label="All" active={!mod} onPress={() => setMod(null)} />
        {MODALITIES.map((m) => (
          <Chip key={m} label={m} active={mod === m} onPress={() => setMod(m)} />
        ))}
      </ChipRow>
      {list.map((i) => {
        const r = state.imaging[i.id];
        return (
          <Row
            key={i.id}
            icon={i.modality === 'ECG' ? 'pulse' : i.modality === 'Histology' ? 'ellipse' : i.modality === 'Dermatology' ? 'hand-left' : 'scan'}
            iconColor={r ? (r.correct ? c.success : c.danger) : systemById(i.system).color}
            title={i.diagnosis}
            subtitle={`${i.modality} · ${systemById(i.system).name}`}
            onPress={() => router.push(`/imaging/${i.id}`)}
          />
        );
      })}
    </Screen>
  );
}
