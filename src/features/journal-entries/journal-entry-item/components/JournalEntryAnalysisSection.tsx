import { APP_COLORS, COLORS } from '@/constants/colors';
import { Text, View } from 'react-native';
import { ThemesBadges } from './ThemesBadges';
import { TipSection } from './TipSection';

interface Props {
  summary: string | null;
  themes: string | null;
  tip: string | null;
}

export const JournalEntryAnalysisSection = ({
  summary,
  themes,
  tip,
}: Props) => {
  if (!summary && !themes && !tip) return null;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: APP_COLORS['primary-background'],
        gap: 20,
        padding: 12,
        borderRadius: 12,
      }}
    >
      {summary && (
        <Text
          className="text-base font-normal"
          style={{ color: APP_COLORS['body-text'] }}
        >
          {summary}
        </Text>
      )}

      <ThemesBadges themes={themes} />
      <TipSection tip={tip} />
    </View>
  );
};
