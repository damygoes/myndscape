
import { supabase } from '@/services/supabase';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert('Check Your Email', 'We sent you a magic link to log in.');
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
          borderRadius: 6,
        }}
      />

      <Button title={loading ? 'Sending...' : 'Send Magic Link'} onPress={handleLogin} />
    </View>
  );
}
