import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type RenderFieldParams = {
  label: string;
  value: string;
  setValue: (text: string) => void;
  editing: boolean;
  colors: {
    textMuted: string;
    inputBackground: string;
    border: string;
    textPrimary: string;
  };
  multiline?: boolean;
};

export function renderField({
  label,
  value,
  setValue,
  editing,
  colors,
  multiline = false,
}: RenderFieldParams) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      {editing ? (
        <TextInput
          value={value}
          onChangeText={setValue}
          multiline={multiline}
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
              color: colors.textPrimary,
              textAlignVertical: multiline ? 'top' : 'center',
            },
          ]}
        />
      ) : (
        <Text style={[styles.staticText, { color: colors.textPrimary }]}>
          {value || 'Not set'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 16 },
  label: { fontSize: 14, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
  },
  staticText: {
    fontSize: 18,
  },
});
