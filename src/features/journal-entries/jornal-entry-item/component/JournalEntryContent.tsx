import React from 'react';
import { Text } from 'react-native';

interface Props {
  content: string;
}

export const JournalEntryContent = ({ content }: Props) => {
  return (
    <Text
      numberOfLines={1}
      className="mb-1 text-sm text-gray-500 dark:text-gray-400"
    >
      {content}
    </Text>
  );
};
