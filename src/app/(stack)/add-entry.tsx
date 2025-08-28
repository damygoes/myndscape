import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import { APP_COLORS } from '@/constants/colors';
import { useHandleJournalEntryCreation } from '@/features/journal-entries/hooks/useHandleJournalEntryCreation';
import { useCurrentUserProfile } from '@/features/profile/hooks/useCurrentUserProfile';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AddEntryScreen() {
  const i18n = useAppLocale();
  const { data: userProfile } = useCurrentUserProfile();

  const userDisplayName = useMemo(() => {
    return userProfile?.username || 'User';
  }, [userProfile]);

  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleCreateEntry, createIsPending } =
    useHandleJournalEntryCreation();

  const shouldDisableSubmit =
    isSubmitting || createIsPending;

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError(i18n.t('AddJournalEntry.error.empty'));
      return;
    }

    setError(null);
    setIsSubmitting(true);
    await handleCreateEntry(content);
    setContent('');
    setIsSubmitting(false);
    router.back();
  };

  const handleChange = (text: string) => {
    if (error) setError(null);
    setContent(text);
  };

  return (
    <ScrollView
      contentContainerStyle={{ padding: 24, flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {i18n.t('AddJournalEntry.description', { username: userDisplayName })}
        </Text>

        <Input
          value={content}
          onChangeText={handleChange}
          placeholder={i18n.t('AddJournalEntry.placeholder')}
          placeholderTextColor={APP_COLORS['body-text-disabled']}
          multiline
          style={{ minHeight: 100, padding: 16 }}
          inputWrapperStyle={{ borderRadius: 18 }}
          error={error ?? undefined}
        />

        {isSubmitting && (
          <View style={styles.analyzingContainer}>
            <Text style={styles.analyzingText}>
              {i18n.t('AddJournalEntry.loader')}
            </Text>
          </View>
        )}

        <Button
          title={
            isSubmitting
              ? i18n.t('AddJournalEntry.submitting')
              : i18n.t('AddJournalEntry.submit')
          }
          onPress={handleSubmit}
          disabled={shouldDisableSubmit}
          loading={isSubmitting}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 12,
  },
  title: {
    color: APP_COLORS['body-text'],
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 12,
    fontFamily: 'Manrope',
  },
  analyzingContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
    backgroundColor: APP_COLORS.offwhite,
    borderRadius: 12,
  },
  analyzingText: {
    color: APP_COLORS.secondary,
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'left',
    fontFamily: 'Manrope',
  },
});
