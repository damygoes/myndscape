import { useSupabaseSession } from "@/services/SupabaseAuthProvider";
import { router } from "expo-router";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { useEffect } from "react";
import { useDeepLinkSession } from "../hooks/useDeepLinkSession";

export function AuthManager({ children }: { children: React.ReactNode }) {
    useDeepLinkSession();
    const { loading: authLoading, session } = useSupabaseSession();
    const { user, loading: profileLoading } = useUserProfile(session?.user.id ?? '');
    console.log("🚀 [AuthManager] Session:", session);

    // Decide redirect

    useEffect(() => {
        if (!session) {
            router.replace('/onboarding');
        } else if (user && !user.isonboarded) {
            router.replace(`/profile-info?userId=${session?.user.id}`);
        } else {
            router.replace('/');
        }
        // if (!authLoading && !profileLoading) {
        //     if (!session) {
        //         router.replace('/onboarding');
        //     } else if (user && !user.isonboarded) {
        //         router.replace(`/profile-info?userId=${session?.user.id}`);
        //     } else {
        //         router.replace('/');
        //     }
        // }
    }, [authLoading, profileLoading, session, user]);

    // Only render children once auth is ready
    if (authLoading) return null;

    return <>{children}</>;
}
