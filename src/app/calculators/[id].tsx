import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Button, Card, Chip, ChipRow, Screen, T } from '../../components/ui';
import { calculatorById } from '../../data/calculators';
import { useTheme } from '../../lib/theme';

export default function CalculatorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const calc = calculatorById(id);
  const { c } = useTheme();
  const [vals, setVals] = useState<Record<string, number | undefined>>({});
  const [text, setText] = useState<Record<string, string>>({});
  if (!calc) return null;
  const result = calc.compute(vals);

  return (
    <Screen>
      <Stack.Screen options={{ title: calc.name }} />
      <T v="sub">{calc.description}</T>
      {calc.inputs.map((inp) => {
        if (inp.kind === 'toggle') {
          const on = !!vals[inp.key];
          return (
            <Pressable
              key={inp.key}
              onPress={() => setVals({ ...vals, [inp.key]: on ? 0 : 1 })}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, backgroundColor: c.card, borderWidth: 1, borderColor: on ? c.primary : c.border }}
            >
              <Ionicons name={on ? 'checkbox' : 'square-outline'} size={22} color={on ? c.primary : c.sub} />
              <T style={{ flex: 1 }}>{inp.label}</T>
              {inp.points !== 0 && <T v="small">{inp.points > 0 ? `+${inp.points}` : inp.points}</T>}
            </Pressable>
          );
        }
        if (inp.kind === 'select') {
          return (
            <Card key={inp.key}>
              <T v="label">{inp.label}</T>
              <ChipRow>
                {inp.options.map((o) => (
                  <Chip key={o.label} label={o.label} active={vals[inp.key] === o.value} onPress={() => setVals({ ...vals, [inp.key]: o.value })} />
                ))}
              </ChipRow>
            </Card>
          );
        }
        return (
          <View key={inp.key} style={{ gap: 4 }}>
            <T v="label">
              {inp.label}
              {inp.unit ? ` (${inp.unit})` : ''}
            </T>
            <TextInput
              keyboardType="decimal-pad"
              value={text[inp.key] ?? ''}
              onChangeText={(t) => {
                setText({ ...text, [inp.key]: t });
                setVals({ ...vals, [inp.key]: t.trim() === '' ? undefined : parseFloat(t) });
              }}
              placeholder="Enter value"
              placeholderTextColor={c.sub}
              style={{ backgroundColor: c.card, borderColor: c.border, borderWidth: 1, borderRadius: 12, padding: 14, color: c.text, fontSize: 16 }}
            />
          </View>
        );
      })}
      <Card style={{ backgroundColor: result ? c.primarySoft : c.card, borderColor: c.primary, borderWidth: 1 }}>
        <T v="label">Result</T>
        {result ? (
          <>
            <Text style={{ fontSize: 28, fontWeight: '800', color: c.primary }}>{result.value}</Text>
            <T>{result.interpretation}</T>
          </>
        ) : (
          <T v="sub">Fill in the fields to see a result.</T>
        )}
      </Card>
      <Button
        kind="ghost"
        label="Clear"
        onPress={() => {
          setVals({});
          setText({});
        }}
      />
      <T v="small">For learning only. Always confirm with clinical judgment.</T>
    </Screen>
  );
}
