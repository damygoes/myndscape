import { useAppLocale } from '@/services/i18n/useAppLocale';
import OnboardingScene from '../components/OnboardingScene';

export default function OnboardingSceneOne() {
  const { t } = useAppLocale();
  return (
    <OnboardingScene
      image={require('../../../../assets/images/onboarding-1.png')}
      callouts={[
        {
          content: t('Onboarding.SceneOne.Callouts.one'),
          position: 'top-left',
          bgColor: '#DC560E1A',
        },
        {
          content: t('Onboarding.SceneOne.Callouts.two'),
          position: 'bottom-right',
          offsetY: 100,
          bgColor: '#D9D9D9',
        },
      ]}
      title={t('Onboarding.SceneOne.title')}
      subtitle={t('Onboarding.SceneOne.description')}
      totalIndicators={3}
      activeIndex={0}
    />
  );
}
