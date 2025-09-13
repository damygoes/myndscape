import { COLORS } from '@/constants/colors';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  isVisible: boolean;
  initialMood: string;
  initialContent: string;
  onCancel: () => void;
  onSubmit: (content: string) => Promise<void>;
  saving: boolean;
}

export const EditJournalEntry = ({
  isVisible,
  initialContent,
  onCancel,
  onSubmit,
  saving,
}: Props) => {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState<string | null>(null);

  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = () => {
    if (!content.trim()) {
      setError('Content is required.');
      return;
    }
    setError(null);
    onSubmit(content);
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    if (error) setError(null);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel} avoidKeyboard style={{ margin: 0 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 24, flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 16,
              }}
            >
              Edit Journal Entry
            </Text>

            <TextInput
              value={content}
              onChangeText={handleContentChange}
              placeholder="Describe your feelings..."
              placeholderTextColor={colors.inputPlaceholder}
              multiline
              textAlignVertical="top"
              style={{
                height: 160,
                padding: 12,
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: colors.inputBackground,
                color: colors.textPrimary,
                borderColor: error && !content ? colors.textError : colors.inputBorder,
              }}
            />

            {error && (
              <Text style={{ color: colors.textError, marginTop: 8, marginBottom: 12 }}>
                {error}
              </Text>
            )}

            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 16, marginTop: 24 }}
            >
              <TouchableOpacity onPress={onCancel} style={{ alignItems: 'center' }}>
                <Text style={{ color: colors.textSecondary }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={saving}
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 24,
                  backgroundColor: colors.primary,
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? (
                  <ActivityIndicator color={colors.background} />
                ) : (
                  <Text style={{ color: colors.background, fontWeight: 'bold' }}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};
