import localStorage from 'libs/utils/localStorage';
import React, { useEffect, useState } from 'react';
import { User } from 'libs/types';

function useUser() {
  const [user, setUser] = useState<undefined | User>(undefined);

  const getUser = async () => {
    const user = await localStorage.readLocal('user');
    return user;
  };

  const setNewUser = async (user: User) => {
    await localStorage.setLocal('user', user);
    setUser(user);
  };

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  return user;
}

export default useUser;
