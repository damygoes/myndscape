import { APP_COLORS } from '@/constants/colors';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

function getScoreColorGradient(score: number) {
  if (score <= 40) return [APP_COLORS.error, APP_COLORS.error + 'CC'];
  if (score <= 70) return [APP_COLORS.primary, APP_COLORS.primary + 'CC'];
  return [APP_COLORS.success, APP_COLORS.success + 'CC'];
}

export function WellnessScoreRing({ score }: { score: number }) {
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const gradientColors = getScoreColorGradient(score);

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </LinearGradient>
        </Defs>

        {/* Background circle */}
        <Circle
          stroke={APP_COLORS.offwhite}
          fill="none"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle with gradient */}
        <Circle
          stroke="url(#grad)"
          fill="none"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          rotation="-90"
          originX={radius}
          originY={radius}
        />
      </Svg>

      {/* Inner text */}
      <View style={styles.textContainer}>
        <Text style={styles.score}>{score}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 16,
    fontWeight: '600',
    color: APP_COLORS['body-text'],
    fontFamily: 'Manrope',
  },
});
