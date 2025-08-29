import { useAppLocale } from '@/services/i18n/useAppLocale';
import OnboardingScene from '../components/OnboardingScene';

export default function OnboardingSceneTwo() {
  const { t } = useAppLocale();
  return (
    <OnboardingScene
      image={require('../../../../assets/images/onboarding-2.png')}
      callouts={[
        {
          content: t('Onboarding.SceneTwo.Callouts.one'),
          position: 'top-left',
          offsetY: 120,
          offsetX: 60,
          bgColor: '#E3E2DD',
        },
        {
          content: t('Onboarding.SceneTwo.Callouts.two'),
          position: 'bottom-right',
          offsetY: 180,
          offsetX: 60,
          bgColor: '#E3E2DD',
        },
      ]}
      title={t('Onboarding.SceneTwo.title')}
      subtitle={t('Onboarding.SceneTwo.description')}
      totalIndicators={3}
      activeIndex={1}
    />
  );
}
