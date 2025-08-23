import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { COLORS, type ThemeColors } from '@/constants/colors';
import { router } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { plans } from '../constants';

export function PaywallScreen() {
  const colors = COLORS[useColorScheme() ?? 'light'];
  const styles = getStyles(colors);

  const handleUpgrade = (planId: string) => {
    // TODO: hook into Expo in-app purchases
    console.log('Upgrade to', planId);
  };

  const handleMaybeLater = () => router.back();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <Text style={styles.title}>Unlock Your Full Mindscape</Text>
      <Text style={styles.subtitle}>
        Take your journaling to the next level. Discover insights, themes, and
        tips tailored just for you.
      </Text>

      {/* Plan Cards */}
      {plans.map((plan) => (
        <View
          key={plan.id}
          style={[styles.planContainer, plan.badge ? styles.premiumPlan : null]}
        >
          {plan.badge && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{plan.badge}</Text>
            </View>
          )}
          <Text style={styles.planTitle}>{plan.name}</Text>
          {plan.price === '€0' ? null : (
            <Text style={styles.planPrice}>{plan.price}</Text>
          )}
          {plan.featuresText.map((feature, index) => (
            <Text key={index} style={styles.planFeature}>
              {feature}
            </Text>
          ))}

          {plan.id !== 'free' && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => handleUpgrade(plan.id)}
            >
              <Text style={[styles.buttonText, { color: colors.white }]}>
                Choose {plan.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Optional Later Button */}
      <TouchableOpacity style={styles.laterButton} onPress={handleMaybeLater}>
        <Text style={[styles.laterButtonText, { color: colors.textSecondary }]}>
          Maybe Later
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={[styles.footerText, { color: colors.textMuted }]}>
        Unlock insights that go beyond just writing. See patterns, understand
        your mind, and take action for a healthier you.
      </Text>
    </ScrollView>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    scrollContainer: { padding: 20, alignItems: 'center' },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.textPrimary,
      textAlign: 'center',
      marginVertical: 20,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 30,
    },
    planContainer: {
      backgroundColor: colors.cardBackground,
      padding: 20,
      borderRadius: 16,
      width: '100%',
      marginBottom: 20,
    },
    premiumPlan: { borderColor: colors.primary, borderWidth: 1 },
    badgeContainer: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: colors.primary,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 12,
      zIndex: 1,
    },
    badgeText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },
    planTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: 10,
      textAlign: 'center',
    },
    planPrice: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 10,
      textAlign: 'center',
    },
    planFeature: {
      fontSize: 14,
      color: colors.textSecondary,
      marginVertical: 4,
    },
    button: {
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      marginTop: 15,
    },
    buttonText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    laterButton: { marginTop: 15 },
    laterButtonText: { fontSize: 16, textDecorationLine: 'underline' },
    footerText: {
      fontSize: 14,
      textAlign: 'center',
      marginTop: 30,
      paddingHorizontal: 10,
    },
  });
