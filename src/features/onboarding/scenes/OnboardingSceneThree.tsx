import { useAppLocale } from '@/services/i18n/useAppLocale';
import OnboardingScene from '../components/OnboardingScene';

export default function OnboardingSceneThree() {
  const { t } = useAppLocale();
  return (
    <OnboardingScene
      image={require('../../../../assets/images/onboarding-3.png')}
      title={t('Onboarding.SceneThree.title')}
      subtitle={t('Onboarding.SceneThree.description')}
      totalIndicators={3}
      activeIndex={2}
    />
  );
}
