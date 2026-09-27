import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { imagingById } from '../data/imaging';
import { useTheme } from '../lib/theme';
import { imageAspect, ImagingRenderer } from './imaging/ImagingRenderer';
import { T } from './ui';

export function ImageViewer({ id, findings = false }: { id: string; findings?: boolean }) {
  const { c } = useTheme();
  const study = imagingById(id);
  const [width, setWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [labels, setLabels] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const w = width * zoom;
  const h = w * imageAspect(id);
  const spots = findings && labels ? (study?.findings ?? []) : [];

  return (
    <View style={{ gap: 8 }}>
      <View
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        style={{ borderRadius: 12, overflow: 'hidden', backgroundColor: '#000', minHeight: 60 }}
      >
        {width > 0 && (
          <ScrollView horizontal scrollEnabled={zoom > 1} showsHorizontalScrollIndicator={zoom > 1}>
            <ScrollView scrollEnabled={zoom > 1} nestedScrollEnabled style={{ maxHeight: zoom > 1 ? width * 1.1 : undefined }}>
              <View style={{ width: w, height: h }}>
                <ImagingRenderer id={id} width={w} />
                {spots.map((f, i) => (
                  <Pressable
                    key={f.label}
                    onPress={() => setActive(active === i ? null : i)}
                    hitSlop={10}
                    style={{
                      position: 'absolute',
                      left: (f.x / 100) * w - 13,
                      top: (f.y / 100) * h - 13,
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: active === i ? '#FFD400' : 'rgba(0,200,160,0.9)',
                      borderWidth: 2,
                      borderColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: '#000', fontWeight: '800', fontSize: 12 }}>{i + 1}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        )}
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {findings && (
          <ToolButton icon={labels ? 'eye-off' : 'eye'} label={labels ? 'Hide findings' : 'Show findings'} onPress={() => { setLabels(!labels); setActive(null); }} />
        )}
        <ToolButton icon={zoom > 1 ? 'contract' : 'expand'} label={zoom > 1 ? 'Fit' : 'Zoom 2x'} onPress={() => setZoom(zoom > 1 ? 1 : 2)} />
      </View>
      {spots.length > 0 && (
        <View style={{ gap: 6 }}>
          {spots.map((f, i) => (
            <Pressable key={f.label} onPress={() => setActive(active === i ? null : i)} style={{ flexDirection: 'row', gap: 10, padding: 10, borderRadius: 10, backgroundColor: active === i ? c.warnSoft : c.card, borderWidth: 1, borderColor: c.border }}>
              <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: c.onPrimary, fontWeight: '800', fontSize: 12 }}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <T v="h3" style={{ fontSize: 14.5 }}>
                  {f.label}
                </T>
                <T v="sub">{f.detail}</T>
              </View>
            </Pressable>
          ))}
        </View>
      )}
      <T v="small">Schematic illustration for study purposes.</T>
    </View>
  );
}

function ToolButton({ icon, label, onPress }: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: c.chip, opacity: pressed ? 0.7 : 1 })}>
      <Ionicons name={icon} size={16} color={c.text} />
      <Text style={{ color: c.text, fontWeight: '600', fontSize: 13 }}>{label}</Text>
    </Pressable>
  );
}
