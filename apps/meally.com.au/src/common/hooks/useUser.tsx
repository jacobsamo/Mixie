'use client';
import localStorage from 'libs/utils/localStorageService';
import React, { useCallback, useEffect, useState } from 'react';
import { User } from 'libs/types';
import { getCookie, setCookie } from 'cookies-next';

const useUser = () => {
  const [user, setUser] = useState<undefined | User>(undefined);

  const getUser = async () => {
    const user = await getCookie('user');
    return user ? JSON.parse(user?.toString()) : undefined;
  };

  const setNewUser = useCallback(async (user: User) => {
    await setCookie('user', user);
    setUser(user);
  }, []);

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  return {
    user,
    setNewUser,
  };
};

export default useUser;
