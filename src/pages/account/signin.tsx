import type { NextPage } from 'next';
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import styles from '../../common/styles/modules/Signup.module.scss';
import { auth } from '@lib/config/firebase';
import AuthService from '@lib/service/Authservice'; 



const SignupPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();
  
  

  const handleGithubClick = () => {
    AuthService.signInWithGithub()
  };
  const handleGoogleClick = () => {
    console.log('Google');
    const user = AuthService.signInWithGoogle()
  };
  const handleFacebookClick = () => {
    console.log('Facebook');
    AuthService.signInWithFacebook()
    
  };

  const handleEmailSignup = async () => {
    console.log(`${email} ${password}`);
  };

  //TODO: Add functionality to sign in form

  return (
    <>
      <main
        className={`flex lg:justify-center lg:items-center w-screen h-screen ${styles.Background}`}
      >
        <div className={styles.formContainer}>
          <img src="/images/Recipe.jpg" alt="" className={styles.mainImg} />
          <div
            className={`flex flex-col items-center justify-center dark:bg-black bg-white ${styles.login}`}
          >
            <img src="" alt="" />
            <div className="flex flex-col gap-3">
              <button
                className={`relative w-72 bg-Github h-14 flex flex-row items-center rounded-xl`}
                onClick={handleGithubClick}
              >
                <img
                  src="/images/GithubLogo.svg"
                  alt="Github Logo"
                  className="w-10 h-10 ml-4 text-white"
                />
                <h1 className="text-white ml-3.8 font-semibold font-Roboto text-lg ">
                  Continue with Github
                </h1>
              </button>
              <button
                className="relative w-72 h-14 bg-white flex flex-row items-center rounded-xl"
                onClick={handleGoogleClick}
              >
                <img
                  src="/images/GoogleLogo.svg"
                  alt="Google Logo"
                  className=" w-10 h-10 ml-4"
                />
                <h1 className="text-black  ml-3.8 font-semibold font-Roboto">
                  Continue with Google
                </h1>
              </button>
              <button
                className="relative w-72 h-14 bg-Facebook flex flex-row items-center rounded-xl"
                onClick={handleFacebookClick}
              >
                <img
                  src="/images/FacebookLogo.svg"
                  alt="Facebook Logo"
                  className="w-10 h-10 ml-4 text-white"
                />
                <h1 className="text-black   ml-3.8 font-semibold font-Roboto">
                  Continue with Facebook
                </h1>
              </button>
            </div>

            <div className="flex flex-row items-center">
              <span className="bg-black dark:bg-white w-32 h-0.5 rounded-sm"></span>
              <h1 className="font-Roboto font-semibold pl-1 pr-1 text-1.5xl">
                Or
              </h1>
              <span className="bg-black dark:bg-white w-32 h-0.5 rounded-sm"></span>
            </div>
            <div className="flex flex-col gap-3">
              <p className="bg-grey bg-opacity-60 text-opacity-100 text-black text-sm">
                Not recommended, less safe
              </p>
              <input
                type="email"
                placeholder="Email"
                className={styles.emailField}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.passwordField}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              onClick={handleEmailSignup}
              className="mt-5 bg-yellow w-32 h-8 rounded-xl opacity-80"
            >
              <h1 className="text-black text-lg font-Roboto font-semibold opacity-100">
                Sign In
              </h1>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
