import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { APP_COLORS } from '@/constants/colors';

function getScoreColor(score: number) {
  if (score <= 40) return '#E53935';
  if (score <= 70) return '#FB8C00';
  return '#43A047';
}

export function WellnessScoreRing({ score }: { score: number }) {
  const radius = 80;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        {/* Background circle */}
        <Circle
          stroke={APP_COLORS['body-text-disabled']}
          fill="none"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <Circle
          stroke={color}
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
      {/* Score text in the middle */}
      <View style={styles.textContainer}>
        <Text style={styles.score}>{score}%</Text>
        <Text style={styles.label}>Wellness</Text>
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
    fontSize: 22,
    fontWeight: '700',
    color: APP_COLORS['body-text'],
    fontFamily: 'Manrope',
  },
  label: {
    fontSize: 14,
    color: APP_COLORS['body-text-disabled'],
    fontFamily: 'Manrope',
  },
});
