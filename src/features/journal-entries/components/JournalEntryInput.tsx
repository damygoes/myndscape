import { Card, CardFooter, CardHeader, CardTitle } from '@/components/card/Card';
import { colors } from '@/utils/colors';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

export const JournalEntryInput = ({ onSubmit, onCancel, saving }: Props) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handlePress = () => {
    if (!content.trim()) {
      setError("Please tell me how you're feeling today");
      return;
    }
    setError(null);
    onSubmit(content);
    setContent('');
  };

  const handleChange = (text: string) => {
    if (error) setError(null);
    setContent(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <BlurView
        intensity={20}
        tint="light"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      
      {/* Semi-transparent overlay for additional dimming */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(45, 41, 38, 0.3)', // colors.textPrimary with opacity
        }}
      />

      <View style={{ padding: 6 }}>
        <Card 
          style={{
            gap: 24,
            marginBottom: 16,
            minHeight: 256,
            backgroundColor: colors.cardBackground,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <CardHeader>
            <CardTitle style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: '600',
            }}>
              How are you feeling today?
            </CardTitle>
          </CardHeader>
       
          <TextInput
            value={content}
            onChangeText={handleChange}
            placeholder="Describe your feelings..."
            placeholderTextColor={colors.inputPlaceholder}
            multiline
            style={{
              padding: 24,
              borderRadius: 8,
              minHeight: 128,
              backgroundColor: colors.inputBackground,
              color: colors.textPrimary,
              borderWidth: 1,
              borderColor: error && !content ? colors.textError : colors.inputBorder,
              fontSize: 16,
              lineHeight: 22,
              textAlignVertical: 'top',
            }}
          />

          {error && (
            <Text style={{ 
              marginTop: 4, 
              fontSize: 14, 
              color: colors.textError,
              marginLeft: 24,
            }}>
              {error}
            </Text>
          )}

          <CardFooter style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 16,
            borderTopWidth: 0,
            paddingTop: 0,
          }}>
            <TouchableOpacity 
              onPress={onCancel}
              style={{
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <Text style={{ 
                color: colors.textSecondary,
                fontSize: 16,
              }}>
                Cancel
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handlePress}
              disabled={saving}
              style={{
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 24,
                backgroundColor: colors.primary,
                minWidth: 100,
              }}
            >
              {saving ? (
                <ActivityIndicator color={colors.background} size="small" />
              ) : (
                <Text style={{
                  fontWeight: '600',
                  color: colors.background,
                  fontSize: 16,
                }}>
                  Add Entry
                </Text>
              )}
            </TouchableOpacity>
          </CardFooter>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};