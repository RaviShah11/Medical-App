import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { IconName } from '../../components/ui';
import { useTheme } from '../../lib/theme';

const TABS: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Home', icon: 'home' },
  { name: 'library', title: 'Library', icon: 'library' },
  { name: 'qbank', title: 'Qbank', icon: 'help-circle' },
  { name: 'cases', title: 'Cases', icon: 'medkit' },
  { name: 'tools', title: 'Tools', icon: 'grid' },
];

export default function TabsLayout() {
  const { c } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.sub,
        tabBarStyle: { backgroundColor: c.tabBar, borderTopColor: c.border },
        headerStyle: { backgroundColor: c.card },
        headerTitleStyle: { color: c.text, fontWeight: '800' },
        sceneStyle: { backgroundColor: c.bg },
      }}
    >
      {TABS.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            headerTitle: t.name === 'index' ? 'MedStudy' : t.title,
            tabBarIcon: ({ color, size }) => <Ionicons name={t.icon} color={color} size={size} />,
          }}
        />
      ))}
    </Tabs>
  );
}
