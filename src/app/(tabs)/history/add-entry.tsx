import { COLORS } from '@/constants/colors';
import { useHandleJournalEntryCreation } from '@/features/journal-entries/hooks/useHandleJournalEntryCreation';
import { useCurrentUserProfile } from '@/features/user/hooks/useCurrentUserProfile';
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
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

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
      <View style={styles(colors).container}>
        <Text style={styles(colors).title}>
          How are you feeling today, {userDisplayName}?
        </Text>

        <TextInput
          value={content}
          onChangeText={handleChange}
          placeholder="A penny for your thoughts..."
          placeholderTextColor={colors.inputPlaceholder}
          multiline
          style={[
            styles(colors).textInput,
            error && !content && { borderColor: colors.textError },
          ]}
        />

        {error && <Text style={styles(colors).errorText}>{error}</Text>}

        {isSubmitting && (
          <View style={styles(colors).analyzingContainer}>
            <ActivityIndicator color={colors.textMuted} size="large" />
            <Text style={styles(colors).analyzingText}>
              Your thoughts matter — reflecting on what you shared...
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={shouldDisableSubmit}
          style={[
            styles(colors).submitButton,
            {
              backgroundColor: shouldDisableSubmit
                ? colors.textMuted
                : colors.primary,
              opacity: shouldDisableSubmit ? 0.7 : 1,
            },
          ]}
        >
          <Text style={styles(colors).submitText}>Add Entry</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = (colors: typeof COLORS.light | typeof COLORS.dark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      gap: 12,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 12,
    },
    textInput: {
      padding: 24,
      borderRadius: 12,
      minHeight: 160,
      backgroundColor: colors.inputBackground,
      color: colors.textPrimary,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      fontSize: 16,
      lineHeight: 22,
      textAlignVertical: 'top',
    },
    errorText: {
      fontSize: 14,
      color: colors.textError,
      marginBottom: 24,
      marginLeft: 4,
    },
    submitButton: {
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 24,
      backgroundColor: colors.primary,
      opacity: 1,
    },
    submitText: {
      fontSize: 16,
      fontWeight: '500',
    },
    analyzingContainer: {
      marginVertical: 16,
      gap: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
    },
    analyzingText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontStyle: 'italic',
      textAlign: 'center',
    },
  });
