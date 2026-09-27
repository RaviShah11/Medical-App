import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Button, Row, Screen, T } from '../../components/ui';
import { ARTICLES } from '../../data/articles';
import { CASES } from '../../data/cases';
import { IMAGING } from '../../data/imaging';
import { systemById } from '../../data/meta';
import { QUESTIONS } from '../../data/questions';
import type { SystemId } from '../../data/types';
import { useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';
import { DRUGS } from '../../data/drugs';

export default function SystemScreen() {
  const { id } = useLocalSearchParams<{ id: SystemId }>();
  const { state } = useStore();
  const { c } = useTheme();
  const s = systemById(id);
  if (!s) return null;
  const articles = ARTICLES.filter((a) => a.system === id);
  const qs = QUESTIONS.filter((q) => q.system === id && (!state.exam || q.exams.includes(state.exam)));
  const cases = CASES.filter((k) => k.system === id);
  const images = IMAGING.filter((i) => i.system === id);
  const drugs = DRUGS.filter((d) => d.system === id);

  return (
    <Screen>
      <Stack.Screen options={{ title: s.name }} />
      <T v="label">Articles</T>
      {articles.length === 0 && <T v="sub">More articles for this system are coming.</T>}
      {articles.map((a) => (
        <Row
          key={a.id}
          icon={state.read[a.id] ? 'checkmark-circle' : 'document-text'}
          iconColor={state.read[a.id] ? c.success : s.color}
          title={a.title}
          subtitle={a.summary}
          onPress={() => router.push(`/article/${a.id}`)}
        />
      ))}
      {qs.length > 0 && (
        <Button label={`Practice ${qs.length} ${s.name} questions`} icon="help-circle" onPress={() => router.push(`/quiz?ids=${qs.map((q) => q.id).join(',')}&mode=tutor`)} />
      )}
      {cases.length > 0 && <T v="label">Cases</T>}
      {cases.map((k) => (
        <Row key={k.id} icon="medkit" iconColor={s.color} title={k.title} subtitle={k.patient} onPress={() => router.push(`/case/${k.id}`)} />
      ))}
      {images.length > 0 && <T v="label">Imaging</T>}
      {images.map((i) => (
        <Row key={i.id} icon="scan" iconColor={s.color} title={i.diagnosis} subtitle={i.modality} onPress={() => router.push(`/imaging/${i.id}`)} />
      ))}
      {drugs.length > 0 && <T v="label">Drugs</T>}
      {drugs.map((d) => (
        <Row key={d.id} icon="flask" iconColor={s.color} title={d.name} subtitle={d.drugClass} onPress={() => router.push(`/drugs/${d.id}`)} right={<Ionicons name="chevron-forward" size={18} color={c.sub} />} />
      ))}
    </Screen>
  );
}
