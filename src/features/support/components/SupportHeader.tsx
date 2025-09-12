import { AnimatedScreenHeader } from '@/components/screen-header/AnimatedScreenHeader';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';
import { APP_COLORS } from '@/constants/colors';
import { router } from 'expo-router';
import { Animated, Pressable } from 'react-native';

type Props = {
  title: string;
  scrollY?: Animated.Value;
};

export function SupportHeader({ title, scrollY }: Props) {
  return (
    <AnimatedScreenHeader
      title={title}
      scrollY={scrollY}
      applyTopPadding={false}
      titleStyle={{ textAlign: 'center' }}
      rightComponent={
        <Pressable onPress={() => router.back()}>
          <IconSymbol name="close" size={20} color={APP_COLORS['body-text']} />
        </Pressable>
      }
    />
  );
}
