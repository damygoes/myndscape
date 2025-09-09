import { Input } from '@/components/input/Input';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';
import { APP_COLORS } from '@/constants/colors';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useCallback, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export function HeaderSearchBar({ onCommit }: { onCommit: (value: string) => void }) {
  const { t } = useAppLocale();
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const commit = useCallback(() => onCommit(text.trim()), [text, onCommit]);
  const clear = useCallback(() => {
    setText('');
    onCommit('');
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [onCommit]);

  const showClear = text.trim().length > 0;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View style={{ flex: 1 }}>
        <Input
          ref={inputRef}
          value={text}
          onChangeText={setText}
          placeholder={t('HeaderSearchBar.placeholder')}
          returnKeyType="search"
          onSubmitEditing={commit}
          icon={showClear ? 'close' : undefined}
          iconPosition="right"
          onIconPress={showClear ? clear : undefined}
        />
      </View>

      <TouchableOpacity
        onPress={commit}
        disabled={!showClear}
        style={{
          marginLeft: 8,
          padding: 12,
          opacity: showClear ? 1 : 0.5,
          backgroundColor: APP_COLORS.primary,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          height: 48,
        }}
      >
        <IconSymbol name="send" color={APP_COLORS.offwhite} />
      </TouchableOpacity>
    </View>
  );
}
