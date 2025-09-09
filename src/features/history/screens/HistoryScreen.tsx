import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_COLORS } from '@/constants/colors';
import { HistoryScreenHeader } from '@/features/history/components/HistoryScreenHeader';
import { JournalEntries } from '@/features/journal-entries/components/JournalEntries';

export default function HistoryScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // Calculate header height (safe area top + header content)
  const headerHeight = insets.top + 96;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS['primary-background'],
      }}
    >
      {/* Fixed header that animates with scroll */}
      <HistoryScreenHeader scrollY={scrollY} />

      {/* Scrollable content */}
      <JournalEntries scrollY={scrollY} headerHeight={headerHeight} />
    </View>
  );
}
