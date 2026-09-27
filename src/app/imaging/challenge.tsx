import { router, Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ImageViewer } from '../../components/ImageViewer';
import { Button, Card, Screen, T } from '../../components/ui';
import { IMAGING } from '../../data/imaging';
import { useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';

const ROUND = 5;

export default function ImageChallenge() {
  const { recordImaging } = useStore();
  const { c } = useTheme();
  const [seed, setSeed] = useState(0);
  const round = useMemo(() => [...IMAGING].sort(() => Math.random() - 0.5).slice(0, ROUND), [seed]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= round.length;

  if (done) {
    return (
      <Screen>
        <Stack.Screen options={{ title: 'Image challenge' }} />
        <Card style={{ alignItems: 'center' }}>
          <T v="label">Round complete</T>
          <Text style={{ fontSize: 48, fontWeight: '800', color: score >= 4 ? c.success : c.warn }}>
            {score}/{round.length}
          </Text>
        </Card>
        <Button
          label="Play again"
          icon="refresh"
          onPress={() => {
            setSeed(seed + 1);
            setI(0);
            setPick(null);
            setScore(0);
          }}
        />
        <Button kind="secondary" label="Browse the atlas" onPress={() => router.replace('/imaging')} />
      </Screen>
    );
  }

  const s = round[i];
  const answered = pick !== null;
  return (
    <Screen>
      <Stack.Screen options={{ title: `Image ${i + 1} of ${round.length}` }} />
      <T v="label">{s.modality}</T>
      <T v="sub" color={c.text}>
        {s.clinical}
      </T>
      <ImageViewer key={s.id} id={s.id} findings={answered} />
      <T v="h3">What is the diagnosis?</T>
      <View style={{ gap: 8 }}>
        {s.options.map((o, j) => {
          const border = answered && j === s.answer ? c.success : answered && j === pick ? c.danger : c.border;
          return (
            <Pressable
              key={o}
              disabled={answered}
              onPress={() => {
                setPick(j);
                const ok = j === s.answer;
                if (ok) setScore(score + 1);
                recordImaging(s.id, ok);
              }}
              style={{ padding: 14, borderRadius: 12, borderWidth: 2, borderColor: border, backgroundColor: c.card }}
            >
              <T>{o}</T>
            </Pressable>
          );
        })}
      </View>
      {answered && (
        <>
          <Card>
            <T v="label" color={pick === s.answer ? c.success : c.danger}>
              {pick === s.answer ? 'Correct' : `Answer: ${s.options[s.answer]}`}
            </T>
            <T>{s.teaching}</T>
            <T v="small">Tap Show findings above to see the labeled image.</T>
          </Card>
          <Button
            label={i < round.length - 1 ? 'Next image' : 'See score'}
            onPress={() => {
              setI(i + 1);
              setPick(null);
            }}
          />
        </>
      )}
    </Screen>
  );
}
