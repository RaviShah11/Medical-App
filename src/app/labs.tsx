import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Chip, ChipRow, Screen, T } from '../components/ui';
import { LAB_CATEGORIES, LABS } from '../data/labs';
import { useTheme } from '../lib/theme';

export default function Labs() {
  const { c } = useTheme();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const query = q.trim().toLowerCase();
  const list = LABS.filter((l) => (!cat || l.category === cat) && (!query || `${l.name} ${l.high} ${l.low}`.toLowerCase().includes(query)));

  return (
    <Screen>
      <Stack.Screen options={{ title: 'Lab values' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: c.card, borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: c.border }}>
        <Ionicons name="search" size={18} color={c.sub} />
        <TextInput value={q} onChangeText={setQ} placeholder="Search labs or causes" placeholderTextColor={c.sub} style={{ flex: 1, paddingVertical: 12, color: c.text, fontSize: 15.5 }} />
      </View>
      <ChipRow>
        <Chip label="All" active={!cat} onPress={() => setCat(null)} />
        {LAB_CATEGORIES.map((k) => (
          <Chip key={k} label={k} active={cat === k} onPress={() => setCat(k)} />
        ))}
      </ChipRow>
      {list.map((l) => {
        const isOpen = open === l.name;
        return (
          <Pressable key={l.name} onPress={() => setOpen(isOpen ? null : l.name)} style={{ backgroundColor: c.card, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: c.border, gap: 6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
              <T style={{ fontWeight: '700', flex: 1 }}>{l.name}</T>
              <T v="sub" color={c.primary} style={{ fontWeight: '600', flexShrink: 1, textAlign: 'right' }}>
                {l.range}
              </T>
            </View>
            {isOpen && (
              <View style={{ gap: 6 }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Ionicons name="arrow-up" size={16} color={c.danger} style={{ marginTop: 2 }} />
                  <T v="sub" color={c.text} style={{ flex: 1 }}>
                    {l.high}
                  </T>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Ionicons name="arrow-down" size={16} color="#3E8FE0" style={{ marginTop: 2 }} />
                  <T v="sub" color={c.text} style={{ flex: 1 }}>
                    {l.low}
                  </T>
                </View>
              </View>
            )}
          </Pressable>
        );
      })}
      <T v="small">Reference ranges vary by lab. Use your institution&apos;s ranges in practice.</T>
    </Screen>
  );
}
