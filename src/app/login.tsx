import ParallaxScrollView from '@/components/ParallaxScrollView';
import { APP_COLORS, COLORS } from '@/constants/colors';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Image } from 'expo-image';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';

export default function LandingScreen() {


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ParallaxScrollView
        headerBackgroundColor={{
          light: APP_COLORS['primary-background'],
          dark: APP_COLORS['primary-background'],
        }}
        headerImage={
          <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(220, 86, 14, 0.1)' }}>
            <Image
              source={require('../../assets/icon.png')}
              style={{ width: 100, height: 100 }}
              contentFit="contain"
              cachePolicy="memory-disk"
              transition={300}
              priority="high"
            />
            <Text style={{ color: APP_COLORS.primary, fontWeight: '300', fontSize: 24 }}>Myndscape</Text>
          </View>
        }
        headerHeight={300}
        contentStyle={{
          backgroundColor: APP_COLORS.offwhite,
          paddingTop: 10,
          paddingBottom: 200,
          gap: 0,
        }}
      >

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
            padding: 12,
          }}
        >
          <Text
            style={{ color: APP_COLORS['body-text'], fontWeight: 'semibold', fontSize: 24 }}
          >
            Sign Up or Login
          </Text>
          <Text
            style={{ color: APP_COLORS['body-text'], fontWeight: '400', fontSize: 16, textAlign: 'center' }}
          >
            Please enter your email address to get started.
          </Text>
        </View>
        <LoginForm />
      </ParallaxScrollView>
    </KeyboardAvoidingView>

  );
}