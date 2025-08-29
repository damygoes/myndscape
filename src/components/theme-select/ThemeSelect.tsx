import { BottomSheetModal } from '@/components/bottom-sheet-modal/BottomSheetModal';
import { APP_COLORS } from '@/constants/colors';
import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';
import { useUpdateUserSettings } from '@/features/user/hooks/useUpdateUserSettings';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type ThemeOption = 'light' | 'dark' | 'system';

export function ThemeSelect() {
  const i18n = useAppLocale();
  const { data: userSettings } = useUserSettingsContext();
  const [theme, setTheme] = useState<ThemeOption>(
    (userSettings?.theme as ThemeOption) || 'system'
  );
  const [modalVisible, setModalVisible] = useState(false);
  const { mutateAsync: updateSettings } = useUpdateUserSettings();

  const themeOptions: { label: string; value: ThemeOption }[] = [
    { label: i18n.t('Themes.system'), value: 'system' },
    { label: i18n.t('Themes.light'), value: 'light' },
    { label: i18n.t('Themes.dark'), value: 'dark' },
  ];

  useEffect(() => {
    updateSettings({ theme });
  }, [theme]);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ color: APP_COLORS['body-text-disabled'] }}>
          {themeOptions.find((opt) => opt.value === theme)?.label}
        </Text>
      </TouchableOpacity>

      <BottomSheetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        {themeOptions.map((option) => {
          const selected = option.value === theme;
          return (
            <TouchableOpacity
              key={option.value}
              style={{
                padding: 16,
                borderRadius: 999,
                backgroundColor: selected
                  ? APP_COLORS['primary'] + '20'
                  : 'transparent',
                marginBottom: 4,
              }}
              onPress={() => {
                setTheme(option.value);
                setModalVisible(false);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: selected
                    ? APP_COLORS['primary']
                    : APP_COLORS['body-text'],
                  fontWeight: selected ? '600' : '400',
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
