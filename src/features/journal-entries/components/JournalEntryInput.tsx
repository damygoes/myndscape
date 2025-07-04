import { Card, CardFooter, CardHeader, CardTitle } from '@/components/card/Card';
import { colors } from '@/utils/colors';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

interface Props {
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

export const JournalEntryInput = ({ onSubmit, onCancel, saving }: Props) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handlePress = () => {
    if (!content.trim()) {
      setError("Please tell me how you're feeling today");
      return;
    }
    setError(null);
    onSubmit(content);
    setContent('');
  };

  const handleChange = (text: string) => {
    if (error) setError(null);
    setContent(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle style={styles.title}>How are you feeling today?</CardTitle>
      </CardHeader>

      <TextInput
        value={content}
        onChangeText={handleChange}
        placeholder="Describe your feelings..."
        placeholderTextColor={colors.inputPlaceholder}
        multiline
        style={[
          styles.textInput,
          error && !content && { borderColor: colors.textError },
        ]}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <CardFooter style={styles.footer}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePress}
          disabled={saving}
          style={styles.submitButton}
        >
          {saving ? (
            <ActivityIndicator color={colors.background} size="small" />
          ) : (
            <Text style={styles.submitText}>Add Entry</Text>
          )}
        </TouchableOpacity>
      </CardFooter>
    </Card>
  );
};


const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.4,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 500,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  textInput: {
    padding: 24,
    borderRadius: 8,
    minHeight: 128,
    backgroundColor: colors.inputBackground,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: 'top',
    marginVertical: 18,
  },
  errorText: {
    marginTop: -8,
    marginBottom: 12,
    fontSize: 14,
    color: colors.textError,
    marginLeft: 24,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
    borderTopWidth: 0,
    paddingTop: 0,
  },
  cancelButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cancelText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  submitButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: colors.primary,
    minWidth: 100,
  },
  submitText: {
    color: colors.background,
    fontSize: 16,
  },
});
