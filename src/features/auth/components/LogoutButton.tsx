import { Button } from '@/components/button/Button';
import { COLORS } from '@/constants/colors';
import { supabase } from '@/services/supabase';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useLogout } from '../hooks/useLogout';

export function LogoutButton({ style }: { style?: ViewStyle }) {
  const { handleLogout, loading } = useLogout();

  return (
    <View style={{ ...style }}>
      <Button
        title="Logout"
        variant="danger"
        onPress={handleLogout}
        disabled={loading}
      />
    </View>
  );
}
