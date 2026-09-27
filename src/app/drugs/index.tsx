import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Row, Screen } from '../../components/ui';
import { DRUGS } from '../../data/drugs';
import { systemById } from '../../data/meta';
import { useTheme } from '../../lib/theme';

export default function Drugs() {
  const { c } = useTheme();
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const list = DRUGS.filter((d) => !query || `${d.name} ${d.drugClass} ${d.uses.join(' ')}`.toLowerCase().includes(query)).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Drugs' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: c.card, borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: c.border }}>
        <Ionicons name="search" size={18} color={c.sub} />
        <TextInput value={q} onChangeText={setQ} placeholder="Search by name, class, or use" placeholderTextColor={c.sub} style={{ flex: 1, paddingVertical: 12, color: c.text, fontSize: 15.5 }} />
      </View>
      {list.map((d) => (
        <Row key={d.id} icon="flask" iconColor={systemById(d.system).color} title={d.name} subtitle={d.drugClass} onPress={() => router.push(`/drugs/${d.id}`)} />
      ))}
    </Screen>
  );
}
