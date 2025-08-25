import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import { APP_COLORS, COLORS } from '@/constants/colors';
import { useHandleJournalEntryCreation } from '@/features/journal-entries/hooks/useHandleJournalEntryCreation';
import { useCurrentUserProfile } from '@/features/profile/hooks/useCurrentUserProfile';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function AddEntryScreen() {
  const { data: userProfile } = useCurrentUserProfile();

  const userDisplayName = useMemo(() => {
    return userProfile?.username || 'User';
  }, [userProfile]);

  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleCreateEntry, createIsPending } =
    useHandleJournalEntryCreation();

  const shouldDisableSubmit = isSubmitting || createIsPending;

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError(
        'A problem shared is a problem halved. Please share your thoughts.'
      );
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
          How are you feeling today, {userDisplayName}?
        </Text>

        <Input
          value={content}
          onChangeText={handleChange}
          placeholder="A penny for your thoughts..."
          placeholderTextColor={APP_COLORS['body-text-disabled']}
          multiline
          style={{ minHeight: 160 }}
          error={error ?? undefined}
        />

        {isSubmitting && (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator
              color={APP_COLORS['body-text-disabled']}
              size="large"
            />
            <Text style={styles.analyzingText}>
              Your thoughts matter — reflecting on what you shared...
            </Text>
          </View>
        )}

        <Button
          title="Add Entry"
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
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  analyzingContainer: {
    marginVertical: 16,
    gap: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  analyzingText: {
    color: APP_COLORS.secondary,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
