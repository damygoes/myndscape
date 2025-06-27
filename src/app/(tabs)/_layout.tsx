import { useAuth } from '@/features/auth/components/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from "expo-router";
import { Text } from 'react-native';

export default function TabsLayout() {
  const { session, loading } = useAuth();

  if (loading) return <Text>Loading...</Text>;

  if (!session) return <Redirect href="/login" />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }} />
      <Tabs.Screen name="history" options={{ title: "History", tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} /> }} />
    </Tabs>
  );
}