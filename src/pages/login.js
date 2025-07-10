import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/forms/LoginForm';
export default function Login() {
  const { isAuthenticated, redirectToUsers } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      redirectToUsers();
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DEDEDE]">
      <LoginForm />
    </div>
  );
}