import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';
import { useUpdateUserSettings } from '@/features/user/hooks/useUpdateUserSettings';
import { useEffect, useState } from 'react';
import { Switch } from 'react-native';

export function NotificationsToggle() {
  const { data: userSettings } = useUserSettingsContext();
  const [enabled, setEnabled] = useState(
    userSettings?.allow_notifications || false
  );

  const { mutateAsync: updateSettings } = useUpdateUserSettings();

  useEffect(() => {
    updateSettings({ allow_notifications: enabled });
  }, [enabled]);

  return <Switch value={enabled} onValueChange={setEnabled} />;
}
