import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSession from './useSession';
import { checkIsAdmin } from '../../services/adminApi';
import FullPageLoader from '../components/FullPageLoader';

/** يسمح فقط لمستخدم مسجّل وموجود في admin_users. الحماية الحقيقية للبيانات عبر RLS. */
export default function ProtectedRoute({ children }) {
  const { session, loading } = useSession();
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      setIsAdmin(null);
      return;
    }
    let alive = true;
    checkIsAdmin().then((ok) => alive && setIsAdmin(ok));
    return () => {
      alive = false;
    };
  }, [userId]);

  if (loading || (session && isAdmin === null)) return <FullPageLoader />;
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  if (!isAdmin) return <Navigate to="/admin/login" replace state={{ denied: true }} />;
  return children;
}
