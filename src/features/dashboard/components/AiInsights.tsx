import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card/Card';
import { useJournalEntriesStore } from '@/features/journal-entries/store/useJournalEntriesStore';
import { colors } from '@/utils/colors';
import { moodKeywords } from '@/utils/moodUtils';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { countMultipleKeywordMentions } from '../utils/analyzeEntries';

export const AiInsights = () => {
  const { entries } = useJournalEntriesStore();

  if (!entries || entries.length === 0) return null;

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  
  const mentions = countMultipleKeywordMentions({
    entries,
    keywords: [...moodKeywords],
    since: sevenDaysAgo,
  });

  // Filter to only show keywords that were actually mentioned
  const relevantInsights = Object.entries(mentions).filter(([, count]) => count > 0);

  if (relevantInsights.length === 0) return null;

  return (
    <Card 
    >
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent className="gap-2">
        <CardDescription> Here's what we noticed this week: </CardDescription>
        <View className="flex flex-col items-start justify-start w-full gap-2 p-4 h-fit">
        {relevantInsights.map(([keyword, count]) => (
            <View key={keyword} className="flex-row items-center w-full gap-1 mb-1">
              <Ionicons 
                name="arrow-forward" 
                size={18} 
                color={colors.primary}
              />
              <Text className="w-full" style={{ color: colors.textPrimary }}>
                <Text 
                  className="font-bold capitalize"
                  style={{ color: colors.textPrimary }}
                >
                  {keyword}
                </Text> mentioned {count} {count === 1 ? 'time' : 'times'}
              </Text>
            </View>
          ))}
        </View>
      </CardContent>
      
    </Card>
  );
};