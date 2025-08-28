import OnboardingScene from '../components/OnboardingScene';

export default function OnboardingSceneTwo() {
  return (
    <OnboardingScene
      image={require('../../../../assets/images/onboarding-2.png')}
      callouts={[
        {
          content: '😁',
          position: 'top-left',
          offsetY: 120,
          offsetX: 60,
          bgColor: '#E3E2DD',
        },
        {
          content: '😔',
          position: 'bottom-right',
          offsetY: 180,
          offsetX: 60,
          bgColor: '#E3E2DD',
        },
      ]}
      title="Mood Support"
      subtitle="Get gentle tips, reflections, and activities designed to lift your mood and brighten your lifestyle, one step at a time."
      totalIndicators={3}
      activeIndex={1}
    />
  );
}
