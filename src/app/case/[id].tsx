import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ImageViewer } from '../../components/ImageViewer';
import { Bullet, Button, Card, Progress, T } from '../../components/ui';
import { articleById } from '../../data/articles';
import { caseById } from '../../data/cases';
import type { CaseStep } from '../../data/types';
import { useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';

const STAGES = ['Presentation', 'History', 'Exam', 'Workup', 'Diagnosis', 'Treatment', 'Debrief'];

export default function CaseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const k = caseById(id);
  const { recordCase } = useStore();
  const { c } = useTheme();
  const [stage, setStage] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [dx, setDx] = useState<number | null>(null);
  const [tx, setTx] = useState<number | null>(null);
  const scroll = useRef<ScrollView>(null);

  if (!k) return null;

  const go = (n: number) => {
    setStage(n);
    scroll.current?.scrollTo({ y: 0, animated: false });
  };

  const steps = [...k.history.map((h) => ({ ...h, id: `h:${h.id}` })), ...k.exam.map((e) => ({ ...e, id: `e:${e.id}` })), ...k.tests.map((t) => ({ ...t, id: `t:${t.id}` }))];
  const relevant = steps.filter((s) => s.relevant);
  const foundRelevant = relevant.filter((s) => picked.includes(s.id)).length;
  const wasted = steps.filter((s) => !s.relevant && picked.includes(s.id));
  const thorough = Math.round((foundRelevant / relevant.length) * 15);
  const efficiency = Math.max(0, 15 - 5 * wasted.length);
  const dxPts = dx === k.answer ? 40 : 0;
  const txPts = tx === k.treatmentAnswer ? 30 : 0;
  const total = dxPts + txPts + thorough + efficiency;

  const StepList = ({ items, prefix }: { items: (CaseStep & { kind?: string })[]; prefix: string }) => (
    <View style={{ gap: 8 }}>
      {items.map((s) => {
        const key = `${prefix}:${s.id}`;
        const on = picked.includes(key);
        return (
          <Pressable
            key={s.id}
            disabled={on}
            onPress={() => setPicked([...picked, key])}
            style={{ padding: 14, borderRadius: 12, backgroundColor: c.card, borderWidth: 1, borderColor: on ? c.primary : c.border, gap: 6 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name={on ? 'checkmark-circle' : s.kind === 'imaging' ? 'scan-outline' : s.kind === 'lab' ? 'flask-outline' : 'add-circle-outline'} size={22} color={on ? c.primary : c.sub} />
              <T style={{ flex: 1, fontWeight: '600' }}>{s.label}</T>
            </View>
            {on && (
              <>
                <T v="sub" color={c.text}>
                  {s.result}
                </T>
                {s.imageId && <ImageViewer id={s.imageId} findings />}
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );

  const Choice = ({ options, value, onPick, answer }: { options: string[]; value: number | null; onPick: (i: number) => void; answer?: number }) => (
    <View style={{ gap: 8 }}>
      {options.map((o, i) => {
        const show = answer !== undefined;
        const border = show && i === answer ? c.success : show && i === value ? c.danger : value === i ? c.primary : c.border;
        return (
          <Pressable key={o} disabled={show} onPress={() => onPick(i)} style={{ padding: 14, borderRadius: 12, borderWidth: 2, borderColor: border, backgroundColor: c.card }}>
            <T>{o}</T>
          </Pressable>
        );
      })}
    </View>
  );

  const article = k.articleId ? articleById(k.articleId) : null;

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Stack.Screen options={{ title: k.title }} />
      <View style={{ padding: 12, gap: 6, backgroundColor: c.card, borderBottomWidth: 1, borderBottomColor: c.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <T v="label">{STAGES[stage]}</T>
          <T v="small">
            Step {stage + 1} of {STAGES.length}
          </T>
        </View>
        <Progress value={(stage + 1) / STAGES.length} />
      </View>
      <ScrollView ref={scroll} contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 48 }}>
        {stage === 0 && (
          <>
            <Card>
              <T v="label">{k.setting}</T>
              <T v="h2">{k.patient}</T>
              <T style={{ fontStyle: 'italic' }}>{k.chiefComplaint}</T>
            </Card>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {k.vitals.map((v) => (
                <View key={v.label} style={{ flexGrow: 1, minWidth: '30%', backgroundColor: v.abnormal ? c.dangerSoft : c.card, borderRadius: 12, padding: 10, borderWidth: 1, borderColor: c.border }}>
                  <T v="small">{v.label}</T>
                  <Text style={{ fontSize: 18, fontWeight: '800', color: v.abnormal ? c.danger : c.text }}>{v.value}</Text>
                </View>
              ))}
            </View>
            <Button label="Take a history" icon="chatbubbles" onPress={() => go(1)} />
          </>
        )}
        {stage === 1 && (
          <>
            <T v="sub">Tap the questions you want to ask. Useless questions cost efficiency points.</T>
            <StepList items={k.history} prefix="h" />
            <Button label="Go to physical exam" icon="body" onPress={() => go(2)} />
          </>
        )}
        {stage === 2 && (
          <>
            <T v="sub">Choose which parts of the exam to perform.</T>
            <StepList items={k.exam} prefix="e" />
            <Button label="Order tests" icon="flask" onPress={() => go(3)} />
          </>
        )}
        {stage === 3 && (
          <>
            <T v="sub">Order labs and imaging. Unnecessary tests cost time and points.</T>
            <StepList items={k.tests} prefix="t" />
            <Button label="Make a diagnosis" icon="bulb" onPress={() => go(4)} />
          </>
        )}
        {stage === 4 && (
          <>
            <T v="h3">What is the most likely diagnosis?</T>
            <Choice options={k.diagnoses} value={dx} onPick={setDx} />
            <Button label="Commit" disabled={dx === null} onPress={() => go(5)} />
          </>
        )}
        {stage === 5 && (
          <>
            <Card style={{ borderColor: dx === k.answer ? c.success : c.danger, borderWidth: 1 }}>
              <T v="label" color={dx === k.answer ? c.success : c.danger}>
                {dx === k.answer ? 'Correct diagnosis' : 'Not quite'}
              </T>
              <T v="h3">{k.diagnoses[k.answer]}</T>
            </Card>
            <T v="h3">What is the best next management?</T>
            <Choice options={k.treatments} value={tx} onPick={setTx} />
            <Button
              label="Finish case"
              disabled={tx === null}
              onPress={() => {
                recordCase(k.id, total);
                go(6);
              }}
            />
          </>
        )}
        {stage === 6 && (
          <>
            <Card style={{ alignItems: 'center' }}>
              <T v="label">Case score</T>
              <Text style={{ fontSize: 48, fontWeight: '800', color: total >= 70 ? c.success : c.warn }}>{total}</Text>
              <T v="small">out of 100</T>
            </Card>
            <Card>
              <ScoreRow label="Diagnosis" pts={dxPts} max={40} />
              <ScoreRow label="Management" pts={txPts} max={30} />
              <ScoreRow label={`Thoroughness (${foundRelevant}/${relevant.length} key findings)`} pts={thorough} max={15} />
              <ScoreRow label={`Efficiency (${wasted.length} unneeded)`} pts={efficiency} max={15} />
            </Card>
            <Card>
              <T v="label">Correct management</T>
              <T>{k.treatments[k.treatmentAnswer]}</T>
            </Card>
            {wasted.length > 0 && (
              <Card>
                <T v="label" color={c.warn}>
                  Not needed
                </T>
                {wasted.map((w) => (
                  <Bullet key={w.id}>{w.label}</Bullet>
                ))}
              </Card>
            )}
            <Card>
              <T v="label">Teaching points</T>
              {k.teaching.map((t) => (
                <Bullet key={t}>{t}</Bullet>
              ))}
            </Card>
            {article && <Button kind="secondary" icon="book" label={`Read: ${article.title}`} onPress={() => router.push(`/article/${article.id}`)} />}
            <Button
              label="Try again"
              kind="ghost"
              onPress={() => {
                setPicked([]);
                setDx(null);
                setTx(null);
                go(0);
              }}
            />
            <Button label="Back to cases" onPress={() => router.back()} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

function ScoreRow({ label, pts, max }: { label: string; pts: number; max: number }) {
  const { c } = useTheme();
  return (
    <View style={{ gap: 4, marginBottom: 4 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        <T v="sub" color={c.text} style={{ flex: 1 }}>
          {label}
        </T>
        <T v="sub">
          {pts}/{max}
        </T>
      </View>
      <Progress value={pts / max} color={pts / max >= 0.7 ? c.success : c.warn} />
    </View>
  );
}
