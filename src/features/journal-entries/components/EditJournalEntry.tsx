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
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  isVisible: boolean;
  initialMood: string;
  initialContent: string;
  onCancel: () => void;
  onSubmit: (content: string, mood: string) => Promise<void>;
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
  const [mood, setMood] = useState(initialMood);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setContent(initialContent);
    setMood(initialMood);
  }, [initialContent, initialMood]);

  const handleSubmit = () => {
    if (!mood.trim() || !content.trim()) {
      setError('Both mood and content are required.');
      return;
    }
    setError(null);
    onSubmit(content, mood);
  };

  const handleMoodChange = (text: string) => {
    setMood(text);
    if (error) setError(null);
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
      style={{ margin: 0, height: "30%" }}
    >
      <SafeAreaView className="flex-1 bg-red-500 dark:bg-gray-900">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 24, flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text className="mb-4 text-xl font-bold text-black dark:text-white">
              Edit Journal Entry
            </Text>

            <TextInput
              value={mood}
              onChangeText={handleMoodChange}
              placeholder="Mood (e.g. happy, sad)"
              className={`mb-3 p-3 border rounded-lg dark:text-white ${
                error && !mood ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              }`}
            />

            <TextInput
              value={content}
              onChangeText={handleContentChange}
              placeholder="Describe your feelings..."
              multiline
              textAlignVertical="top"
              className={`h-40 p-3 border rounded-lg text-black dark:text-white ${
                error && !content ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              }`}
            />

            {error && (
              <Text className="mt-2 mb-3 text-red-500">{error}</Text>
            )}

            <View className="flex flex-row justify-end gap-4 mt-6">
              <TouchableOpacity onPress={onCancel} className="items-center">
                <Text className="text-gray-500 dark:text-gray-400">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={saving}
                className="items-center px-4 py-3 bg-blue-500 rounded-full"
              >
                {saving ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="font-bold text-white">Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};
