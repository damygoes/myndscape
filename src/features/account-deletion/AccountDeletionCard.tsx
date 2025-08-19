import { COLORS } from '@/constants/colors';
import { AccountDeletionText } from '@/features/account-deletion/AccountDeletionText';
import { Button, StyleSheet, Text, useColorScheme, View } from 'react-native';

interface AccountDeletionCardProps {
  userId: string;
}

export function AccountDeletionCard({ userId }: AccountDeletionCardProps) {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.cardBackground, shadowColor: colors.shadow },
      ]}
    >
      <Text
        style={{ color: colors.textPrimary, fontSize: 18, fontWeight: 'bold' }}
      >
        Danger Zone
      </Text>
      <AccountDeletionText userId={userId} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 18,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 30,
    width: '100%',
    gap: 16,
    backgroundColor: COLORS.dark.shadow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
});
