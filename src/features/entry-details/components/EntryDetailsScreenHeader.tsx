import { AnimatedScreenHeader } from '@/components/screen-header/AnimatedScreenHeader';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';
import { APP_COLORS } from '@/constants/colors';
import { useDeleteJournalEntry } from '@/features/journal-entries/hooks/useDeleteJournalEntry';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Animated, Pressable } from 'react-native';

type Props = {
  entryId: string;
  scrollY?: Animated.Value;
};

export function EntryDetailsScreenHeader({ scrollY, entryId }: Props) {
  const i18n = useAppLocale();
  const deleteJournalEntry = useDeleteJournalEntry();

  const handleDelete = async () => {
    Alert.alert(
      i18n.t('JournalEntryDetails.Alert.deleteEntryTitle'),
      i18n.t('JournalEntryDetails.Alert.deleteEntryDescription'),
      [
        { text: i18n.t('JournalEntryDetails.Alert.cancel'), style: 'cancel' },
        {
          text: i18n.t('JournalEntryDetails.Alert.deleteEntry'),
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteJournalEntry.mutateAsync({ id: entryId });
              router.replace('/history');
            } catch (err) {
              Alert.alert(
                i18n.t('JournalEntryDetails.Alert.errorDeletingEntryTitle'),
                i18n.t(
                  'JournalEntryDetails.Alert.errorDeletingEntryDescription'
                )
              );
            }
          },
        },
      ]
    );
  };

  return (
    <AnimatedScreenHeader
      title={i18n.t('JournalEntryDetails.title')}
      scrollY={scrollY}
      applyTopPadding={false}
      titleStyle={{ textAlign: 'center' }}
      leftComponent={
        <Pressable onPress={() => router.back()}>
          <IconSymbol
            name="chevron-left"
            size={20}
            color={APP_COLORS['body-text']}
          />
        </Pressable>
      }
      menuItems={[
        {
          key: 'delete-entry',
          label: i18n.t('JournalEntryDetails.Alert.deleteEntryTitle'),
          icon: 'trash',
          destructive: true,
          onPress: handleDelete,
        },
      ]}
    />
  );
}
