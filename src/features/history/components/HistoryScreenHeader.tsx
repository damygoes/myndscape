import { Input } from '@/components/input/Input';
import { AnimatedScreenHeader } from '@/components/screen-header/AnimatedScreenHeader';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { router } from 'expo-router';
import React from 'react';
import { Animated } from 'react-native';

type Props = {
  scrollY?: Animated.Value;
  search?: string;
  onSearchChange?: (text: string) => void;
  onSortLatest?: () => void;
  onSortOldest?: () => void;
};

export function HistoryScreenHeader({
  scrollY,
  search,
  onSearchChange,
  onSortLatest,
  onSortOldest,
}: Props) {
  const { t } = useAppLocale();

  const Searchbar = () => {
    return (
      <Input
        value={search}
        onChangeText={onSearchChange}
        placeholder="Search entries…"
        returnKeyType="search"
      />
    );
  };

  return (
    <AnimatedScreenHeader
      title={t('HistoryScreenHeader.title')}
      subtitle={t('HistoryScreenHeader.description')}
      scrollY={scrollY}
      bottomComponent={<Searchbar />}
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
        },
        {
          key: 'sort-by-oldest',
          label: t('HistoryScreenHeader.menu.sort-by-oldest'),
          icon: 'sort-descending',
          onPress: onSortOldest,
        },
      ]}
      applyTopPadding={true}
      titleStyle={{ fontSize: 24 }}
    />
  );
}
