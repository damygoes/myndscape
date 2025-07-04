import { Feather } from '@expo/vector-icons';
import React, { ReactNode, useEffect } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabBarButtonProps {
  label: string;
  isFocused: boolean;
  onPress: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  icon?: (color: string) => ReactNode;
  color: string;
  style?: ViewStyle;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({
  label,
  isFocused,
  icon,
  color,
  onPress,
  onLongPress,
  style,
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(scale.value, [0, 1], [1, 1.4]) }],
    top: interpolate(scale.value, [0, 1], [0, 8]),
    marginBottom: interpolate(scale.value, [0, 1], [1, 6]),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: 1,
  }));


  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, style]}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
    >
      <Animated.View style={animatedIconStyle}>
        {icon ? icon(color) : <Feather name="circle" size={20} color={color} />}
      </Animated.View>

      <Animated.Text style={[styles.label, { color }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
});

export default TabBarButton;
