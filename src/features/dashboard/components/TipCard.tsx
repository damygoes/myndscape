import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card/Card';
import { useJournalEntriesStore } from '@/features/journal-entries/store/useJournalEntriesStore';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { generateMoodTipMessage } from '../utils/generateMoodTipMessage';
import { getTipForMood } from '../utils/getTipForMood';

export const TipCard = () => {
  const { entries } = useJournalEntriesStore();
  const lastMood = entries?.[0]?.mood;
  const tip = getTipForMood(lastMood);

  const { intro, tip: tipText } = generateMoodTipMessage(lastMood, tip);

  return (
    <Card className="items-start p-4 bg-green-100 dark:bg-green-900">
      <CardHeader>
        <View className="flex-row items-center gap-1">
          <Ionicons name="bulb-outline" size={18} color="#10B981" />
          <CardTitle>Tip</CardTitle>
        </View>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-green-800">
          <View className="flex flex-col gap-2">
            <Text className="font-medium">{intro}</Text>
            <Text>{tipText}</Text>
          </View>
        </CardDescription>
      </CardContent>
    </Card>
  );
};