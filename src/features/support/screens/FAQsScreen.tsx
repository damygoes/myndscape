import { APP_COLORS } from '@/constants/colors';
import { useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { SupportHeader } from '../components/SupportHeader';

export function FAQsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS['primary-background'],
      }}
    >
      {/* Fixed header that animates with scroll */}
      <SupportHeader scrollY={scrollY} title="FAQs" />

      {/* Scrollable content */}
      <View>
        <Text>FAQs Content</Text>
      </View>
    </View>
  );
}
