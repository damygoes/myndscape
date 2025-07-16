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
      <TouchableOpacity
        onPress={handleLogout}
        disabled={loading}
        style={{
          backgroundColor: COLORS.dark.danger,
          padding: 16,
          borderRadius: 999,
          opacity: loading ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            color: COLORS.dark.white,
            fontWeight: '500',
            textAlign: 'center',
            fontSize: 18,
          }}
        >
          {loading ? 'Logging out...' : 'Logout'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
