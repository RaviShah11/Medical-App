import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ImageViewer } from '../../components/ImageViewer';
import { Button, Card, Screen, T } from '../../components/ui';
import { articleById } from '../../data/articles';
import { imagingById } from '../../data/imaging';
import { systemById } from '../../data/meta';

export default function ImagingDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const s = imagingById(id);
  if (!s) return null;
  const article = s.articleId ? articleById(s.articleId) : null;
  return (
    <Screen>
      <Stack.Screen options={{ title: s.modality }} />
      <T v="label" color={systemById(s.system).color}>
        {s.modality === systemById(s.system).name ? s.modality : `${s.modality} · ${systemById(s.system).name}`}
      </T>
      <T v="title">{s.diagnosis}</T>
      <T v="sub">{s.clinical}</T>
      <ImageViewer id={s.id} findings />
      <Card>
        <T v="label">Key point</T>
        <T>{s.teaching}</T>
      </Card>
      {article && <Button kind="secondary" icon="book" label={`Read: ${article.title}`} onPress={() => router.push(`/article/${article.id}`)} />}
    </Screen>
  );
}
