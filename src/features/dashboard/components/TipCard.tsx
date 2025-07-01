import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card/Card';
import { useJournalEntriesStore } from '@/features/journal-entries/store/useJournalEntriesStore';
import { colors } from '@/utils/colors';
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
    <Card style={{
      alignItems: 'flex-start',
      padding: 16,
      backgroundColor: colors.wellness.energy,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    }}>
      <CardHeader>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}>
          <Ionicons 
            name="bulb-outline" 
            size={18} 
            color={colors.success}
          />
          <CardTitle style={{
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: '600',
          }}>
            Tip
          </CardTitle>
        </View>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <View style={{
            flexDirection: 'column',
            gap: 8,
          }}>
            <Text style={{
              fontWeight: '500',
              color: colors.textPrimary,
              lineHeight: 20,
            }}>
              {intro}
            </Text>
            <Text style={{
              color: colors.textSecondary,
              lineHeight: 20,
            }}>
              {tipText}
            </Text>
          </View>
        </CardDescription>
      </CardContent>
    </Card>
  );
};