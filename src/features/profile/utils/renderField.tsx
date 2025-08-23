import { Input } from '@/components/input/Input';
import { APP_COLORS } from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type RenderFieldParams = {
  label: string;
  value: string;
  setValue: (text: string) => void;
  editing: boolean;
  multiline?: boolean;
};

export function renderField({
  label,
  value,
  setValue,
  editing,
  multiline = false,
}: RenderFieldParams) {
  return (
    <View style={styles.field}>
      <Text
        style={[
          styles.label,
          { color: APP_COLORS['body-text-disabled'], fontFamily: 'Manrope' },
        ]}
      >
        {label}
      </Text>
      {editing ? (
        <Input value={value} onChangeText={setValue} multiline={multiline} />
      ) : (
        <Text
          style={{
            fontSize: 16,
            color: APP_COLORS['body-text'],
            fontFamily: 'Manrope',
          }}
        >
          {value || 'Not set'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 16 },
  label: { fontSize: 12, marginBottom: 4 },
});
