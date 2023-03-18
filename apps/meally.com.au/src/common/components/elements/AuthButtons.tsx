import React from 'react';
import Image from 'next/image';
import styles from './AuthButton.module.scss';

const GoogleSignIn = (handleClick: any) => {
  return (
    <>
      <button
        className="relative w-72 h-14 bg-white flex flex-row items-center rounded-xl"
        onClick={handleClick}
      >
        <Image
          fill
          src="/images/GoogleLogo.svg"
          alt="Google Logo"
          className=" w-10 h-10 ml-4"
        />
        <h1 className="text-black  ml-3.8 font-semibold font-Roboto">
          Continue with Google
        </h1>
      </button>
    </>
  );
};

const GithubSignIn = (handleClick: any) => {
  return (
    <>
      <button
        className={`relative w-72 bg-Github h-14 flex flex-row items-center rounded-xl`}
        onClick={handleClick}
      >
        <Image
          fill
          src="/images/GithubLogo.svg"
          alt="Github Logo"
          className="w-10 h-10 ml-4 text-white"
        />
        <h1 className="text-white ml-3.8 font-semibold font-Roboto text-step0 ">
          Continue with Github
        </h1>
      </button>
    </>
  );
};

const FacebookSignIn = (handleClick: any) => {
  return (
    <>
      <button
        className="relative w-72 h-14 bg-Facebook flex flex-row items-center rounded-xl"
        onClick={handleClick}
      >
        <Image
          fill
          src="/images/FacebookLogo.svg"
          alt="Facebook Logo"
          className="w-10 h-10 ml-4 text-white"
        />
        <h1 className="text-black   ml-3.8 font-semibold font-Roboto">
          Continue with Facebook
        </h1>
      </button>
    </>
  );
};

export { GoogleSignIn, GithubSignIn, FacebookSignIn };
