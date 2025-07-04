import TabBar from '@/components/tab-bar/TabBar';
import { useAuth } from '@/features/auth/components/AuthContext';
import { Redirect, Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  const { session, loading } = useAuth();

  if (loading) return <Text>Loading...</Text>;
  if (!session) return <Redirect href="/login" />;

  return (
    <Tabs
      tabBar={() => <TabBar />}
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
