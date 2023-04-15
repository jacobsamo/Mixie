import Custom404 from '@components/layouts/Custom404';
import localStorage from 'libs/utils/localStorage';
import React, { useEffect, useState } from 'react';
import { InputField } from 'shared';
import Image from 'next/image';
import { User } from 'libs/types';

const Customization = () => {
  const [user, setUser] = useState<undefined | User>(undefined);

  const getUser = async () => {
    const user = await localStorage.readLocal('user');
    return user;
  };

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);
  if (user) {
    return <div>Customization</div>;
  }

  return (
    <Custom404>
      You are not logged in please click the sign up button in the top right
      hand corner.
    </Custom404>
  );
};

export default Customization;
