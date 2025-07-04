import { supabase } from '@/services/supabase';
import { colors } from '@/utils/colors';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export function LogoutButton() {
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
    <View className="mt-8">
      <TouchableOpacity
        onPress={handleLogout}
        disabled={loading}
        style={{
          backgroundColor: colors.danger,
          padding: 16,
          borderRadius: 999,
          opacity: loading ? 0.6 : 1,
        }}
      >
        <Text style={{ color: colors.textPrimary, fontWeight: 'bold', textAlign: 'center' }}>
          {loading ? 'Logging out...' : 'Logout'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}