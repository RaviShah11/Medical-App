import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Card, Chip, ChipRow, Progress, Screen, T } from '../components/ui';
import { rankDiagnoses, SYMPTOMS, type Symptom } from '../data/ddx';
import { useTheme } from '../lib/theme';

export default function Ddx() {
  const { c } = useTheme();
  const [sel, setSel] = useState<Symptom[]>([]);
  const results = rankDiagnoses(sel);
  const top = results[0]?.score ?? 1;

  return (
    <Screen>
      <Stack.Screen options={{ title: 'Differential builder' }} />
      <T v="sub">Tap the patient&apos;s symptoms. The list ranks diagnoses that fit best. Red flags show diagnoses you cannot miss.</T>
      <ChipRow>
        {SYMPTOMS.map((s) => (
          <Chip key={s} label={s} active={sel.includes(s)} onPress={() => setSel(sel.includes(s) ? sel.filter((x) => x !== s) : [...sel, s])} />
        ))}
      </ChipRow>
      {sel.length > 0 && <Button kind="ghost" label="Clear symptoms" onPress={() => setSel([])} />}
      {results.length > 0 && <T v="h2">Differential</T>}
      {results.map((r) => (
        <Pressable key={r.dx.name} disabled={!r.dx.articleId} onPress={() => router.push(`/article/${r.dx.articleId}`)}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {r.dx.urgent && <Ionicons name="warning" size={18} color={c.danger} />}
              <T v="h3" style={{ flex: 1 }}>
                {r.dx.name}
              </T>
              {r.dx.articleId && <Ionicons name="book-outline" size={18} color={c.primary} />}
            </View>
            <Progress value={r.score / top} color={r.dx.urgent ? c.danger : c.primary} height={6} />
            <T v="small">Matches: {r.hits.join(', ')}</T>
          </Card>
        </Pressable>
      ))}
      {sel.length > 0 && results.length === 0 && <T v="sub">No matches. Try fewer symptoms.</T>}
    </Screen>
  );
}
