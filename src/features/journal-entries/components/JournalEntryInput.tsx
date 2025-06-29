import { Card, CardFooter, CardHeader, CardTitle } from '@/components/card/Card';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity } from 'react-native';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="absolute bottom-0 left-0 right-0 rounded-3xl dark:bg-gray-900"
    >
      <Card className='bg-white'>
        <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
          
        </CardHeader>
     
      <TextInput
        value={content}
        onChangeText={handleChange}
        placeholder="Describe your feelings..."
        multiline
        className={`p-3 text-black rounded-lg dark:text-white 
          ${error ? 'border border-red-600 dark:border-red-400' : 'border border-gray-300 dark:border-gray-700'}`}
      />

      {error && (
        <Text className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</Text>
      )}

      <CardFooter className="flex flex-row items-center justify-end gap-4 border-t-0">
        <TouchableOpacity onPress={onCancel} className="items-center">
          <Text className="text-gray-500 dark:text-gray-400">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePress}
          disabled={saving}
          className="items-center px-4 py-3 bg-blue-500 rounded-full"
        >
          {saving ? <ActivityIndicator color="white" /> : <Text className="font-bold text-white">Add Entry</Text>}
        </TouchableOpacity>
      </CardFooter>
      </Card>
    </KeyboardAvoidingView>
  );
};
