import { useJournalEntryById } from '@/features/journal-entries/hooks/useJournalEntryById';
import { useUpdateJournalEntry } from '@/features/journal-entries/hooks/useUpdateJournalEntry';
import { colors } from '@/utils/colors';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface EditJournalModalProps {
  id: string;
  visible: boolean;
  onCancel: () => void;
  onSubmit?: (content: string) => Promise<void>;
}

export default function EditJournalModal({
  id,
  visible,
  onCancel,
  onSubmit,
}: EditJournalModalProps) {
  const updateEntry = useUpdateJournalEntry();
  const { data: entry, isLoading } = useJournalEntryById(id);

  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (entry) {
      setContent(entry.content);
    }
  }, [entry]);

  const handleSave = async () => {
    if (!content.trim()) {
      setError('Content is required.');
      return;
    }
    setError(null);
    setSaving(true);

    try {
      if (onSubmit) {
        await onSubmit(content);
      } else {
        await updateEntry.mutateAsync({ id, content });
      }
      onCancel();
    } catch (e) {
      setError('Failed to save. Please try again.');
    }
    setSaving(false);
  };

  if (!visible) return null;

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onCancel}>
      <View style={StyleSheet.absoluteFill}>
        {/* Background blur */}
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />

        {/* Optional: subtle overlay on top of blur */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.surfaceBackground,
          }}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
            minHeight: '50%',
            maxHeight: '90%',
          }}
        >
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 24 }}>
            <Text
              className="mb-8 text-2xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              Edit Journal Entry
            </Text>

            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Describe your feelings..."
              placeholderTextColor={colors.inputPlaceholder}
              multiline
              style={{
                height: 300,
                padding: 12,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: error && !content ? colors.textError : colors.inputBorder,
                backgroundColor: colors.inputBackground,
                color: colors.textPrimary,
                textAlignVertical: 'top',
              }}
            />

            {error && (
              <Text
                className="mb-3"
                style={{ color: colors.textError }}
              >
                {error}
              </Text>
            )}

            <View className="flex-row items-center justify-end gap-4 my-6">
              <TouchableOpacity onPress={onCancel} className="items-center">
                <Text style={{ color: colors.textMuted }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                disabled={saving}
                className="items-center px-6 py-4 rounded-full"
                style={{
                  backgroundColor: saving ? colors.textMuted : colors.primary,
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? (
                  <ActivityIndicator color={colors.background} />
                ) : (
                  <Text className="font-bold" style={{ color: colors.background }}>
                    Save
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}