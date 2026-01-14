import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  // Show nothing while checking authentication status
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;