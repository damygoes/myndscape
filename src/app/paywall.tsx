import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { JournalEntries } from '@/features/journal-entries/components/JournalEntries';
import { PaywallScreen } from '@/features/paywall/screens/PaywallScreen';
import { router } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Paywall() {


    return (
        <SafeAreaView
            style={{ marginBottom: 24, height: '100%' }}
            edges={['bottom', 'left', 'right']}
        >
            <PaywallScreen />
        </SafeAreaView>
    );
}
