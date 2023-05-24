'use client';
import localStorage from 'libs/utils/localStorageService';
import React, { useCallback, useEffect, useState } from 'react';
import { User } from 'libs/types';

const useUser = () => {
  const [user, setUser] = useState<undefined | User>(undefined);

  const getUser = async () => {
    const user = await localStorage.readLocal('user');
    return user;
  };

  const setNewUser = useCallback(async (user: User) => {
    await localStorage.setLocal('user', user);
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
