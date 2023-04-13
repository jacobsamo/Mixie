import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@lib/config/firebase';
import type { User } from 'firebase/auth';
import AuthService from '@lib/service/AuthService';
import AuthDialog from '@components/elements/AuthDialog';
import useAuth from 'src/common/hooks/useAuth';

const UserProfile = () => {
  const [user, setUser] = useState<User>();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { handleAuthClick } = useAuth();

  const handleSignOut = () => {
    AuthService.signOutUser();
    setUser(undefined);
    setModalOpen(false);
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
      <div className="flex flex-col gap-4">
        <button ref={buttonRef} onClick={() => setModalOpen(!modalOpen)}>
          <Image
            width={42}
            height={42}
            src={user.photoURL || 'https://unsplash.com/photos/K4mSJ7kc0As'}
            alt="user profile picture"
            className="rounded-full w-10 h-10"
          />
        </button>
        {modalOpen && (
          <div className="fixed flex flex-col p-2 top-14 right-2 bg-white dark:bg-dark_grey dark:text-white text-black  items-center rounded-md shadow-md">
            <Link
              href={`@${user.displayName
                ?.toLowerCase()
                .replace(' ', '')
                .trim()}`}
            >
              Profile
            </Link>

            <Link href="#">Bookmarks</Link>

            <Link href="#">Settings</Link>

            <button onClick={handleSignOut}>Logout</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => handleAuthClick(() => console.log('clicked'))}
        className="px-2 p-1 bg-yellow rounded-md text-black font-semibold"
      >
        Sign up
      </button>
      {/* <AuthDialog user={user} setUser={setUser} open={open} setOpen={setOpen} /> */}
    </>
  );
};

export default UserProfile;
