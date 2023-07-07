'use client';
import { useSession } from 'next-auth/react';

const useUser = () => {
  const session = useSession();

  return {
    session,
    user: session?.data?.user,
    isLoading: session?.status === 'loading',
    isSignedIn: session?.status === 'authenticated',
  };
};

export default useUser;
