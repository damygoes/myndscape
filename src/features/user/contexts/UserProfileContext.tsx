import { useCurrentUserProfile } from '@/features/profile/hooks/useCurrentUserProfile';
import { createContext, use, useContext, useMemo } from 'react';

type UserProfileContextValue = {
  data: Awaited<ReturnType<typeof useCurrentUserProfile>>['data'];
  userId: Awaited<ReturnType<typeof useCurrentUserProfile>>['userId'];
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  isFetching: boolean;
};

export const UserProfileContext = createContext<
  UserProfileContextValue | undefined
>(undefined);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, userId, isLoading, error, refetch, isFetching } =
    useCurrentUserProfile();

  const value = useMemo(
    () => ({
      data,
      userId,
      isLoading,
      error,
      refetch,
      isFetching,
    }),
    [data, userId, isLoading, error, refetch, isFetching]
  );

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfileContext() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error(
      'useUserProfileContext must be used within UserProfileProvider'
    );
  }
  return ctx;
}
