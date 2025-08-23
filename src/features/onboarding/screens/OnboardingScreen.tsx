import { Button } from '@/components/button/Button';
import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import OnboardingSceneOne from '../scenes/OnboardingSceneOne';
import OnboardingSceneTwo from '../scenes/OnboardingSceneTwo';
import OnboardingSceneThree from '../scenes/OnboardingSceneThree';
import { router } from 'expo-router';

export default function OnboardingScreen() {
  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <ThemedSafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        gap: 4,
      }}
    >
      <PagerView style={styles.container} initialPage={0}>
        <OnboardingSceneOne />
        <OnboardingSceneTwo />
        <OnboardingSceneThree />
      </PagerView>

      <Button
        title="Get Started"
        onPress={handleGetStarted}
        style={{ marginBottom: 24 }}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
