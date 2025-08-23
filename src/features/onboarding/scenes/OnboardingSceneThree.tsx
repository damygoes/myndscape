import OnboardingScene from '../components/OnboardingScene';

export default function OnboardingSceneThree() {
  return (
    <OnboardingScene
      image={require('../../../../assets/images/onboarding-3.png')}
      title="Grow With Myndscape"
      subtitle="Watch your emotional patterns, build healthier habits, and discover calm — with an AI buddy that evolves with you."
      totalIndicators={3}
      activeIndex={2}
    />
  );
}
