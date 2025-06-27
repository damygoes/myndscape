import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { JournalEntry } from '../types';
import { JournalEntryItem } from './JournalEntryItem';

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
        <Text className="text-gray-600">Loading your journal entries...</Text>
      </View>
    );
  }

  if (error) {
    console.error('Journal Entries Fetch Error:', error);
    return (
      <View className="items-center justify-center flex-1 px-6">
        <Text className="font-medium text-center text-red-500">
          Failed to load your journal entries.
        </Text>
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View className="items-center justify-center flex-1 px-8">
        <Text className="text-base text-center text-gray-500">
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
      padding: 16,
      paddingBottom: insets.bottom + 32,  // 👈 adds device safe area + extra space
    }}
    ItemSeparatorComponent={() => <View className="h-4" />}
    renderItem={({ item }) => <JournalEntryItem entry={item} />}
  />

  
  );
};
