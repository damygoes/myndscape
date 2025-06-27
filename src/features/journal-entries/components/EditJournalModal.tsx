import { useJournalEntryById } from '@/features/journal-entries/hooks/useJournalEntryById';
import { useUpdateJournalEntry } from '@/features/journal-entries/hooks/useUpdateJournalEntry';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface EditJournalModalProps {
  id: string;
  visible: boolean;
  onCancel: () => void;
  onSubmit?: (content: string, mood: string) => Promise<void>;
}

export default function EditJournalModal({ id, visible, onCancel, onSubmit }: EditJournalModalProps) {
  const updateEntry = useUpdateJournalEntry();
  const { data: entry, isLoading } = useJournalEntryById(id);

  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (entry) {
      setContent(entry.content);
      setMood(entry.mood);
    }
  }, [entry]);

  const handleSave = async () => {
    if (!content.trim() || !mood.trim()) {
      setError('Both mood and content are required.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      if (onSubmit) {
        await onSubmit(content, mood);
      } else {
        await updateEntry.mutateAsync({ id, content, mood });
      }
      onCancel(); // close modal after save
    } catch (e) {
      setError('Failed to save. Please try again.');
    }
    setSaving(false);
  };

  if (!visible) return null;

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onCancel}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
            maxHeight: '80%',
          }}
        >
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 24 }}>
            <Text className="mb-4 text-2xl font-bold">Edit Journal Entry</Text>

            <TextInput
              value={mood}
              onChangeText={setMood}
              placeholder="Mood (e.g. happy, sad)"
              className={`mb-3 p-3 border rounded-lg ${
                error && !mood ? 'border-red-500' : 'border-gray-300'
              }`}
            />

            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Describe your feelings..."
              multiline
              className={`h-32 p-3 border rounded-lg ${
                error && !content ? 'border-red-500' : 'border-gray-300'
              }`}
            />

            {error && <Text className="mb-3 text-red-500">{error}</Text>}

            <View className="flex-row items-center justify-end gap-4 mt-6">
              <TouchableOpacity onPress={onCancel} className="items-center">
                <Text className="text-gray-500">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
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
      </View>
    </Modal>
  );
}
