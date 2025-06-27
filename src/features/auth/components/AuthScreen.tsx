import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuthActions } from '../hooks/useAuthActions';
import { useDeepLinkSession } from '../hooks/useDeepLinkSession';

export default function AuthScreen() {
  const { sendMagicLink } = useAuthActions();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useDeepLinkSession(); // ✅ Listens for magic link redirects

  const handleSendLink = async () => {
    setLoading(true);
    try {
      await sendMagicLink(email);
      Alert.alert('Check Your Email', 'We sent you a magic link to log in.');
    } catch (err) {
      console.error('Magic link error:', err);
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      Alert.alert('Login Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='flex flex-col items-center justify-center flex-1 w-full gap-4 p-8'>
      <Text className='text-4xl font-bold'>Login</Text>

      <TextInput
        placeholder="Your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
       className='w-full p-4 border-2 border-gray-300 rounded-lg'
      />

      <TouchableOpacity
        onPress={handleSendLink}
        className='items-center justify-center w-full p-4 my-2 bg-blue-500 rounded-full'
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className='font-bold text-white'>Send Magic Link</Text>
        )}
      </TouchableOpacity>
  
    </View>
  );
}
