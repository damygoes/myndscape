import { colors } from '@/utils/colors';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { JournalEntryItem } from '../jornal-entry-item/components/JournalEntryItem';
import { JournalEntry } from '../types';

interface Props {
  entries: JournalEntry[];
  isLoading: boolean;
  error: unknown;
}

export const JournalEntryList = ({ entries, isLoading, error }: Props) => {

  const insets = useSafeAreaInsets();
  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 space-y-2">
        <ActivityIndicator size="large" />
        <Text style={{ color: colors.textMuted}}>Loading your journal entries...</Text>
      </View>
    );
  }

  if (error) {
    console.error('Journal Entries Fetch Error:', error);
    return (
      <View className="items-center justify-center flex-1 px-6">
        <Text className="font-medium text-center" style={{ color: colors.textError}}>
          Failed to load your journal entries.
        </Text>
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View className="items-center justify-center flex-1 px-10">
        <Text className="text-base text-center" style={{color: colors.textMuted}}>
          You haven’t logged any mood entries yet. Tap the + button to add your first one!
        </Text>
      </View>
    );
  }

  return (
      <FlatList
          data={entries}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 32,
          }}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item }) => <JournalEntryItem entry={item} />}
      />
  );
};
