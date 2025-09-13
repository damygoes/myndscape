import { APP_COLORS } from '@/constants/colors';
import React from 'react';
import { Text } from 'react-native';

interface Props {
  content: string;
}

export const JournalEntryContent = ({ content }: Props) => {
  return (
    <Text
      numberOfLines={1}
      style={{ marginBottom: 4, fontSize: 12, color: APP_COLORS['body-text'] }}
    >
      {content}
    </Text>
  );
};
