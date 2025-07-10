import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

export default function Home() {
  const { isAuthenticated, redirectToLogin, redirectToUsers } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      redirectToUsers();
    } else {
      redirectToLogin();
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader size="lg" />
    </div>
  );
}