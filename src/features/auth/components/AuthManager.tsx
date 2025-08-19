import { LoadingState } from "@/components/LoadingState";
import { useSupabaseSession } from "@/services/SupabaseAuthProvider";
import { router } from "expo-router";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { useEffect } from "react";
import { useDeepLinkSession } from "../hooks/useDeepLinkSession";
import { useFonts } from "expo-font";
import { RootStack } from "@/components/layouts/RootStack";

export function AuthManager() {

    useDeepLinkSession();

    const { loading: authLoading, session } = useSupabaseSession();

    const { user, loading: profileLoading } = useUserProfile(session?.user.id ?? '');

    const [fontsLoaded] = useFonts({
        SpaceMono: require('../../../../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (!authLoading && !session) {
            router.replace('/welcome');
        }
    }, [authLoading, session]);

    useEffect(() => {
        if (session && !profileLoading && user && !user.isonboarded) {
            router.replace('/onboarding');
        }
    }, [session, user]);

    if ((authLoading || !fontsLoaded) && session) {
        return <LoadingState />;
    }


    return <RootStack />;
}