import { supabase } from '@/services/supabase';
import { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

export const SupabaseAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('❌ getSession error:', error.message);
      }

      if (mounted) {
        setSession(session);
        setLoading(false);
      }

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (mounted) {
            setSession(session);
          }
        }
      );

      return () => {
        mounted = false;
        listener.subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseSession = () => useContext(AuthContext);
