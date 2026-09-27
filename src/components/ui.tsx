import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../lib/theme';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export function Screen({ children, scroll = true, style }: { children: ReactNode; scroll?: boolean; style?: StyleProp<ViewStyle> }) {
  const { c } = useTheme();
  if (!scroll) return <View style={[{ flex: 1, backgroundColor: c.bg, padding: 16 }, style]}>{children}</View>;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={[{ padding: 16, paddingBottom: 48, gap: 12 }, style]} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

type Variant = 'title' | 'h2' | 'h3' | 'body' | 'sub' | 'small' | 'label';

const sizes: Record<Variant, TextStyle> = {
  title: { fontSize: 26, fontWeight: '800', letterSpacing: -0.4 },
  h2: { fontSize: 19, fontWeight: '700' },
  h3: { fontSize: 16, fontWeight: '700' },
  body: { fontSize: 15.5, lineHeight: 23 },
  sub: { fontSize: 14, lineHeight: 20 },
  small: { fontSize: 12.5, lineHeight: 17 },
  label: { fontSize: 12, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' },
};

export function T({ v = 'body', color, style, children, numberOfLines }: { v?: Variant; color?: string; style?: StyleProp<TextStyle>; children: ReactNode; numberOfLines?: number }) {
  const { c } = useTheme();
  const muted = v === 'sub' || v === 'small' || v === 'label';
  return (
    <Text numberOfLines={numberOfLines} style={[sizes[v], { color: color ?? (muted ? c.sub : c.text) }, style]}>
      {children}
    </Text>
  );
}

export function Card({ children, style, onPress }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  const { c } = useTheme();
  const base = [{ backgroundColor: c.card, borderColor: c.border, borderWidth: StyleSheet.hairlineWidth, borderRadius: 14, padding: 16, gap: 8 }, style];
  if (!onPress) return <View style={base}>{children}</View>;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [base, pressed && { opacity: 0.7 }]}>
      {children}
    </Pressable>
  );
}

export function Button({
  label,
  onPress,
  kind = 'primary',
  icon,
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  kind?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: IconName;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { c } = useTheme();
  const bg = kind === 'primary' ? c.primary : kind === 'danger' ? c.danger : kind === 'secondary' ? c.chip : 'transparent';
  const fg = kind === 'primary' ? c.onPrimary : kind === 'danger' ? '#fff' : kind === 'ghost' ? c.primary : c.text;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        { backgroundColor: bg, borderRadius: 12, paddingVertical: 13, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: disabled ? 0.4 : pressed ? 0.75 : 1 },
        style,
      ]}
    >
      {icon && <Ionicons name={icon} size={18} color={fg} />}
      <Text style={{ color: fg, fontWeight: '700', fontSize: 15.5 }}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label, active, onPress, color }: { label: string; active?: boolean; onPress?: () => void; color?: string }) {
  const { c } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 999,
        backgroundColor: active ? (color ?? c.primary) : c.chip,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text style={{ color: active ? '#fff' : c.text, fontSize: 13.5, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}

export function ChipRow({ children }: { children: ReactNode }) {
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{children}</View>;
}

export function Progress({ value, color, height = 8 }: { value: number; color?: string; height?: number }) {
  const { c } = useTheme();
  return (
    <View style={{ height, borderRadius: height, backgroundColor: c.chip, overflow: 'hidden' }}>
      <View style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%`, height, backgroundColor: color ?? c.primary, borderRadius: height }} />
    </View>
  );
}

export function Row({ icon, iconColor, title, subtitle, right, onPress }: { icon?: IconName; iconColor?: string; title: string; subtitle?: string; right?: ReactNode; onPress?: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: c.card,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: c.border,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {icon && (
        <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: (iconColor ?? c.primary) + '22', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={icon} size={19} color={iconColor ?? c.primary} />
        </View>
      )}
      <View style={{ flex: 1, gap: 2 }}>
        <T v="h3" style={{ fontWeight: '600', fontSize: 15.5 }}>
          {title}
        </T>
        {subtitle ? <T v="small">{subtitle}</T> : null}
      </View>
      {right ?? (onPress ? <Ionicons name="chevron-forward" size={18} color={c.sub} /> : null)}
    </Pressable>
  );
}

export function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  const { c } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: c.card, borderRadius: 14, padding: 12, borderWidth: StyleSheet.hairlineWidth, borderColor: c.border, gap: 2 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: color ?? c.text }}>{value}</Text>
      <T v="small">{label}</T>
    </View>
  );
}

export function Empty({ icon, text }: { icon: IconName; text: string }) {
  const { c } = useTheme();
  return (
    <View style={{ alignItems: 'center', padding: 32, gap: 10 }}>
      <Ionicons name={icon} size={40} color={c.sub} />
      <T v="sub" style={{ textAlign: 'center' }}>
        {text}
      </T>
    </View>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 10, paddingRight: 8 }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.primary, marginTop: 9 }} />
      <T style={{ flex: 1 }}>{children}</T>
    </View>
  );
}
