import { Ionicons } from '@expo/vector-icons';
import { router, Stack, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Button, Card, Chip, ChipRow, Progress, Screen, Stat, T } from '../components/ui';
import { ARTICLES } from '../data/articles';
import { CASES } from '../data/cases';
import { examName, EXAMS, SYSTEMS } from '../data/meta';
import { daysUntil, questionsForExam, todaysPlan } from '../lib/stats';
import { dayKey, useStore } from '../lib/store';
import { useTheme } from '../lib/theme';

export default function Planner() {
  const { state, setExam, setExamDate, togglePlanTask } = useStore();
  const { c } = useTheme();
  const [date, setDate] = useState(state.examDate ?? '');
  const days = daysUntil(state.examDate);
  const plan = todaysPlan(state);
  const done = state.planDone[dayKey()] ?? [];

  const pool = questionsForExam(state.exam);
  const qDone = pool.filter((q) => state.answers[q.id]).length;
  const aRead = ARTICLES.filter((a) => state.read[a.id]).length;
  const cDone = CASES.filter((k) => state.cases[k.id]).length;

  // Spread systems over the remaining weeks, with the final week for review
  const weeks = days && days > 7 ? Math.ceil((days - 7) / 7) : 0;
  const perWeek = weeks ? Math.ceil(SYSTEMS.length / weeks) : SYSTEMS.length;
  const schedule = weeks
    ? Array.from({ length: Math.min(weeks, SYSTEMS.length) }, (_, i) => SYSTEMS.slice(i * perWeek, (i + 1) * perWeek)).filter((w) => w.length)
    : [];

  return (
    <Screen>
      <Stack.Screen options={{ title: 'Study planner' }} />
      <Card>
        <T v="label">Exam</T>
        <ChipRow>
          {EXAMS.map((e) => (
            <Chip key={e.id} label={e.name} active={state.exam === e.id} onPress={() => setExam(e.id)} />
          ))}
        </ChipRow>
        <T v="label" style={{ marginTop: 6 }}>
          Exam date
        </T>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={c.sub}
            style={{ flex: 1, backgroundColor: c.bg, borderColor: c.border, borderWidth: 1, borderRadius: 10, padding: 12, color: c.text, fontSize: 16 }}
          />
          <Button label="Save" onPress={() => setExamDate(/^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null)} />
        </View>
        <T v="sub">
          {state.exam ? examName(state.exam) : 'No exam'} · {days === null ? 'No date set' : days >= 0 ? `${days} days left` : 'Date passed'}
        </T>
      </Card>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Stat label="Questions done" value={`${qDone}/${pool.length}`} />
        <Stat label="Articles read" value={`${aRead}/${ARTICLES.length}`} />
        <Stat label="Cases" value={`${cDone}/${CASES.length}`} />
      </View>
      <Card>
        <T v="label">Overall progress</T>
        <Progress value={(qDone / Math.max(1, pool.length) + aRead / ARTICLES.length + cDone / CASES.length) / 3} />
      </Card>

      <T v="h2">Today</T>
      <Card style={{ padding: 6, gap: 0 }}>
        {plan.tasks.map((t) => {
          const checked = done.includes(t.id);
          return (
            <View key={t.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 12 }}>
              <Pressable onPress={() => togglePlanTask(t.id)} hitSlop={8}>
                <Ionicons name={checked ? 'checkmark-circle' : 'ellipse-outline'} size={26} color={checked ? c.success : c.sub} />
              </Pressable>
              <Pressable style={{ flex: 1 }} onPress={() => router.push(t.href as Href)}>
                <T style={{ fontWeight: '600', textDecorationLine: checked ? 'line-through' : 'none' }}>{t.label}</T>
                <T v="small">{t.detail}</T>
              </Pressable>
            </View>
          );
        })}
      </Card>

      {schedule.length > 0 && (
        <>
          <T v="h2">Your schedule</T>
          {schedule.map((w, i) => (
            <Card key={i}>
              <T v="label">Week {i + 1}</T>
              <T>{w.map((s) => s.name).join(', ')}</T>
            </Card>
          ))}
          <Card style={{ borderColor: c.primary, borderWidth: 1 }}>
            <T v="label" color={c.primary}>
              Final week
            </T>
            <T>Timed mixed blocks, redo incorrect questions, and clear your flashcard backlog.</T>
          </Card>
        </>
      )}
      {!schedule.length && days !== null && days <= 7 && days >= 0 && (
        <Card>
          <T>Final stretch. Do timed mixed blocks and review your incorrect and flagged questions.</T>
        </Card>
      )}
    </Screen>
  );
}
