import OnboardingScene from '../components/OnboardingScene';

export default function OnboardingSceneOne() {
  return (
    <OnboardingScene
      image={require('../../../../assets/images/onboarding-1.png')}
      callouts={[
        {
          content: 'How are you feeling today?',
          position: 'top-left',
          bgColor: '#DC560E1A',
        },
        {
          content: 'Today, I am feeling happy!',
          position: 'bottom-right',
          offsetY: 100,
          bgColor: '#D9D9D9',
        },
      ]}
      title="Your Safe space, always"
      subtitle="Share how you’re feeling — Myndscape listens without judgment."
      totalIndicators={3}
      activeIndex={0}
    />
  );
}
