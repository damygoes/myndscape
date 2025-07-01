import { Card, CardFooter } from '@/components/card/Card';
import { useHandleJournalEntryCreation } from '@/features/journal-entries/hooks/useHandleJournalEntryCreation';
import { colors } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { ActivityIndicator, TextInput as RNTextInput, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const MoodPrompt = () => {
  const [content, setContent] = useState('');
  const inputRef = useRef<RNTextInput>(null);
  const { handleCreateEntry, createIsPending } = useHandleJournalEntryCreation();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await handleCreateEntry(content);
    setContent('');
  };

  const handleClear = () => {
    setContent('');
    inputRef.current?.blur();  // ✅ Blur (remove focus) from input
  };

  return (
    <View className="gap-4 rounded-3xl">
      <Card className="relative">
        <TextInput
          ref={inputRef}
          placeholder="Write how you're feeling today..."
          placeholderTextColor={colors.inputPlaceholder}
          value={content}
          onChangeText={setContent}
          editable={!createIsPending}
          multiline
          className="p-4 pr-10 text-base rounded-xl"
          style={{
            backgroundColor: colors.inputBackground,
            color: colors.textPrimary,
            borderWidth: 1,
            borderColor: colors.inputBorder,
          }}
        />

        {content.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="absolute right-6 top-8"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={24} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      <CardFooter className='border-t-0'>
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={createIsPending}
        className="px-6 py-4 rounded-3xl"
        style={{
          backgroundColor: createIsPending ? colors.textMuted : colors.primary,
          opacity: createIsPending ? 0.7 : 1,
        }}
      >
        {createIsPending ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text 
            className="font-semibold text-center"
            style={{ color: colors.background }}
          >
            Save
          </Text>
        )}
      </TouchableOpacity>
      </CardFooter>
      </Card>

    </View>
  );
};