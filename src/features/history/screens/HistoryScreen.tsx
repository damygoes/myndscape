import React, { useMemo, useRef, useState } from 'react';
import { Animated, View, clearTimeout, setTimeout } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_COLORS } from '@/constants/colors';
import { HistoryScreenHeader } from '@/features/history/components/HistoryScreenHeader';
import { JournalEntries } from '@/features/journal-entries/components/JournalEntries';
import { SortOrder } from '@/types';

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function HistoryScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const [search] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
  const debouncedSearch = useDebouncedValue(search, 300);

  // Header height (safe-area + header content)
  const headerHeight = useMemo(() => insets.top + 96, [insets.top]);

  return (
    <View style={{ flex: 1, backgroundColor: APP_COLORS['primary-background'] }}>
      {/* Fixed, animated header */}
      <HistoryScreenHeader
        scrollY={scrollY}
        onSortLatest={() => setSortOrder('latest')}
        onSortOldest={() => setSortOrder('oldest')}
      />
      <JournalEntries
        scrollY={scrollY}
        // Add searchbar's height (~52 including spacing)
        headerHeight={headerHeight + 62}
        search={debouncedSearch}
        sortOrder={sortOrder}
      />
    </View>
  );
}
