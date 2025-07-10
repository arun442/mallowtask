import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { checkAuth } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading, user, error } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const redirectToLogin = () => {
    router.push('/login');
  };

  const redirectToUsers = () => {
    router.push('/users');
  };

  return { 
    isAuthenticated, 
    isLoading, 
    user, 
    error, 
    redirectToLogin, 
    redirectToUsers 
  };
};