import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Chip, ChipRow, Row, Screen, T } from '../../components/ui';
import { ARTICLES } from '../../data/articles';
import { DISCIPLINES, SYSTEMS, systemById } from '../../data/meta';
import type { DisciplineId } from '../../data/types';
import { useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';

export default function Library() {
  const { c } = useTheme();
  const { state } = useStore();
  const [mode, setMode] = useState<'systems' | 'disciplines' | 'saved'>('systems');
  const [disc, setDisc] = useState<DisciplineId>('pathology');
  const [q, setQ] = useState('');

  const query = q.trim().toLowerCase();
  const matches = query
    ? ARTICLES.filter((a) => [a.title, a.summary, ...a.keywords].join(' ').toLowerCase().includes(query))
    : [];
  const examArticles = (list: typeof ARTICLES) => (state.exam ? list.filter((a) => a.exams.includes(state.exam!)) : list);

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: c.card, borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: c.border }}>
        <Ionicons name="search" size={18} color={c.sub} />
        <TextInput value={q} onChangeText={setQ} placeholder="Search the library" placeholderTextColor={c.sub} style={{ flex: 1, paddingVertical: 12, color: c.text, fontSize: 15.5 }} />
      </View>

      {query ? (
        <View style={{ gap: 8 }}>
          <T v="label">{matches.length} results</T>
          {matches.map((a) => (
            <Row key={a.id} icon={systemById(a.system).icon as never} iconColor={systemById(a.system).color} title={a.title} subtitle={a.summary} onPress={() => router.push(`/article/${a.id}`)} />
          ))}
        </View>
      ) : (
        <>
          <ChipRow>
            <Chip label="By system" active={mode === 'systems'} onPress={() => setMode('systems')} />
            <Chip label="By discipline" active={mode === 'disciplines'} onPress={() => setMode('disciplines')} />
            <Chip label={`Saved (${state.bookmarks.length})`} active={mode === 'saved'} onPress={() => setMode('saved')} />
          </ChipRow>

          {mode === 'systems' && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {SYSTEMS.map((s) => {
                const list = examArticles(ARTICLES.filter((a) => a.system === s.id));
                const read = list.filter((a) => state.read[a.id]).length;
                return (
                  <Pressable
                    key={s.id}
                    onPress={() => router.push(`/system/${s.id}`)}
                    style={({ pressed }) => ({ width: '48%', flexGrow: 1, backgroundColor: c.card, borderRadius: 14, padding: 14, gap: 8, borderWidth: 1, borderColor: c.border, opacity: pressed ? 0.7 : 1 })}
                  >
                    <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: s.color + '22', alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name={s.icon as never} size={22} color={s.color} />
                    </View>
                    <T v="h3" numberOfLines={2}>
                      {s.name}
                    </T>
                    <T v="small">
                      {read}/{list.length} articles read
                    </T>
                  </Pressable>
                );
              })}
            </View>
          )}

          {mode === 'disciplines' && (
            <>
              <ChipRow>
                {DISCIPLINES.map((d) => (
                  <Chip key={d.id} label={d.name} active={disc === d.id} onPress={() => setDisc(d.id)} color="#5B5BD6" />
                ))}
              </ChipRow>
              {examArticles(ARTICLES.filter((a) => a.disciplines.includes(disc))).map((a) => (
                <Row key={a.id} icon={systemById(a.system).icon as never} iconColor={systemById(a.system).color} title={a.title} subtitle={systemById(a.system).name} onPress={() => router.push(`/article/${a.id}`)} />
              ))}
            </>
          )}

          {mode === 'saved' &&
            (state.bookmarks.length === 0 ? (
              <T v="sub">Tap the bookmark icon on any article to save it here.</T>
            ) : (
              ARTICLES.filter((a) => state.bookmarks.includes(a.id)).map((a) => (
                <Row key={a.id} icon="bookmark" iconColor={c.warn} title={a.title} subtitle={systemById(a.system).name} onPress={() => router.push(`/article/${a.id}`)} />
              ))
            ))}
        </>
      )}
    </Screen>
  );
}
