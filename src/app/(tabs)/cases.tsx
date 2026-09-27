import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Card, Screen, T } from '../../components/ui';
import { CASES } from '../../data/cases';
import { systemById } from '../../data/meta';
import { useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';

export default function Cases() {
  const { state } = useStore();
  const { c } = useTheme();
  return (
    <Screen>
      <T v="sub">
        Work up a patient from the door. Take a history, examine, order tests, then commit to a diagnosis and plan. You score points for accuracy and lose them for tests you did not need.
      </T>
      {CASES.map((k) => {
        const s = systemById(k.system);
        const best = state.cases[k.id]?.score;
        return (
          <Card key={k.id} onPress={() => router.push(`/case/${k.id}`)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: s.color + '22', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={s.icon as never} size={22} color={s.color} />
              </View>
              <View style={{ flex: 1 }}>
                <T v="h3">{k.title}</T>
                <T v="small">
                  {k.patient} · {k.setting}
                </T>
              </View>
              {best !== undefined ? (
                <View style={{ backgroundColor: best >= 70 ? c.successSoft : c.warnSoft, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
                  <T v="small" color={best >= 70 ? c.success : c.warn} style={{ fontWeight: '700' }}>
                    {best}
                  </T>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={18} color={c.sub} />
              )}
            </View>
            <T v="small">
              {s.name} · {'●'.repeat(k.difficulty)}
              {'○'.repeat(3 - k.difficulty)}
            </T>
          </Card>
        );
      })}
    </Screen>
  );
}
