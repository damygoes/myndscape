import { Button } from '@/components/button/Button';
import { COLORS } from '@/constants/colors';
import { supabase } from '@/services/supabase';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export function LogoutButton({ style }: { style?: ViewStyle }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ ...style }}>
      <Button
        title='Logout'
        variant='danger'
        onPress={handleLogout}
        disabled={loading}
      />
    </View>
  );
}
