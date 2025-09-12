import { useMemo, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_COLORS } from '@/constants/colors';
import { HistoryScreenHeader } from '@/features/history/components/HistoryScreenHeader';
import { JournalEntries } from '@/features/journal-entries/components/JournalEntries';
import { SortOrder } from '@/types';

export default function HistoryScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const [searchCommitted, setSearchCommitted] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');

  const headerHeight = useMemo(() => insets.top + 96, [insets.top]);

  return (
    <View style={{ flex: 1, backgroundColor: APP_COLORS['primary-background'] }}>
      <HistoryScreenHeader
        scrollY={scrollY}
        onSearchCommit={(value) => setSearchCommitted(value.trim())}
        sortOrder={sortOrder}
        onSortLatest={() => setSortOrder('latest')}
        onSortOldest={() => setSortOrder('oldest')}
      />
      <JournalEntries
        scrollY={scrollY}
        headerHeight={headerHeight + 62}
        search={searchCommitted}
        sortOrder={sortOrder}
      />
    </View>
  );
}
