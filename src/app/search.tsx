import { Ionicons } from '@expo/vector-icons';
import { router, Stack, type Href } from 'expo-router';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Empty, Row, Screen, T, type IconName } from '../components/ui';
import { ARTICLES } from '../data/articles';
import { CALCULATORS } from '../data/calculators';
import { CASES } from '../data/cases';
import { DRUGS } from '../data/drugs';
import { IMAGING } from '../data/imaging';
import { LABS } from '../data/labs';
import { useTheme } from '../lib/theme';

interface Hit {
  key: string;
  kind: string;
  icon: IconName;
  title: string;
  subtitle: string;
  href: Href;
}

function search(q: string): Hit[] {
  const has = (...parts: string[]) => parts.join(' ').toLowerCase().includes(q);
  const hits: Hit[] = [];
  ARTICLES.forEach((a) => has(a.title, a.summary, ...a.keywords) && hits.push({ key: `a${a.id}`, kind: 'Article', icon: 'book', title: a.title, subtitle: a.summary, href: `/article/${a.id}` }));
  DRUGS.forEach((d) => has(d.name, d.drugClass, ...d.uses) && hits.push({ key: `d${d.id}`, kind: 'Drug', icon: 'flask', title: d.name, subtitle: d.drugClass, href: `/drugs/${d.id}` }));
  CASES.forEach((k) => has(k.title, k.chiefComplaint, k.diagnoses[k.answer]) && hits.push({ key: `c${k.id}`, kind: 'Case', icon: 'medkit', title: k.title, subtitle: k.patient, href: `/case/${k.id}` }));
  IMAGING.forEach((i) => has(i.diagnosis, i.modality, i.clinical) && hits.push({ key: `i${i.id}`, kind: 'Image', icon: 'scan', title: i.diagnosis, subtitle: i.modality, href: `/imaging/${i.id}` }));
  CALCULATORS.forEach((c) => has(c.name, c.description) && hits.push({ key: `k${c.id}`, kind: 'Calculator', icon: 'calculator', title: c.name, subtitle: c.description, href: `/calculators/${c.id}` }));
  LABS.forEach((l) => has(l.name) && hits.push({ key: `l${l.name}`, kind: 'Lab', icon: 'water', title: l.name, subtitle: l.range, href: '/labs' }));
  return hits;
}

export default function Search() {
  const { c } = useTheme();
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const hits = query.length >= 2 ? search(query) : [];
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Search' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: c.card, borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: c.border }}>
        <Ionicons name="search" size={18} color={c.sub} />
        <TextInput autoFocus value={q} onChangeText={setQ} placeholder="Try: troponin, gout, lithium, CURB" placeholderTextColor={c.sub} style={{ flex: 1, paddingVertical: 12, color: c.text, fontSize: 16 }} />
      </View>
      {query.length >= 2 && hits.length === 0 && <Empty icon="search" text="No results." />}
      {hits.length > 0 && <T v="label">{hits.length} results</T>}
      {hits.map((h) => (
        <Row key={h.key} icon={h.icon} title={h.title} subtitle={`${h.kind} · ${h.subtitle}`} onPress={() => router.push(h.href)} />
      ))}
    </Screen>
  );
}
