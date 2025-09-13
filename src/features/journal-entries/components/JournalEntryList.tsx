import { COLORS } from '@/constants/colors';
import { ReactElement } from 'react';
import { ActivityIndicator, FlatList, Text, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { JournalEntryItem } from '../journal-entry-item/components/JournalEntryItem';
import { JournalEntry } from '../types';

interface Props {
  entries: JournalEntry[];
  isLoading: boolean;
  error: unknown;
  ListHeaderComponent?: ReactElement;
}

export const JournalEntryList = ({ entries, isLoading, error, ListHeaderComponent }: Props) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <ActivityIndicator size="large" />
        <Text style={{ color: colors.textMuted }}>Loading your journal entries...</Text>
      </View>
    );
  }

  if (error) {
    console.error('Journal Entries Fetch Error:', error);
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}
      >
        <Text style={{ color: colors.textError, fontWeight: '500', textAlign: 'center' }}>
          Failed to load your journal entries.
        </Text>
      </View>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}
      >
        <Text style={{ color: colors.textPrimary, fontSize: 18, textAlign: 'center' }}>
          You haven’t logged any mood entries yet. Tap the + button to add your first one!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: insets.bottom + 32,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => <JournalEntryItem entry={item} />}
    />
  );
};
