import { APP_COLORS } from '@/constants/colors';
import { Animated, Text, View } from 'react-native';
import { EntryDetailsScreenHeader } from '../components/EntryDetailsScreenHeader';
import { useRef } from 'react';
import { EntryDetailsContent } from '../components/EntryDetailsContent';
import { useLocalSearchParams } from 'expo-router';

export function EntryDetailsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS['primary-background'],
      }}
    >
      {/* Fixed header that animates with scroll */}
      <EntryDetailsScreenHeader scrollY={scrollY} entryId={id} />

      {/* Scrollable content */}
      <EntryDetailsContent entryId={id} />
    </View>
  );
}
