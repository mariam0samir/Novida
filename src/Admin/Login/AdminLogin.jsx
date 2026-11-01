import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from '../AdminContext';
import { AdminFrame, LangButton } from '../Layout/AdminLayout';
import { signIn, signOut, checkIsAdmin } from '../../services/adminApi';
import useSession from '../auth/useSession';
import { Input } from '../components/FormFields';
import { PrimaryButton } from '../components/Buttons';
import ErrorBanner from '../components/ErrorBanner';
import FullPageLoader from '../components/FullPageLoader';

export default function AdminLogin() {
  return (
    <AdminProvider>
      <LoginForm />
    </AdminProvider>
  );
}

function LoginForm() {
  const { tr } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading } = useSession();
  const denied = location.state?.denied;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(denied ? tr('notAdmin') : null);

  // حساب بدون صلاحية: نخرجه حتى يستطيع الدخول بحساب آخر
  useEffect(() => {
    if (denied) signOut();
  }, [denied]);

  if (loading) return <FullPageLoader />;
  if (session && !denied && !busy) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn(email.trim(), password);
      if (!(await checkIsAdmin())) {
        await signOut();
        setError(tr('notAdmin'));
        return;
      }
      navigate(location.state?.from || '/admin', { replace: true });
    } catch {
      setError(tr('loginFailed'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminFrame className="flex flex-col">
      <div className="flex justify-end p-4">
        <LangButton />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <p className="text-2xl font-bold tracking-wide text-[var(--admin-primary)]">NOVIDA</p>
            <h1 className="mt-1 text-sm text-gray-500">{tr('loginTitle')}</h1>
          </div>
          {error && <ErrorBanner message={error} />}
          <Input type="email" dir="ltr" label={tr('email')} required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" dir="ltr" label={tr('password')} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <PrimaryButton type="submit" className="w-full" disabled={busy}>
            {busy ? tr('loading') : tr('login')}
          </PrimaryButton>
        </form>
      </div>
    </AdminFrame>
  );
}
