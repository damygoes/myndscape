import { ThemedSafeAreaView } from "@/components/layouts/ThemedSafeAreaView";
import { COLORS, type ThemeColors } from "@/constants/colors";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

export function PaywallScreen() {
    const colors = COLORS[useColorScheme() ?? 'light'];
    const styles = getStyles(colors);

    const handleUpgrade = () => {
        // Handle the upgrade logic here
    };

    const handleMaybeLater = () => {
        router.back();
    };


    return (

        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <Text style={styles.title}>Unlock Your Full Mindscape</Text>
            <Text style={styles.subtitle}>
                Take your journaling to the next level. Discover insights, themes, and tips tailored just for you.
            </Text>

            {/* Free Plan Overview */}
            <View style={styles.planContainer}>
                <Text style={styles.planTitle}>Free Plan</Text>
                <Text style={styles.planFeature}>✓ Summaries of your journal entries</Text>
                <Text style={styles.planFeature}>✓ Mood detection</Text>
            </View>

            {/* Premium Plan Overview */}
            <View style={[styles.planContainer, styles.premiumPlan]}>
                {/* Badge */}
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>Most Popular</Text>
                </View>

                <Text style={styles.planTitle}>Premium Plan</Text>
                <Text style={styles.planFeature}>✓ Summaries of your journal entries</Text>
                <Text style={styles.planFeature}>✓ Mood detection</Text>
                <Text style={styles.planFeature}>✓ Theme identification (stress, joy, fatigue, and more)</Text>
                <Text style={styles.planFeature}>✓ Personalized coping tips</Text>
                <Text style={styles.planFeature}>✓ Export your journals as PDF</Text>
                <Text style={styles.planFeature}>✓ Priority support whenever you need help</Text>
            </View>


            {/* Call to Action */}
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
                <Text style={[styles.buttonText, { color: colors.white }]}>Upgrade to Premium</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.laterButton} onPress={handleMaybeLater}>
                <Text style={[styles.laterButtonText, { color: colors.textSecondary }]}>Maybe Later</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={[styles.footerText, { color: colors.textMuted }]}>
                Unlock insights that go beyond just writing. See patterns, understand your mind, and take action for a healthier you.
            </Text>
        </ScrollView>

    );
}

const getStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        scrollContainer: {
            padding: 20,
            alignItems: "center",
        },
        title: {
            fontSize: 28,
            fontWeight: "bold",
            color: colors.textPrimary,
            textAlign: "center",
            marginVertical: 20,
        },
        subtitle: {
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: "center",
            marginBottom: 30,
        },
        planContainer: {
            backgroundColor: colors.cardBackground,
            padding: 20,
            borderRadius: 16,
            width: "100%",
            marginBottom: 20,
        },
        premiumPlan: {
            borderColor: colors.primary,
            borderWidth: 1,
        },
        badgeContainer: {
            position: 'absolute',
            top: -10,
            right: -10,
            backgroundColor: colors.primary,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 12,
            zIndex: 1,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 5, // Android shadow
        },
        badgeText: {
            color: colors.white,
            fontSize: 12,
            fontWeight: 'bold',
        },

        planTitle: {
            fontSize: 20,
            fontWeight: "bold",
            color: colors.textPrimary,
            marginBottom: 10,
            textAlign: "center",
        },
        planFeature: {
            fontSize: 16,
            color: colors.textSecondary,
            marginVertical: 4,
        },
        button: {
            paddingVertical: 14,
            paddingHorizontal: 40,
            borderRadius: 30,
            marginTop: 20,
        },
        buttonText: {
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
        },
        laterButton: {
            marginTop: 15,
        },
        laterButtonText: {
            fontSize: 16,
            textDecorationLine: "underline",
        },
        footerText: {
            fontSize: 14,
            textAlign: "center",
            marginTop: 30,
            paddingHorizontal: 10,
        },
    });
