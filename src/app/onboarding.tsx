import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Chip, ChipRow, Screen, T } from '../components/ui';
import { EXAMS } from '../data/meta';
import type { ExamId } from '../data/types';
import { dayKey, useStore } from '../lib/store';
import { useTheme } from '../lib/theme';

const QUICK = [
  { label: '1 month', months: 1 },
  { label: '3 months', months: 3 },
  { label: '6 months', months: 6 },
  { label: '1 year', months: 12 },
];

export default function Onboarding() {
  const { c } = useTheme();
  const { finishOnboarding } = useStore();
  const [exam, setExam] = useState<ExamId | null>(null);
  const [date, setDate] = useState('');

  const valid = date === '' || /^\d{4}-\d{2}-\d{2}$/.test(date);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ alignItems: 'center', gap: 8, paddingVertical: 16 }}>
          <View style={{ width: 72, height: 72, borderRadius: 20, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="medical" size={40} color={c.onPrimary} />
          </View>
          <T v="title">Welcome to MedStudy</T>
          <T v="sub" style={{ textAlign: 'center' }}>
            Articles, questions, cases, imaging, and flashcards in one place. Pick your exam and we will build your plan.
          </T>
        </View>

        <T v="label">Which exam are you studying for?</T>
        <View style={{ gap: 8 }}>
          {EXAMS.map((e) => (
            <Pressable
              key={e.id}
              onPress={() => setExam(e.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 14,
                borderRadius: 12,
                backgroundColor: c.card,
                borderWidth: 2,
                borderColor: exam === e.id ? c.primary : c.border,
                gap: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <T v="h3">{e.name}</T>
                <T v="small">{e.blurb}</T>
              </View>
              <Ionicons name={exam === e.id ? 'radio-button-on' : 'radio-button-off'} size={22} color={exam === e.id ? c.primary : c.sub} />
            </Pressable>
          ))}
        </View>

        <T v="label" style={{ marginTop: 8 }}>
          When is your exam? (optional)
        </T>
        <ChipRow>
          {QUICK.map((q) => {
            const d = new Date();
            d.setMonth(d.getMonth() + q.months);
            const k = dayKey(d);
            return <Chip key={q.label} label={q.label} active={date === k} onPress={() => setDate(k)} />;
          })}
        </ChipRow>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={c.sub}
          style={{ backgroundColor: c.card, borderColor: valid ? c.border : c.danger, borderWidth: 1, borderRadius: 12, padding: 14, color: c.text, fontSize: 16 }}
        />

        <Button
          label="Start studying"
          icon="arrow-forward"
          disabled={!exam || !valid}
          onPress={() => {
            finishOnboarding(exam!, date || null);
            router.replace('/');
          }}
          style={{ marginTop: 8 }}
        />
      </Screen>
    </SafeAreaView>
  );
}
