import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { APP_COLORS } from '@/constants/colors';
import { useAppLocale } from '@/services/i18n/useAppLocale';

export default function TabLayout() {
  const i18n = useAppLocale();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: APP_COLORS.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 80,
          paddingBottom: 16,
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 0,
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t('Tabs.home'),
          tabBarIcon: ({ color }) => (
            <IconSymbol name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: i18n.t('Tabs.history'),
          tabBarIcon: ({ color }) => (
            <IconSymbol name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t('Tabs.settings'),
          tabBarIcon: ({ color }) => (
            <IconSymbol name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
