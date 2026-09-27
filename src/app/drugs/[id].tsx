import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Bullet, Card, Row, Screen, T } from '../../components/ui';
import { drugById } from '../../data/drugs';
import { systemById } from '../../data/meta';
import { useTheme } from '../../lib/theme';

export default function DrugDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const d = drugById(id);
  const { c } = useTheme();
  if (!d) return null;
  const Section = ({ title, items }: { title: string; items: string[] }) =>
    items.length ? (
      <Card>
        <T v="label">{title}</T>
        {items.map((i) => (
          <Bullet key={i}>{i}</Bullet>
        ))}
      </Card>
    ) : null;
  return (
    <Screen>
      <Stack.Screen options={{ title: d.name }} />
      <T v="label" color={systemById(d.system).color}>
        {d.drugClass}
      </T>
      <T v="title">{d.name}</T>
      <Card style={{ backgroundColor: c.primarySoft, borderColor: c.primarySoft }}>
        <T v="label">Mechanism</T>
        <T>{d.mechanism}</T>
      </Card>
      <Section title="Uses" items={d.uses} />
      <Section title="Adverse effects" items={d.adverse} />
      <Section title="Interactions" items={d.interactions} />
      <Card style={{ backgroundColor: c.warnSoft, borderColor: c.warn, borderWidth: 1 }}>
        <T v="label" color={c.warn}>
          Pearl
        </T>
        <T>{d.pearls}</T>
      </Card>
      {d.similar.length > 0 && (
        <View style={{ gap: 8 }}>
          <T v="label">Compare with</T>
          {d.similar.map((s) => {
            const o = drugById(s);
            return o ? <Row key={s} icon="swap-horizontal" title={o.name} subtitle={o.drugClass} onPress={() => router.push(`/drugs/${s}`)} /> : null;
          })}
        </View>
      )}
    </Screen>
  );
}
