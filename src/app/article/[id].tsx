import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Button, Card, Chip, ChipRow, Row, Screen, T } from '../../components/ui';
import { articleById } from '../../data/articles';
import { disciplineName, examName, systemById } from '../../data/meta';
import { QUESTIONS } from '../../data/questions';
import type { Table } from '../../data/types';
import { useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = articleById(id);
  const { state, toggleBookmark, toggleHighlight, markRead } = useStore();
  const { c } = useTheme();

  useEffect(() => {
    if (a) markRead(a.id);
  }, [a, markRead]);

  if (!a) return null;
  const sys = systemById(a.system);
  const saved = state.bookmarks.includes(a.id);
  const marks = state.highlights[a.id] ?? [];
  const qs = QUESTIONS.filter((q) => q.articleId === a.id);

  const Line = ({ k, text, bullet }: { k: string; text: string; bullet?: boolean }) => {
    const on = marks.includes(k);
    return (
      <Pressable onLongPress={() => toggleHighlight(a.id, k)} delayLongPress={300} style={{ flexDirection: 'row', gap: 10, backgroundColor: on ? c.highlight : 'transparent', borderRadius: 6, paddingHorizontal: on ? 4 : 0 }}>
        {bullet && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: sys.color, marginTop: 9 }} />}
        <T style={{ flex: 1 }}>{text}</T>
      </Pressable>
    );
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: '',
          headerRight: () => (
            <Pressable onPress={() => toggleBookmark(a.id)} hitSlop={10} accessibilityLabel="Bookmark">
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={22} color={c.primary} />
            </Pressable>
          ),
        }}
      />
      <T v="label" color={sys.color}>
        {sys.name}
      </T>
      <T v="title">{a.title}</T>
      <ChipRow>
        {a.disciplines.map((d) => (
          <Chip key={d} label={disciplineName(d)} />
        ))}
      </ChipRow>
      <T v="small">Relevant for {a.exams.map(examName).join(', ')}</T>

      <Card style={{ backgroundColor: c.primarySoft, borderColor: c.primarySoft }}>
        <T>{a.summary}</T>
      </Card>

      <Card style={{ backgroundColor: c.warnSoft, borderColor: c.warn, borderWidth: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="star" size={16} color={c.warn} />
          <T v="label" color={c.warn}>
            High yield
          </T>
        </View>
        {a.highYield.map((h, i) => (
          <Line key={i} k={`hy-${i}`} text={h} bullet />
        ))}
      </Card>

      {a.sections.map((s, si) => (
        <View key={s.heading} style={{ gap: 8, marginTop: 4 }}>
          <T v="h2">{s.heading}</T>
          {s.paragraphs?.map((p, i) => <Line key={`p${i}`} k={`${si}-p${i}`} text={p} />)}
          {s.bullets?.map((b, i) => <Line key={`b${i}`} k={`${si}-b${i}`} text={b} bullet />)}
        </View>
      ))}

      {a.tables?.map((t) => <DataTable key={t.title} table={t} />)}

      <T v="small">Long press any line to highlight it.</T>

      <View style={{ gap: 8, marginTop: 8 }}>
        {qs.length > 0 && <Button label={`Test yourself: ${qs.length} questions`} icon="help-circle" onPress={() => router.push(`/quiz?ids=${qs.map((q) => q.id).join(',')}&mode=tutor`)} />}
        <Button label={`Study ${a.cards.length} flashcards`} kind="secondary" icon="layers" onPress={() => router.push(`/flashcards?article=${a.id}`)} />
      </View>

      {a.related.length > 0 && (
        <>
          <T v="label" style={{ marginTop: 8 }}>
            Related
          </T>
          {a.related.map((r) => {
            const ra = articleById(r);
            return ra ? <Row key={r} icon="link" iconColor={systemById(ra.system).color} title={ra.title} onPress={() => router.push(`/article/${r}`)} /> : null;
          })}
        </>
      )}
    </Screen>
  );
}

function DataTable({ table }: { table: Table }) {
  const { c } = useTheme();
  const colW = 130;
  return (
    <View style={{ gap: 8, marginTop: 4 }}>
      <T v="h2">{table.title}</T>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: c.border }}>
          <View style={{ flexDirection: 'row', backgroundColor: c.chip }}>
            {table.headers.map((h) => (
              <View key={h} style={{ width: colW, padding: 10 }}>
                <T v="sub" color={c.text} style={{ fontWeight: '700' }}>
                  {h}
                </T>
              </View>
            ))}
          </View>
          {table.rows.map((r, i) => (
            <View key={i} style={{ flexDirection: 'row', backgroundColor: c.card, borderTopWidth: 1, borderTopColor: c.border }}>
              {r.map((cell, j) => (
                <View key={j} style={{ width: colW, padding: 10 }}>
                  <T v="sub" color={c.text}>
                    {cell}
                  </T>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
