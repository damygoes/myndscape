import { COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { useCurrentUserEntries } from '@/features/journal-entries/hooks/useCurrentUserEntries';
import { moodKeywords } from '@/utils/moodUtils';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, useColorScheme } from 'react-native';
import { countMultipleKeywordMentions } from '../utils/analyzeEntries';
import { PaywallGate } from '@/features/paywall/components/PaywallGate';
import { Plan } from '@/features/paywall/types';

export const AiInsights = () => {
  const { data: entries = [] } = useCurrentUserEntries();
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  if (!entries || entries.length === 0) {
    return (
      <DashboardSection>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 20,
              fontWeight: '600',
            }}
          >
            AI Insights
          </Text>
        </View>
        <View style={{ gap: 8, paddingVertical: 8 }}>
          <Text style={{ color: colors.textSecondary }}>
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
              color: colors.textPrimary,
              fontSize: 20,
              fontWeight: '600',
            }}
          >
            AI Insights
          </Text>
        </View>
        <View style={{ gap: 8, paddingVertical: 8 }}>
          <Text style={{ color: colors.textSecondary }}>
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
            color: colors.textPrimary,
            fontSize: 20,
            fontWeight: '600',
          }}
        >
          AI Insights
        </Text>
      </View>
      <PaywallGate require={Plan.PREMIUM}>
        <View style={{ gap: 8, paddingVertical: 8 }}>
          <Text style={{ color: colors.textSecondary, marginBottom: 8 }}>
            Here's what we noticed this week:
          </Text>
          <View style={{ flexDirection: 'column', gap: 8 }}>
            {relevantInsights.map(([keyword, count]) => (
              <View
                key={keyword}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
              >
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={colors.primary}
                />
                <Text style={{ color: colors.textPrimary, flexShrink: 1 }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      textTransform: 'capitalize',
                      color: colors.textPrimary,
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
      </PaywallGate>
    </DashboardSection>
  );
};
