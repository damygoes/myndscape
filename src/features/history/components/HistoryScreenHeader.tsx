import { AnimatedScreenHeader } from '@/components/screen-header/AnimatedScreenHeader';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { SortOrder } from '@/types';
import { router } from 'expo-router';
import React from 'react';
import { Animated } from 'react-native';
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

  return (
    <AnimatedScreenHeader
      title={t('HistoryScreenHeader.title')}
      subtitle={t('HistoryScreenHeader.description')}
      scrollY={scrollY}
      bottomComponent={<HeaderSearchBar onCommit={onSearchCommit} />}
      menuItems={[
        {
          key: 'add-entry',
          label: t('HistoryScreenHeader.menu.add-new-entry'),
          icon: 'add',
          onPress: () => router.push('/add-entry'),
        },
        {
          key: 'select-entries',
          label: t('HistoryScreenHeader.menu.select-entries'),
          icon: 'select',
          onPress: () => {
            /* TODO */
          },
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
