import { COLORS } from '@/constants/colors';
import React, { useState } from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';

type Props = {
  source: any;
  autoPlay?: boolean;
  loop?: boolean;
  style?: any;
  fallbackColor?: string;
};

// Try to import Lottie at the top level
let LottieView: any = null;
try {
  LottieView = require('lottie-react-native').default;
} catch (error) {
  console.warn(
    'Lottie module not available, will use ActivityIndicator fallback'
  );
}

export const LottieAnimation = ({
  source,
  autoPlay = true,
  loop = true,
  style = { width: 100, height: 100 },
  fallbackColor,
}: Props) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];
  const [hasError, setHasError] = useState(false);

  // Show fallback if Lottie is not available or there's an error
  if (!LottieView || hasError) {
    return (
      <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator
          size="large"
          color={fallbackColor || colors.primary}
        />
      </View>
    );
  }

  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      style={style}
      onError={() => {
        console.warn(
          'Lottie animation failed to load, falling back to ActivityIndicator'
        );
        setHasError(true);
      }}
    />
  );
};
