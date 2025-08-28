import { createContext, useContext, useMemo } from 'react';
import { useCurrentUserSettings } from '../hooks/useCurrentUserSettings';

type UserSettingsContextValue = {
  data: Awaited<ReturnType<typeof useCurrentUserSettings>>['data'];
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  isFetching: boolean;
};

export const UserSettingsContext = createContext<
  UserSettingsContextValue | undefined
>(undefined);

export function UserSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, error, refetch, isFetching } =
    useCurrentUserSettings();

  const value = useMemo(
    () => ({
      data,
      isLoading,
      error,
      refetch,
      isFetching,
    }),
    [data, isLoading, error, refetch, isFetching]
  );

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
}

export function useUserSettingsContext() {
  const ctx = useContext(UserSettingsContext);
  if (!ctx) {
    throw new Error(
      'useUserSettingsContext must be used within UserSettingsProvider'
    );
  }
  return ctx;
}
