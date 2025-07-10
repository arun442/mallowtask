import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import UserList from '../components/users/UserList';

export default function Users() {
  const { isAuthenticated, redirectToLogin } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-10 py-2 bg-[#DEDEDE]">
      <UserList />
    </div>
  );
}