'use client';
import React from 'react';

const useUser = () => {
  const [user, setUser] = React.useState<
    { name: string; message: string } | undefined
  >(undefined);

  const setNewUser = async () => {
    setUser({ name: 'test user', message: 'test message' });
  };

  const getUser = async () => {
    if (!user) {
      await setNewUser();
    }
    return user;
  };

  const signOutUser = async () => {
    setUser(undefined);
  };

  // React.useEffect(() => {
  //   getUser();
  // }, []);

  return {
    user,
    getUser,
    setNewUser,
  };
};

export default useUser;
