import { APP_COLORS } from '@/constants/colors';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { IconSymbol, IconSymbolName } from '../ui/IconSymbol.ios';

export type MenuItem = {
  key: string;
  label: string;
  onPress?: () => void;
  icon?: IconSymbolName;
  destructive?: boolean;
  showSelectedState?: boolean;
};

export function HeaderMenu({ items = [] as MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 20,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [open]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.root}>
      <Pressable
        onPress={toggle}
        hitSlop={12}
        style={({ pressed }) => [styles.trigger, pressed && styles.triggerPressed]}
        accessibilityRole="button"
        accessibilityLabel="Open options menu"
        accessibilityState={{ expanded: open }}
      >
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <IconSymbol name="more" size={20} color={APP_COLORS['body-text']} />
        </Animated.View>
      </Pressable>

      {open && (
        <>
          {/* Backdrop */}
          <Pressable
            onPress={close}
            style={StyleSheet.absoluteFill}
            accessibilityLabel="Close menu"
          />

          {/* Menu */}
          <Animated.View
            style={[
              styles.menu,
              {
                opacity: opacityAnim,
                transform: [
                  { scale: scaleAnim },
                  {
                    translateY: scaleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {items.map((item, index) => (
              <React.Fragment key={item.key}>
                <Pressable
                  onPress={() => {
                    close();
                    item.onPress?.();
                  }}
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.menuItemPressed,
                    item.destructive && styles.menuItemDestructive,
                  ]}
                  accessibilityRole="menuitem"
                >
                  <View
                    style={[
                      styles.menuItemContent,
                      {
                        borderBottomWidth: index < items.length - 1 ? 1 : 0,
                        borderBottomColor:
                          index < items.length - 1
                            ? APP_COLORS['background-stroke']
                            : 'transparent',
                      },
                    ]}
                  >
                    {item.icon && (
                      <IconSymbol
                        name={item.icon}
                        size={16}
                        color={item.destructive ? APP_COLORS.error : APP_COLORS['body-text']}
                        style={styles.menuItemIcon}
                      />
                    )}
                    <Text
                      style={[
                        styles.menuItemText,
                        item.destructive && styles.menuItemTextDestructive,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.showSelectedState && (
                      <IconSymbol name="checkmark" size={18} color={APP_COLORS.success} />
                    )}
                  </View>
                </Pressable>
                {/* {index < items.length - 1 && <View style={styles.separator} />} */}
              </React.Fragment>
            ))}
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    zIndex: 1000,
  },
  trigger: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: APP_COLORS.offwhite,
    borderWidth: 1,
    borderColor: APP_COLORS['background-stroke'],
    shadowColor: APP_COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  triggerPressed: {
    backgroundColor: APP_COLORS.grey,
    transform: [{ scale: 0.95 }],
  },
  menu: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: APP_COLORS['background-stroke'],
    shadowColor: APP_COLORS.black,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    overflow: 'hidden',
    minWidth: 250,
    marginRight: 8, // Ensure menu doesn't go off screen
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  menuItemPressed: {
    backgroundColor: APP_COLORS.offwhite,
  },
  menuItemDestructive: {
    // No special background for destructive items
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuItemIcon: {
    marginRight: 12,
    width: 16,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Manrope',
    color: APP_COLORS['body-text'],
    flex: 1,
  },
  menuItemTextDestructive: {
    color: APP_COLORS.error,
  },
});
