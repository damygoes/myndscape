import { APP_COLORS } from '@/constants/colors';
import { SettingsRow } from '@/features/settings/components/SettingsRow';
import { useRouter } from 'expo-router';
import { Linking, ScrollView } from 'react-native';

export default function SupportSettings() {
  const router = useRouter();

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@yourapp.com');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: APP_COLORS['primary-background'] }}>
      <SettingsRow
        title="FAQs"
        subtitle="Find quick answers to common questions"
        icon="help-circle-outline"
        onPress={() => router.push('/(stack)/(tabs)/settings/(support)/faqs')}
      />

      <SettingsRow
        title="Privacy & Terms"
        subtitle="Read our privacy policy, disclaimer, and terms of service"
        icon="lock-closed-outline"
        onPress={() => router.push('/(stack)/(tabs)/settings/(support)/legal')}
      />

      <SettingsRow
        title="Contact Support"
        subtitle="Reach us at support@yourapp.com"
        icon="mail-outline"
        onPress={handleEmailSupport}
      />

      <SettingsRow title="App Info" subtitle="Version 2.0.0" icon="information-circle-outline" />
    </ScrollView>
  );
}
