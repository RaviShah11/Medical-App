import { useColorScheme } from 'react-native';
import { useStore } from './store';

const light = {
  bg: '#F4F6F9',
  card: '#FFFFFF',
  text: '#0F172A',
  sub: '#5B6475',
  border: '#E2E7EE',
  primary: '#0B7A65',
  primarySoft: '#DDF3EC',
  onPrimary: '#FFFFFF',
  danger: '#C93B3B',
  dangerSoft: '#FBE4E4',
  success: '#23884F',
  successSoft: '#DDF3E5',
  warn: '#B7791F',
  warnSoft: '#FDF1D8',
  chip: '#EBEFF4',
  highlight: '#FFF1A8',
  tabBar: '#FFFFFF',
};

const dark: typeof light = {
  bg: '#0B0F14',
  card: '#151B23',
  text: '#E6EDF3',
  sub: '#98A4B1',
  border: '#253041',
  primary: '#33C19F',
  primarySoft: '#123A31',
  onPrimary: '#04140F',
  danger: '#F07272',
  dangerSoft: '#3A1818',
  success: '#52C483',
  successSoft: '#133222',
  warn: '#F0B429',
  warnSoft: '#3A2E0F',
  chip: '#1D2632',
  highlight: '#5C4E0A',
  tabBar: '#10151C',
};

export type Colors = typeof light;

export function useTheme() {
  const scheme = useColorScheme();
  const { state } = useStore();
  const isDark = state.themePref === 'system' ? scheme === 'dark' : state.themePref === 'dark';
  return { c: isDark ? dark : light, isDark };
}
