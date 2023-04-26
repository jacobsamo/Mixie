import Custom404 from '@components/layouts/Custom404';
import localStorage from 'libs/utils/localStorage';
import React, { useEffect, useState } from 'react';
import { InputField } from 'shared';
import Image from 'next/image';
import { User } from 'libs/types';
import Button from 'shared/src/components/buttons/Button';
import useUser from 'src/common/hooks/useUser';
import NavHeader from './NavHeader';

const Account = () => {
  const user = useUser();

  if (user) {
    return (
      <>
        <NavHeader />
        <div className="w-full h-full flex flex-col comingSoon">
          <h1 className="text-step0">Coming soon</h1>
          <p>This page is where you will be able request your information</p>
          <p>and delete your account</p>
        </div>
      </>
    );
  }

  return (
    <Custom404>
      You are not logged in please click the sign up button in the top right
      hand corner.
    </Custom404>
  );
};

export default Account;
