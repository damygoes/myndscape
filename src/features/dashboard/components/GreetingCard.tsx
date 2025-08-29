import { APP_COLORS } from '@/constants/colors';
import { useUserProfileContext } from '@/features/user/contexts/UserProfileContext';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { Dimensions, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

export function GreetingCard() {
  const i18n = useAppLocale();
  const { data: userProfile, isLoading } = useUserProfileContext();
  const { width, height } = Dimensions.get('window');
  const HEADER_HEIGHT = height * 0.35;

  if (isLoading) return null;

  return (
    <View style={{ width, height: HEADER_HEIGHT }}>
      {/* Radial Gradient Background */}
      <Svg height="100%" width="100%" style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="35%" r="80%" fx="50%" fy="35%">
            {/* center */}
            <Stop
              offset="0%"
              stopColor={APP_COLORS.primary}
              stopOpacity="0.5"
            />

            {/* middle - softened primary */}
            <Stop
              offset="50%"
              stopColor={APP_COLORS.primary}
              stopOpacity="0.4"
            />

            {/* edges - background color */}
            <Stop
              offset="100%"
              stopColor={APP_COLORS['primary-background']}
              stopOpacity="1"
            />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '300',
            textAlign: 'center',
            color: APP_COLORS['body-text'],
            fontFamily: 'Manrope',
          }}
        >
          {i18n.t(`GreetingCard.${getGreeting()}`)},{'\n'}
          <Text
            style={{
              fontWeight: '600',
              textTransform: 'uppercase',
              fontSize: 24,
            }}
          >
            {userProfile?.username}
          </Text>
        </Text>
      </SafeAreaView>

      {/* Curvy bottom wave */}
      <Svg
        width={width}
        height={60}
        style={{ position: 'absolute', bottom: 0 }}
      >
        <Path
          d={`M0 0 Q${width / 4} 10 ${width / 2} 40 T${width} 0 V80 H0 Z`}
          fill={APP_COLORS['primary-background']}
        />
      </Svg>
    </View>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}
