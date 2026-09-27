import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Screen, T, type IconName } from '../../components/ui';
import { dueCards } from '../../lib/stats';
import { useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';

export default function Tools() {
  const { c } = useTheme();
  const { state } = useStore();
  const tools: { title: string; sub: string; icon: IconName; color: string; href: Href }[] = [
    { title: 'Imaging atlas', sub: 'ECG, films, CT, smears', icon: 'scan', color: '#3E8FE0', href: '/imaging' },
    { title: 'Image challenge', sub: 'Name the finding', icon: 'eye', color: '#0090FF', href: '/imaging/challenge' },
    { title: 'Flashcards', sub: `${dueCards(state).length} due`, icon: 'layers', color: '#8E4EC6', href: '/flashcards' },
    { title: 'Lab values', sub: 'Ranges and causes', icon: 'flask', color: '#12A594', href: '/labs' },
    { title: 'Drugs', sub: 'Mechanisms and side effects', icon: 'medical', color: '#E5484D', href: '/drugs' },
    { title: 'Calculators', sub: 'Scores and formulas', icon: 'calculator', color: '#E08A1E', href: '/calculators' },
    { title: 'Differential builder', sub: 'Symptoms to diagnoses', icon: 'git-branch', color: '#D6409F', href: '/ddx' },
    { title: 'Study planner', sub: 'Schedule to exam day', icon: 'calendar', color: '#46A758', href: '/planner' },
    { title: 'Search', sub: 'Everything in one place', icon: 'search', color: '#5B5BD6', href: '/search' },
    { title: 'Settings', sub: 'Exam, theme, reset', icon: 'settings', color: '#8B8D98', href: '/settings' },
  ];
  return (
    <Screen>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {tools.map((t) => (
          <Pressable
            key={t.title}
            onPress={() => router.push(t.href)}
            style={({ pressed }) => ({ width: '48%', flexGrow: 1, backgroundColor: c.card, borderRadius: 14, padding: 14, gap: 8, borderWidth: 1, borderColor: c.border, opacity: pressed ? 0.7 : 1 })}
          >
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: t.color + '22', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={t.icon} size={22} color={t.color} />
            </View>
            <T v="h3">{t.title}</T>
            <T v="small">{t.sub}</T>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
