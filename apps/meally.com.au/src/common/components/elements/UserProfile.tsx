import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog } from 'ui';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { auth } from '@lib/config/firebase';
import type { User } from 'firebase/auth';
import AuthService from '@lib/service/Authservice';
import SignInDialog from './SignInDialog';

const UserProfile = () => {
  const [user, setUser] = useState<User>();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    AuthService.signOutUser();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    if (user) {
      setOpen(false);
    }
  }, [user]);

  if (user) {
    return (
      <button onClick={() => handleSignOut()}>
        <Image
          width={42}
          height={42}
          src={user.photoURL || 'https://unsplash.com/photos/K4mSJ7kc0As'}
          alt="user profile picture"
          className="rounded-full w-10 h-10"
        />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="px-2 p-1 bg-yellow rounded-md text-black font-semibold"
      >
        Sign up
      </button>
      <SignInDialog
        user={user}
        setUser={setUser}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default UserProfile;
