import { router, Stack } from 'expo-router';
import { Alert, Platform } from 'react-native';
import { Button, Card, Chip, ChipRow, Screen, T } from '../components/ui';
import { EXAMS } from '../data/meta';
import { useStore, type ThemePref } from '../lib/store';

export default function Settings() {
  const { state, setTheme, setExam, resetProgress } = useStore();

  const confirmReset = () => {
    const msg = 'This clears answers, flashcard progress, cases, and highlights.';
    if (Platform.OS === 'web') {
      if (window.confirm(msg)) resetProgress();
      return;
    }
    Alert.alert('Reset progress?', msg, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetProgress },
    ]);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: 'Settings' }} />
      <Card>
        <T v="label">Appearance</T>
        <ChipRow>
          {(['system', 'light', 'dark'] as ThemePref[]).map((t) => (
            <Chip key={t} label={t[0].toUpperCase() + t.slice(1)} active={state.themePref === t} onPress={() => setTheme(t)} />
          ))}
        </ChipRow>
      </Card>
      <Card>
        <T v="label">Exam</T>
        <ChipRow>
          {EXAMS.map((e) => (
            <Chip key={e.id} label={e.name} active={state.exam === e.id} onPress={() => setExam(e.id)} />
          ))}
        </ChipRow>
        <Button kind="ghost" label="Change exam date" onPress={() => router.push('/planner')} />
      </Card>
      <Card>
        <T v="label">Data</T>
        <T v="sub">Your progress is saved on this device.</T>
        <Button kind="danger" label="Reset all progress" onPress={confirmReset} />
      </Card>
      <T v="small">
        MedStudy is a study aid. The content is written for exam preparation and is not medical advice. Images are schematic illustrations.
      </T>
    </Screen>
  );
}
