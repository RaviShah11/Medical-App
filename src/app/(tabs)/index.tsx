import { Ionicons } from '@expo/vector-icons';
import { Redirect, router, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Card, Progress, Row, Screen, Stat, T } from '../../components/ui';
import { articleById } from '../../data/articles';
import { examName } from '../../data/meta';
import { bySystem, daysUntil, dueCards, overall, todaysPlan, weakest } from '../../lib/stats';
import { dayKey, streak, useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';
import { ARTICLES } from '../../data/articles';

export default function Home() {
  const { state, togglePlanTask } = useStore();
  const { c } = useTheme();
  if (!state.onboarded) return <Redirect href="/onboarding" />;

  const o = overall(state);
  const days = daysUntil(state.examDate);
  const plan = todaysPlan(state);
  const done = state.planDone[dayKey()] ?? [];
  const systems = bySystem(state).filter((s) => s.answered > 0);
  const weak = weakest(state);
  const weakArticle = weak ? ARTICLES.find((a) => a.system === weak) : null;
  const due = dueCards(state).length;
  const lastRead = Object.entries(state.read).sort((a, b) => b[1] - a[1])[0];

  return (
    <Screen>
      <Pressable
        onPress={() => router.push('/search')}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: c.card, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: c.border }}
      >
        <Ionicons name="search" size={18} color={c.sub} />
        <T v="sub">Search articles, drugs, labs, cases</T>
      </Pressable>

      <Card style={{ backgroundColor: c.primary, borderColor: c.primary }}>
        <T v="label" color={c.onPrimary}>
          {state.exam ? examName(state.exam) : 'No exam set'}
        </T>
        <T v="title" color={c.onPrimary}>
          {days === null ? 'Set your exam date' : days > 0 ? `${days} days to go` : days === 0 ? 'Exam day. You got this.' : 'Exam date passed'}
        </T>
        <T v="sub" color={c.onPrimary}>
          Today&apos;s focus: {plan.focus.name}
        </T>
      </Card>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Stat label="Day streak" value={`${streak(state.activity)}`} color={c.warn} />
        <Stat label="Answered" value={`${o.answered}`} />
        <Stat label="Accuracy" value={o.answered ? `${Math.round(o.accuracy * 100)}%` : 'None'} color={c.success} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <T v="h2">Today&apos;s plan</T>
        <Pressable onPress={() => router.push('/planner')}>
          <T v="sub" color={c.primary}>
            Planner
          </T>
        </Pressable>
      </View>
      <Card style={{ padding: 6, gap: 0 }}>
        {plan.tasks.map((t) => {
          const checked = done.includes(t.id);
          return (
            <View key={t.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 12 }}>
              <Pressable onPress={() => togglePlanTask(t.id)} hitSlop={8}>
                <Ionicons name={checked ? 'checkmark-circle' : 'ellipse-outline'} size={26} color={checked ? c.success : c.sub} />
              </Pressable>
              <Pressable style={{ flex: 1 }} onPress={() => router.push(t.href as Href)}>
                <T style={{ textDecorationLine: checked ? 'line-through' : 'none', fontWeight: '600' }}>{t.label}</T>
                <T v="small">{t.detail}</T>
              </Pressable>
              <Ionicons name={t.icon} size={20} color={c.primary} />
            </View>
          );
        })}
      </Card>

      <T v="h2" style={{ marginTop: 4 }}>
        Jump back in
      </T>
      <Row icon="flash" title="Quick 10 questions" subtitle="Tutor mode, unused first" onPress={() => router.push('/qbank?quick=1')} />
      <Row icon="layers" iconColor="#8E4EC6" title="Flashcards" subtitle={due ? `${due} cards due` : 'All caught up'} onPress={() => router.push('/flashcards')} />
      <Row icon="scan" iconColor="#3E8FE0" title="Image challenge" subtitle="ECGs, films, CTs, smears, skin" onPress={() => router.push('/imaging/challenge')} />
      {lastRead && articleById(lastRead[0]) && (
        <Row icon="book" iconColor="#E08A1E" title={`Continue: ${articleById(lastRead[0])!.title}`} subtitle="Last article you read" onPress={() => router.push(`/article/${lastRead[0]}`)} />
      )}

      {weakArticle && (
        <Card onPress={() => router.push(`/article/${weakArticle.id}`)} style={{ borderColor: c.warn, borderWidth: 1 }}>
          <T v="label" color={c.warn}>
            Weak spot
          </T>
          <T v="h3">Review {weakArticle.title}</T>
          <T v="sub">Your accuracy is lowest in this system. Read the article, then retry the questions.</T>
        </Card>
      )}

      <T v="h2" style={{ marginTop: 4 }}>
        Performance by system
      </T>
      {systems.length === 0 ? (
        <Card>
          <T v="sub">Answer some questions and your breakdown shows up here.</T>
        </Card>
      ) : (
        <Card>
          {systems.map((s) => (
            <View key={s.system.id} style={{ gap: 4, marginBottom: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T v="sub" color={c.text}>
                  {s.system.name}
                </T>
                <T v="sub">
                  {s.correct}/{s.answered} ({Math.round((s.accuracy ?? 0) * 100)}%)
                </T>
              </View>
              <Progress value={s.accuracy ?? 0} color={(s.accuracy ?? 0) >= 0.7 ? c.success : (s.accuracy ?? 0) >= 0.5 ? c.warn : c.danger} />
            </View>
          ))}
        </Card>
      )}
    </Screen>
  );
}
