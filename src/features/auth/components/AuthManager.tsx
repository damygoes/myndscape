import { useSupabaseSession } from "@/services/SupabaseAuthProvider";
import { router } from "expo-router";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { useEffect } from "react";

export function AuthManager({ children }: { children: React.ReactNode }) {
    const { loading: authLoading, session } = useSupabaseSession();
    const { user, loading: profileLoading } = useUserProfile(session?.user.id ?? '');

    // Decide redirect
    useEffect(() => {
        if (!authLoading && !profileLoading) {
            if (!session) {
                router.replace('/onboarding');
            } else if (user && !user.isonboarded) {
                router.replace('/onboarding');
            } else {
                router.replace('/');
            }
        }
    }, [authLoading, profileLoading, session, user]);

    // Only render children once auth is ready
    if (authLoading || profileLoading) return null;

    return <>{children}</>; // render the Slot content
}
