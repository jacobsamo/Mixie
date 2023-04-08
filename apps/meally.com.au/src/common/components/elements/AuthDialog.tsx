import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog } from 'shared';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { auth } from '@lib/config/firebase';
import type { User, UserCredential } from 'firebase/auth';
import AuthService from '@lib/service/AuthService';

interface AuthDialogProps {
  user?: User | undefined;
  setUser?: (value: User) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AuthDialog = ({ user, setUser, open, setOpen }: AuthDialogProps) => {
  const [internalUser, setInternalUser] = useState<User | undefined>();
  const [internalOpen, setInternalOpen] = useState(false);

  const handleGithubClick = async () => {
    try {
      const result = await AuthService.signInWithGithub().then(
        (result: UserCredential) => {
          AuthService.createUserDoc(result.user);
          setUser ? setUser(result.user) : setInternalUser(result.user);
        }
      );
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleClick = async () => {
    try {
      const result = await AuthService.signInWithGoogle().then(
        (result: UserCredential) => {
          AuthService.createUserDoc(result.user);
          setUser ? setUser(result.user) : setInternalUser(result.user);
        }
      );
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookClick = async () => {
    try {
      const result = await AuthService.signInWithFacebook().then(
        (result: UserCredential) => {
          AuthService.createUserDoc(result.user);
          setUser ? setUser(result.user) : setInternalUser(result.user);
        }
      );
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTwitterClick = async () => {
    try {
      const result = await AuthService.signInWithTwitter().then(
        (result: UserCredential) => {
          AuthService.createUserDoc(result.user);
          setUser ? setUser(result.user) : setInternalUser(result.user);
        }
      );
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser ? setUser(user) : setInternalUser(user);
      }
    });
    if (user || internalUser) {
      setOpen(false);
    }
  }, [user, internalUser]);

  return (
    <>
      <Dialog
        isOpen={open}
        setOpen={() => setOpen(!open)}
        closeOnEscape={true}
        closeOnOutsideClick={true}
        className="flex flex-col justify-center items-center gap-2 sticky w-96 h-max dark:bg-dark_grey bg-white rounded-2xl p-2"
      >
        <div className="justify-center w-full flex flex-row">
          <h1>Sign up to Meally</h1>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="absolute right-2"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleFacebookClick()}
            className="flex flex-row items-center justify-center gap-4 w-72 h-14 font-semibold text-white bg-[#1877F2] rounded-xl"
          >
            <svg viewBox="0 0 36 36" height="40" width="40" aria-hidden="true">
              <path
                className="fill-white"
                d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"
              ></path>
              <path
                className="fill-[#1877F2]"
                d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
              ></path>
            </svg>
            Continue with Facebook
          </button>
          <button
            type="button"
            onClick={() => handleGithubClick()}
            className="flex flex-row items-center justify-center gap-4 w-72 h-14 font-semibold text-white bg-[#161B22] rounded-xl"
          >
            <svg
              height="40"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="40"
            >
              <path
                className="fill-white"
                d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
              ></path>
            </svg>
            Continue with Github
          </button>
          <button
            type="button"
            onClick={() => handleGoogleClick()}
            className="flex flex-row items-center justify-center gap-4 w-72 h-14 font-semibold text-black bg-white rounded-xl"
          >
            <Image
              width={40}
              height={40}
              src="https://lh3.googleusercontent.com/C_Ty0alIJNrRQz5pNFmgA1rsRnhZDj67eVCCHXoJFFot0FQEZydARPRKbBADyHQoA0_Dj6gLITCshiJq6C-H-QM_U2mJwJZVLOQPnwvCL2RerGMEhw0"
              alt="Google Icon"
              className="rounded-full w-10 h-10"
              aria-hidden="true"
            />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleTwitterClick()}
            className="flex flex-row items-center justify-center gap-4 w-72 h-14 font-semibold text-white bg-[#1D9BF0] rounded-xl"
          >
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              width="40"
              height="40"
              className="fill-white"
            >
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84"></path>
            </svg>
            Continue with Twitter
          </button>
        </div>
        <h2 className="italic text-[0.78rem]">
          By signing up i accept the{' '}
          <Link className="underline underline-offset-1" href={'#'}>
            Terms & Services
          </Link>{' '}
          and the{' '}
          <Link className="underline underline-offset-1" href={'#'}>
            Privacy Policy
          </Link>
        </h2>
      </Dialog>
    </>
  );
};

export default AuthDialog;
