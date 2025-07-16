import { COLORS } from '@/constants/colors';
import React from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { LottieAnimation } from './ui/LottieAnimation';

type Props = {
  message?: string;
};

export const EmptyState = ({
  message = "Nothing here yet. Let's get started!",
}: Props) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  return (
    <View className="items-center justify-center flex-1 px-8 py-10 space-y-4">
      <LottieAnimation
        source={require('../../assets/animations/404.json')}
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
        fallbackColor={colors.primary}
      />
      <Text
        style={{
          color: colors.textMuted,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: '500',
        }}
      >
        {message}
      </Text>
    </View>
  );
};
