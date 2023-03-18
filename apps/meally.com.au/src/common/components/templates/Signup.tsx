import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from 'Signup.module.scss';
import { auth } from '@lib/config/firebase';
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const SignupPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loggedInUser) {
      router.push('/');
    }
  }, [loggedInUser]);

  const handleGithubClick = () => {
    console.log('Github');
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setLoggedInUser(true);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleGoogleClick = () => {
    console.log('Google');
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user != null) setLoggedInUser(true);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleFacebookClick = () => {
    console.log('Facebook');
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        if (user != null) setLoggedInUser(true);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const handleEmailSignup = async () => {
    console.log(`${email} ${password}`);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main
        className={`flex lg:justify-center lg:items-center w-screen h-screen ${styles.Background}`}
      >
        <div className={styles.formContainer}>
          <Image
            fill
            src="/images/Recipe.jpg"
            alt=""
            className={styles.mainImage}
          />
          <div
            className={`flex flex-col items-center justify-center dark:bg-black bg-white ${styles.login}`}
          >
            <Image fill src="" alt="" />
            <div className="flex flex-col gap-3">
              <button
                className={`relative w-72 bg-Github h-14 flex flex-row items-center rounded-xl`}
                onClick={handleGithubClick}
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
              <button
                className="relative w-72 h-14 bg-white flex flex-row items-center rounded-xl"
                onClick={handleGoogleClick}
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
              <button
                className="relative w-72 h-14 bg-Facebook flex flex-row items-center rounded-xl"
                onClick={handleFacebookClick}
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
            </div>

            <div className="flex flex-row items-center">
              <span className="bg-black dark:bg-white w-32 h-0.5 rounded-sm"></span>
              <h1 className="font-Roboto font-semibold pl-1 pr-1 text-1.5xl">
                Or
              </h1>
              <span className="bg-black dark:bg-white w-32 h-0.5 rounded-sm"></span>
            </div>
            <div className="flex flex-col gap-3">
              <p className="bg-grey bg-opacity-60 text-opacity-100 text-black text-step--2">
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
              <h1 className="text-black text-step0 font-Roboto font-semibold opacity-100">
                Signup
              </h1>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
