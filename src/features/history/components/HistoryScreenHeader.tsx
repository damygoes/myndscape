import { AnimatedScreenHeader } from '@/components/screen-header/AnimatedScreenHeader';
import { IconSymbolName } from '@/components/ui/IconSymbol.ios';
import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';
import { useDeleteJournalEntries } from '@/features/journal-entries/hooks/useDeleteJournalEntries';
import { useEntrySelectionStore } from '@/features/journal-entries/store/useEntrySelectionStore';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { SortOrder } from '@/types';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Animated, Text, View } from 'react-native';
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
  const deleteMutation = useDeleteJournalEntries();

  // Grab entries so we can do selectAll
  const { data: entries = [] } = useCurrentUserJournalEntries();

  const isAnySelected = selectedIds.size > 0;

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

  const handleDeleteSelected = () => {
    Alert.alert(
      t('JournalEntryDetails.Alert.deleteEntryTitle'),
      t('JournalEntryDetails.Alert.deleteEntryDescription'),
      [
        { text: t('JournalEntryDetails.Alert.cancel'), style: 'cancel' },
        {
          text: t('JournalEntryDetails.Alert.deleteEntry'),
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMutation.mutateAsync({ ids: Array.from(selectedIds) });
              clearSelection();
              setSelectionMode(false);
            } catch (err) {
              console.error('Failed to delete entries:', err);
              Alert.alert(
                t('JournalEntryDetails.Alert.errorDeletingEntryTitle'),
                t('JournalEntryDetails.Alert.errorDeletingEntryDescription')!,
              );
            }
          },
        },
      ],
    );
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
        ...(isAnySelected
          ? [
              {
                key: 'delete-selected',
                label: t('JournalEntryDetails.Alert.deleteEntryTitle'),
                icon: 'trash' as IconSymbolName,
                onPress: handleDeleteSelected,
                destructive: true,
              },
            ]
          : []),
      ]}
      applyTopPadding
      titleStyle={{ fontSize: 24 }}
    />
  );
}
