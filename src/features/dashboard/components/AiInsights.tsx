import { APP_COLORS, COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { moodKeywords } from '@/utils/moodUtils';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, useColorScheme } from 'react-native';
import { countMultipleKeywordMentions } from '../utils/analyzeEntries';
import { Plan } from '@/features/paywall/types';
import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';

export const AiInsights = () => {
  const { data: entries = [] } = useCurrentUserJournalEntries();

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  if (!entries || entries.length === 0) {
    return (
      <DashboardSection>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              color: APP_COLORS['body-text'],
              fontSize: 20,
              fontWeight: '600',
              fontFamily: 'Manrope',
            }}
          >
            AI Insights
          </Text>
        </View>
        <View style={{ gap: 8, paddingVertical: 8 }}>
          <Text style={{ color: APP_COLORS.secondary }}>
            We didn't find any significant patterns in your entries this week.
          </Text>
        </View>
      </DashboardSection>
    );
  }

  const mentions = countMultipleKeywordMentions({
    entries,
    keywords: [...moodKeywords],
    since: sevenDaysAgo,
  });

  const relevantInsights = Object.entries(mentions).filter(
    ([, count]) => count > 0
  );

  if (relevantInsights.length === 0) {
    return (
      <DashboardSection>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              color: APP_COLORS['body-text'],
              fontSize: 20,
              fontWeight: '600',
              fontFamily: 'Manrope',
            }}
          >
            AI Insights
          </Text>
        </View>
        <View style={{ gap: 8, paddingVertical: 8 }}>
          <Text style={{ color: APP_COLORS.secondary }}>
            We didn't find any significant patterns in your entries this week.
          </Text>
        </View>
      </DashboardSection>
    );
  }

  return (
    <DashboardSection>
      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            color: APP_COLORS['body-text'],
            fontSize: 20,
            fontWeight: '600',
            fontFamily: 'Manrope',
          }}
        >
          AI Insights
        </Text>
      </View>
      <View style={{ gap: 8, paddingVertical: 8 }}>
        <Text style={{ color: APP_COLORS.secondary, marginBottom: 8, fontFamily: 'Manrope' }}>
          Here's what we noticed this week:
        </Text>
        <View style={{ flexDirection: 'column', gap: 8 }}>
          {relevantInsights.map(([keyword, count]) => (
            <View
              key={keyword}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <IconSymbol
                name="dot"
                size={10}
                color={APP_COLORS.primary}
              />
              <Text style={{ color: APP_COLORS['body-text'], flexShrink: 1 }}>
                <Text
                  style={{
                    fontWeight: '700',
                    textTransform: 'capitalize',
                    color: APP_COLORS['body-text'],
                    fontFamily: 'Manrope',
                  }}
                >
                  {keyword}
                </Text>{' '}
                mentioned {count} {count === 1 ? 'time' : 'times'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </DashboardSection>
  );
};
