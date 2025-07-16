import { COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { useHandleJournalEntryCreation } from '@/features/journal-entries/hooks/useHandleJournalEntryCreation';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

export const MoodPrompt = () => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef<RNTextInput>(null);
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

  return (
    <DashboardSection>
      <View style={{ position: 'relative', width: '100%' }}>
        <TextInput
          ref={inputRef}
          placeholder="Have you got something on your mind?"
          placeholderTextColor={colors.inputPlaceholder}
          value={content}
          onChangeText={setContent}
          editable={!createIsPending}
          multiline
          style={{
            backgroundColor: colors.inputBackground,
            color: colors.textPrimary,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            borderRadius: 20,
            padding: 16,
            paddingRight: 40,
            fontSize: 16,
            minHeight: 80,
            textAlignVertical: 'top',
          }}
        />

        {content.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={{
              position: 'absolute',
              right: 16,
              top: 16,
              zIndex: 1,
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={24} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles(colors).errorText}>{error}</Text>}

      {isSubmitting && (
        <View style={styles(colors).analyzingContainer}>
          <ActivityIndicator color={colors.textMuted} size="large" />
          <Text style={styles(colors).analyzingText}>
            Your thoughts matter — reflecting on what you shared...
          </Text>
        </View>
      )}

      {/* Footer */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: 'transparent',
          marginTop: 12,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={shouldDisableSubmit}
          style={{
            backgroundColor: shouldDisableSubmit
              ? colors.textMuted
              : colors.primary,
            opacity: shouldDisableSubmit ? 0.7 : 1,
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 24,
            width: '100%',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              textAlign: 'center',
              color: colors.background,
              fontSize: 16,
            }}
          >
            Add Entry
          </Text>
        </TouchableOpacity>
      </View>
    </DashboardSection>
  );
};

const styles = (colors: typeof COLORS.light | typeof COLORS.dark) =>
  StyleSheet.create({
    errorText: {
      fontSize: 14,
      color: colors.textError,
      marginBottom: 24,
      marginLeft: 4,
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
