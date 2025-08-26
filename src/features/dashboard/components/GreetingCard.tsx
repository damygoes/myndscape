import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserProfileContext } from '@/features/user/contexts/UserProfileContext';
import { MeshGradientView } from 'expo-mesh-gradient';
import { APP_COLORS } from '@/constants/colors';
import Svg, { Path } from 'react-native-svg';

export function GreetingCard() {
  const { data: userProfile, isLoading } = useUserProfileContext();
  const { width } = Dimensions.get('window');
  const HEADER_HEIGHT = '100%';

  if (isLoading) return null;

  return (
    <View style={{ width, height: HEADER_HEIGHT }}>
      <MeshGradientView
        style={{ flex: 1 }}
        columns={2} // 2 columns for 3 colors works better
        rows={2} // 2 rows is enough
        colors={[
          APP_COLORS.primary,
          APP_COLORS.offwhite,
          APP_COLORS['primary-background'],
        ]}
        points={[
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: '300',
              textAlign: 'center',
              color: APP_COLORS['body-text'],
              fontFamily: 'Manrope',
            }}
          >
            {getGreeting()},{'\n'}
            <Text style={{ fontWeight: '700', textTransform: 'uppercase' }}>
              {userProfile?.username} 👋
            </Text>
          </Text>
        </SafeAreaView>
      </MeshGradientView>

      {/* Curvy bottom wave */}
      <Svg
        width={width}
        height={80}
        style={{ position: 'absolute', bottom: 0 }}
      >
        <Path
          d={`M0 0 Q${width / 4} 80 ${width / 2} 40 T${width} 0 V80 H0 Z`}
          fill={APP_COLORS['primary-background']}
        />
      </Svg>
    </View>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
