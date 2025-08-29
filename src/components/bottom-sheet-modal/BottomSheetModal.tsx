import { APP_COLORS } from '@/constants/colors';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { ReactNode } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  showCancelButton?: boolean; // optional
}

export function BottomSheetModal({
  visible,
  onClose,
  children,
  showCancelButton = true,
}: BottomSheetModalProps) {
  const i18n = useAppLocale();

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <View
          style={{
            backgroundColor: APP_COLORS.offwhite,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 20,
          }}
        >
          {children}

          {showCancelButton && (
            <TouchableOpacity
              onPress={onClose}
              style={{
                padding: 12,
                marginTop: 8,
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: APP_COLORS['body-text-disabled'] + '10',
              }}
            >
              <Text
                style={{
                  color: APP_COLORS.error,
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                {i18n.t('BottomSheetModal.cancel')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
