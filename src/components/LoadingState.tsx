import { COLORS } from '@/constants/colors';
import React from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { LottieAnimation } from './ui/LottieAnimation';

type Props = {
  message?: string;
};

export const LoadingState = ({ message = 'Loading...' }: Props) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        gap: 8,
      }}
    >
      <LottieAnimation
        source={require('../../assets/animations/loading.json')}
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
