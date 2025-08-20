import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import { APP_COLORS, COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { useHandleJournalEntryCreation } from '@/features/journal-entries/hooks/useHandleJournalEntryCreation';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';

export const MoodPrompt = () => {

  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef<TextInput>(null);
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
  };

  const handleClear = () => {
    setContent('');
    inputRef.current?.blur();
  };

  useFocusEffect(
    useCallback(() => {
      setError(null);
      handleClear();
      return () => {
        // when leaving this screen
        inputRef.current?.blur();
        Keyboard.dismiss();
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <DashboardSection glassCardProps={{
          padding: 8,
          borderRadius: 12,
        }}>
          <Input
            ref={inputRef}
            value={content}
            onChangeText={(text) => {
              setContent(text);
              if (error) setError(null); // clear error on typing
            }}
            disabled={createIsPending}
            multiline
            placeholder='Have you got something on your mind?'
            style={{ minHeight: 80 }}
            error={error ?? undefined}
          />

          {isSubmitting && (
            <View style={styles.analyzingContainer}>
              <ActivityIndicator color={APP_COLORS.secondary} size="large" />
              <Text style={styles.analyzingText}>
                Your thoughts matter — reflecting on what you shared...
              </Text>
            </View>
          )}

          {/* Footer */}
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            {content.length > 0 && <Button
              variant='outline'
              title="Clear"
              onPress={handleClear}
              disabled={shouldDisableSubmit}
              size='small'
              icon='close'
            />}
            <Button
              title="Add Entry"
              onPress={handleSubmit}
              loading={shouldDisableSubmit}
            />

          </View>
        </DashboardSection>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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