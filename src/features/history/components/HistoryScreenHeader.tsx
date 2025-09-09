import { AnimatedScreenHeader } from '@/components/screen-header/AnimatedScreenHeader';
import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';
import { useEntrySelectionStore } from '@/features/journal-entries/store/useEntrySelectionStore';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { SortOrder } from '@/types';
import { router } from 'expo-router';
import React from 'react';
import { Animated, Text, View } from 'react-native';
import { HeaderSearchBar } from './HeaderSearchBar';

type Props = {
  onSearchCommit: (text: string) => void;
  scrollY?: Animated.Value;
  sortOrder?: SortOrder;
  onSortLatest?: () => void;
  onSortOldest?: () => void;
};

export function HistoryScreenHeader({
  scrollY,
  onSearchCommit,
  sortOrder,
  onSortLatest,
  onSortOldest,
}: Props) {
  const { t } = useAppLocale();

  const { selectedIds, selectionMode, setSelectionMode, clearSelection, selectAll, isAllSelected } =
    useEntrySelectionStore();

  // Grab entries so we can do selectAll
  const { data: entries = [] } = useCurrentUserJournalEntries();

  const toggleSelectionMode = () => {
    if (selectionMode) {
      // exit mode: clear selections and turn off mode
      clearSelection();
      setSelectionMode(false);
    } else {
      setSelectionMode(true);
    }
  };

  const handleSelectAll = () => {
    if (!selectionMode) {
      setSelectionMode(true);
      selectAll(entries);
    } else {
      if (isAllSelected(entries)) {
        clearSelection();
      } else {
        selectAll(entries);
      }
    }
  };

  return (
    <AnimatedScreenHeader
      title={t('HistoryScreenHeader.title')}
      subtitle={t('HistoryScreenHeader.description')}
      scrollY={scrollY}
      bottomComponent={<HeaderSearchBar onCommit={onSearchCommit} />}
      rightComponent={
        <View>
          {selectionMode ? (
            <Text style={{ fontWeight: '400', fontSize: 14, fontFamily: 'Manrope' }}>
              {selectedIds.size} {t('Common.selected')}
            </Text>
          ) : null}
        </View>
      }
      showMenu
      menuItems={[
        {
          key: 'add-entry',
          label: t('HistoryScreenHeader.menu.add-new-entry'),
          icon: 'add',
          onPress: () => router.push('/add-entry'),
        },
        {
          key: 'toggle-selection-mode',
          label: selectionMode
            ? t('HistoryScreenHeader.menu.exit-selection-mode')
            : t('HistoryScreenHeader.menu.select-mode'),
          icon: selectionMode ? 'unselect' : 'select',
          onPress: toggleSelectionMode,
        },
        {
          key: 'select-all',
          label: isAllSelected(entries)
            ? t('HistoryScreenHeader.menu.deselect-all-entries')
            : t('HistoryScreenHeader.menu.select-all-entries'),
          icon: isAllSelected(entries) ? 'group-unselect' : 'group-select',
          onPress: handleSelectAll,
          // disabled: entries.length === 0,
        },
        {
          key: 'sort-by-latest',
          label: t('HistoryScreenHeader.menu.sort-by-latest'),
          icon: 'sort-ascending',
          onPress: onSortLatest,
          showSelectedState: sortOrder === 'latest',
        },
        {
          key: 'sort-by-oldest',
          label: t('HistoryScreenHeader.menu.sort-by-oldest'),
          icon: 'sort-descending',
          onPress: onSortOldest,
          showSelectedState: sortOrder === 'oldest',
        },
      ]}
      applyTopPadding
      titleStyle={{ fontSize: 24 }}
    />
  );
}
