import { BlurView } from 'expo-blur';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { useHandleJournalEntryCreation } from '../hooks/useHandleJournalEntryCreation';
import { JournalEntryInput } from './JournalEntryInput';

export const JournalCreationDialog = () => {
  const [showInput, setShowInput] = useState(false);
  const insets = useSafeAreaInsets();
  const { handleCreateEntry, createIsPending } = useHandleJournalEntryCreation();

  const onSubmit = async (content: string) => {
    await handleCreateEntry(content);
    setShowInput(false);
  };

  return (
    <>
      {!showInput && (
        <FloatingButton
          onPress={() => setShowInput(true)}
          icon="add"
          className="right-0 m-4 top-28"
        />
      )}

      <Modal
        visible={showInput}
        animationType="slide"
        transparent
        onRequestClose={() => setShowInput(false)}
      >
        <View style={StyleSheet.absoluteFill}>
          <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={styles.overlay} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={insets.top + 40}
          style={styles.keyboardContainer}
        >
          <View style={styles.cardWrapper}>
            <JournalEntryInput
              onSubmit={onSubmit}
              onCancel={() => setShowInput(false)}
              saving={createIsPending}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.4,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 500,
  },
});