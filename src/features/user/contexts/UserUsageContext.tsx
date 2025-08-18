import { createContext, useContext, useMemo } from "react";
import { useUserUsage } from "../hooks/useUserUsage";

type UserUsageContextValue = {
    data: Awaited<ReturnType<typeof useUserUsage>>["data"];
    isLoading: boolean;
    error: unknown;
    refetch: () => void;
};

const UserUsageContext = createContext<UserUsageContextValue | undefined>(
    undefined
);

export function UserUsageProvider({ children }: { children: React.ReactNode }) {
    const { data, isLoading, error, refetch } = useUserUsage();

    const value = useMemo(
        () => ({
            data,
            isLoading,
            error,
            refetch,
        }),
        [data, isLoading, error, refetch]
    );

    return (
        <UserUsageContext.Provider value={value}>
            {children}
        </UserUsageContext.Provider>
    );
}

export function useUserUsageContext() {
    const ctx = useContext(UserUsageContext);
    if (!ctx) {
        throw new Error("useUserUsageContext must be used within UserUsageProvider");
    }
    return ctx;
}
