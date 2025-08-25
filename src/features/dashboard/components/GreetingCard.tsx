import { View, Text } from 'react-native';
import { useUserProfileContext } from '@/features/user/contexts/UserProfileContext';

export function GreetingCard() {
  const { data: userProfile, isLoading } = useUserProfileContext();

  if (isLoading) return null;

  return (
    <View
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 16,
        marginBottom: 8,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: '700' }}>
        {getGreeting()}, {userProfile?.username} 👋
      </Text>
    </View>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
