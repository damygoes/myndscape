import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { useState } from 'react';
import { useHandleJournalEntryCreation } from '../hooks/useHandleJournalEntryCreation';
import { JournalEntryInput } from './JournalEntryInput';

export const JournalCreationDialog = () => {
  const [showInput, setShowInput] = useState(false);
  const { handleCreateEntry, createIsPending } = useHandleJournalEntryCreation();

  if (!showInput) {
    return <FloatingButton onPress={() => setShowInput(true)} />;
  }

  return (
    <JournalEntryInput
      onSubmit={async (content) => {
        await handleCreateEntry(content);
        setShowInput(false);
      }}
      onCancel={() => setShowInput(false)}
      saving={createIsPending}
    />
  );
};