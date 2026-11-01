import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function useSession() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  return { session: session ?? null, loading: session === undefined };
}
