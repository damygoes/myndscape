import { APP_COLORS } from '@/constants/colors';
import { useUserUsageContext } from '@/features/user/contexts/UserUsageContext';
import { useRouter } from 'expo-router';
import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Plan, type PlanType } from '../types';

type PaywallGateProps = {
  require: PlanType;
  children: ReactNode;
  fallback?: ReactNode; // optional custom fallback
};

const PLAN_ORDER = [Plan.FREE, Plan.PREMIUM]; // importance ranking

export function PaywallGate({ require, fallback, children }: PaywallGateProps) {
  const { data: userUsage, isLoading } = useUserUsageContext();
  const router = useRouter();

  if (isLoading) return null; // or loading spinner

  const currentPlan = userUsage?.plan_id ?? Plan.FREE; // default to free if not available

  const hasAccess = PLAN_ORDER.indexOf(currentPlan) >= PLAN_ORDER.indexOf(require);

  if (hasAccess) {
    return <>{children}</>;
  }

  // Show custom fallback if provided
  if (fallback) return <>{fallback}</>;

  // Default fallback → lock + upgrade button
  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        This feature requires a{' '}
        <Text style={{ textTransform: 'capitalize', fontWeight: '600' }}>{require}</Text> plan
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: APP_COLORS.primary,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 9999,
        }}
        onPress={() => router.push('/paywall')}
      >
        <Text style={{ color: APP_COLORS.white, fontWeight: '500' }}>Upgrade Now</Text>
      </TouchableOpacity>
    </View>
  );
}
