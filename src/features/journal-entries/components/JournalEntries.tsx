import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { useCurrentUserJournalEntries } from '../hooks/useCurrentUserJournalEntries';
import { JournalEntryItem } from '../journal-entry-item/components/JournalEntryItem';

type Props = {
  scrollY?: Animated.Value;
  headerHeight?: number;
};

export const JournalEntries = ({ scrollY, headerHeight = 128 }: Props) => {
  // If no scrollY provided, create a local one (keeps this component flexible)
  const localScrollY = useRef(new Animated.Value(0)).current;
  const y = scrollY ?? localScrollY;

  const insets = useSafeAreaInsets();
  const { data: entries, isLoading, error } = useCurrentUserJournalEntries();

  if (isLoading)
    return <LoadingState message="Loading your journal entries..." />;
  if (error)
    return <ErrorState message="Failed to load your journal entries." />;

  if (!entries || entries.length === 0) {
    return (
      <View style={{ flex: 1, paddingTop: headerHeight }}>
        <EmptyState message="You haven't logged any mood entries yet. Tap the + button to add your first one!" />
      </View>
    );
  }

  return (
    <Animated.FlatList
      data={entries}
      keyExtractor={(item) => item.id.toString()}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y } } }],
        { useNativeDriver: false } // Set to false for backgroundColor interpolation
      )}
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: insets.bottom + 52,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 16 }}>
          <JournalEntryItem key={item.id} entry={item} />
        </View>
      )}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={true}
    />
  );
};
