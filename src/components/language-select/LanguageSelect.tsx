import { BottomSheetModal } from '@/components/bottom-sheet-modal/BottomSheetModal';
import { APP_COLORS } from '@/constants/colors';
import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';
import { useUpdateUserSettings } from '@/features/user/hooks/useUpdateUserSettings';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export function LanguageSelect() {
  const { t, changeLanguage, locale } = useAppLocale();
  const { data, refetch } = useUserSettingsContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [localValue, setLocalValue] = useState<string>(data?.language || 'en');

  const { mutateAsync: updateSettings } = useUpdateUserSettings();

  const languageOptions = [
    { label: t('Languages.english'), value: 'en' },
    { label: t('Languages.french'), value: 'fr' },
    { label: t('Languages.german'), value: 'de' },
  ];

  // Sync local state when user settings change
  useEffect(() => {
    if (data?.language && data.language !== localValue) {
      setLocalValue(data.language);
      changeLanguage(data.language); // sync i18n with DB value
    }
  }, [data?.language]);

  const handleSelect = async (lang: string) => {
    if (lang === localValue) {
      setModalVisible(false);
      return;
    }

    setLocalValue(lang);
    setModalVisible(false);

    try {
      // update user settings in DB
      await updateSettings({ language: lang });
      await refetch();
      // update i18n immediately
      changeLanguage(lang);
    } catch (err) {
      console.error('Failed to update language', err);
    }
  };

  const selectedLabel =
    languageOptions.find((opt) => opt.value === localValue)?.label ?? 'Select';

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ color: APP_COLORS['body-text-disabled'] }}>
          {selectedLabel}
        </Text>
      </TouchableOpacity>

      <BottomSheetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        {languageOptions.map((option) => {
          const selected = option.value === localValue;
          return (
            <TouchableOpacity
              key={option.value}
              style={{
                padding: 12,
                borderRadius: 999,
                backgroundColor: selected
                  ? APP_COLORS['primary'] + '20'
                  : 'transparent',
                marginBottom: 4,
              }}
              onPress={() => handleSelect(option.value)}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: selected ? '600' : '400',
                  color: selected
                    ? APP_COLORS['primary']
                    : APP_COLORS['body-text'],
                  fontFamily: 'Manrope',
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BottomSheetModal>
    </View>
  );
}
