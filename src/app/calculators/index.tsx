import { router, Stack } from 'expo-router';
import { View } from 'react-native';
import { Row, Screen, T } from '../../components/ui';
import { CALCULATORS } from '../../data/calculators';

export default function Calculators() {
  const cats = Array.from(new Set(CALCULATORS.map((c) => c.category)));
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Calculators' }} />
      {cats.map((cat) => (
        <View key={cat} style={{ gap: 8 }}>
          <T v="label" style={{ marginTop: 4 }}>
            {cat}
          </T>
          {CALCULATORS.filter((c) => c.category === cat).map((c) => (
            <Row key={c.id} icon="calculator" title={c.name} subtitle={c.description} onPress={() => router.push(`/calculators/${c.id}`)} />
          ))}
        </View>
      ))}
    </Screen>
  );
}
