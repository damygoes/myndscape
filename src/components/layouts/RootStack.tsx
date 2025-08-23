import { Stack } from 'expo-router';

export function RootStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* normal bottom tabs */}
      <Stack.Screen name="(tabs)" />

      {/* Global Paywall Modal */}
      <Stack.Screen
        name="paywall"
        options={{
          presentation: 'modal',
          headerShown: false,
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: 'red',
          title: 'Paywall',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
