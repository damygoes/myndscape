import { COLORS } from '@/constants/colors';
import { useJournalEntryById } from '@/features/journal-entries/hooks/useJournalEntryById';
import { useUpdateJournalEntry } from '@/features/journal-entries/hooks/useUpdateJournalEntry';
import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';
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
  useColorScheme,
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
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];
  const { data } = useUserSettingsContext();

  const updateEntry = useUpdateJournalEntry({ language: data?.language || 'en' });
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
      console.error(e);
      setError('Failed to save. Please try again.');
    }
    setSaving(false);
  };

  if (!visible) return null;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            backgroundColor: colors.background,
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
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <Text
              style={{
                color: colors.textPrimary,
                marginBottom: 8,
                fontSize: 20,
                fontWeight: 'bold',
              }}
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

            {error && <Text style={{ color: colors.textError, marginBottom: 12 }}>{error}</Text>}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 16,
                marginVertical: 24,
              }}
            >
              <TouchableOpacity onPress={onCancel} style={{ alignItems: 'center' }}>
                <Text style={{ color: colors.textMuted }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                disabled={saving}
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 999,
                  backgroundColor: saving ? colors.textMuted : colors.primary,
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
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
