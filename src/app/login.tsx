
import AuthScreen from '@/features/auth/components/AuthScreen';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LoginScreen() {

  return (
    <SafeAreaView className='flex flex-col items-center justify-center flex-1 w-full gap-4 p-8'>
      <AuthScreen />
    </SafeAreaView>
  );
}
