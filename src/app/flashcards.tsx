import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Card, Chip, ChipRow, Empty, Screen, Stat, T } from '../components/ui';
import { articleById } from '../data/articles';
import { SYSTEMS } from '../data/meta';
import { allCards, newCard, previewInterval, type Flashcard, type Rating } from '../lib/srs';
import { useStore } from '../lib/store';
import { useTheme } from '../lib/theme';

const RATINGS: { r: Rating; label: string }[] = [
  { r: 0, label: 'Again' },
  { r: 1, label: 'Hard' },
  { r: 2, label: 'Good' },
  { r: 3, label: 'Easy' },
];

export default function Flashcards() {
  const params = useLocalSearchParams<{ article?: string }>();
  const { state, reviewCard } = useStore();
  const { c } = useTheme();
  const [deck, setDeck] = useState<string>(params.article ? `a:${params.article}` : 'due');
  const [queue, setQueue] = useState<Flashcard[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const cards = useMemo(() => allCards(state.answers), [state.answers]);
  const now = Date.now();
  const isDue = (card: Flashcard) => (state.cards[card.id]?.due ?? 0) <= now;

  const deckCards = (d: string) => {
    if (d === 'due') return cards.filter(isDue);
    if (d === 'missed') return cards.filter((x) => x.id.startsWith('q:'));
    if (d.startsWith('a:')) return cards.filter((x) => x.id.startsWith(`${d.slice(2)}#`));
    return cards.filter((x) => x.system === d);
  };

  const start = () => {
    const list = deckCards(deck);
    const due = list.filter(isDue);
    setQueue((due.length ? due : list).slice(0, 60));
    setReviewed(0);
    setFlipped(false);
  };

  if (queue) {
    if (queue.length === 0) {
      return (
        <Screen>
          <Stack.Screen options={{ title: 'Flashcards' }} />
          <Empty icon="checkmark-done-circle" text={`Session done. You reviewed ${reviewed} cards.`} />
          <Button label="Back to decks" onPress={() => setQueue(null)} />
        </Screen>
      );
    }
    const card = queue[0];
    const st = state.cards[card.id] ?? newCard();
    return (
      <Screen>
        <Stack.Screen options={{ title: `${queue.length} left` }} />
        <T v="label">{card.source}</T>
        <Pressable onPress={() => setFlipped(!flipped)}>
          <Card style={{ minHeight: 260, justifyContent: 'center', gap: 16 }}>
            <T style={{ fontSize: 18, lineHeight: 27, fontWeight: '600', textAlign: 'center' }}>{card.front}</T>
            {flipped ? (
              <>
                <View style={{ height: 1, backgroundColor: c.border }} />
                <T style={{ fontSize: 17, lineHeight: 25, textAlign: 'center' }} color={c.primary}>
                  {card.back}
                </T>
              </>
            ) : (
              <T v="small" style={{ textAlign: 'center' }}>
                Tap to reveal
              </T>
            )}
          </Card>
        </Pressable>
        {flipped ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {RATINGS.map(({ r, label }) => {
              const color = r === 0 ? c.danger : r === 1 ? c.warn : r === 2 ? c.success : c.primary;
              return (
                <Pressable
                  key={r}
                  onPress={() => {
                    reviewCard(card.id, r);
                    setReviewed(reviewed + 1);
                    setFlipped(false);
                    setQueue(r === 0 ? [...queue.slice(1), card] : queue.slice(1));
                  }}
                  style={({ pressed }) => ({ flex: 1, padding: 12, borderRadius: 12, backgroundColor: color, alignItems: 'center', opacity: pressed ? 0.7 : 1 })}
                >
                  <Text style={{ color: '#fff', fontWeight: '800' }}>{label}</Text>
                  <Text style={{ color: '#fff', fontSize: 12 }}>{previewInterval(st, r)}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <Button label="Show answer" onPress={() => setFlipped(true)} />
        )}
        <Button kind="ghost" label="End session" onPress={() => setQueue(null)} />
      </Screen>
    );
  }

  const dueCount = cards.filter(isDue).length;
  const learned = cards.filter((x) => (state.cards[x.id]?.reps ?? 0) > 0).length;
  const current = deckCards(deck);

  return (
    <Screen>
      <Stack.Screen options={{ title: 'Flashcards' }} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Stat label="Due now" value={`${dueCount}`} color={c.primary} />
        <Stat label="Learned" value={`${learned}`} color={c.success} />
        <Stat label="Total" value={`${cards.length}`} />
      </View>
      <T v="label">Deck</T>
      <ChipRow>
        <Chip label="All due" active={deck === 'due'} onPress={() => setDeck('due')} />
        <Chip label="Missed questions" active={deck === 'missed'} onPress={() => setDeck('missed')} />
        {params.article && articleById(params.article) && (
          <Chip label={articleById(params.article)!.title} active={deck === `a:${params.article}`} onPress={() => setDeck(`a:${params.article}`)} />
        )}
        {SYSTEMS.map((s) => (
          <Chip key={s.id} label={s.name} color={s.color} active={deck === s.id} onPress={() => setDeck(s.id)} />
        ))}
      </ChipRow>
      <T v="sub">
        {current.length} cards in this deck, {current.filter(isDue).length} due. Missed questions become cards automatically.
      </T>
      <Button label="Start review" icon="play" disabled={!current.length} onPress={start} />
    </Screen>
  );
}
