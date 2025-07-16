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
  initialMood,
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
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      avoidKeyboard
      style={{ margin: 0 }}
    >
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
              className="mb-4 text-xl font-bold"
              style={{ color: colors.textPrimary }}
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
              className="h-40 p-3 border rounded-lg"
              style={{
                backgroundColor: colors.inputBackground,
                color: colors.textPrimary,
                borderColor:
                  error && !content ? colors.textError : colors.inputBorder,
              }}
            />

            {error && (
              <Text className="mt-2 mb-3" style={{ color: colors.textError }}>
                {error}
              </Text>
            )}

            <View className="flex flex-row justify-end gap-4 mt-6">
              <TouchableOpacity onPress={onCancel} className="items-center">
                <Text style={{ color: colors.textSecondary }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={saving}
                className="items-center px-4 py-3 rounded-full"
                style={{
                  backgroundColor: colors.primary,
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? (
                  <ActivityIndicator color={colors.background} />
                ) : (
                  <Text
                    className="font-bold"
                    style={{ color: colors.background }}
                  >
                    Save
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};
