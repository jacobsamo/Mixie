import type { NextPage } from 'next';
import React from 'react';
import styles from './Signup.module.scss';
import {
  FacebookSignIn,
  GoogleSignIn,
  GithubSignIn,
} from '../../elements/AuthButtons';

const SignupPage: NextPage = () => {
  const handleGithubClick = () => {
    console.log('Github');
  };
  const handleGoogleClick = () => {
    console.log('Google');
  };
  const handleFacebookClick = () => {
    console.log('Facebook');
  };


  //TODO: fix spacing between items
  //TODO: Get rid of an outline on input fields
  //TODO: Make responsive and assemble for dark and light modes
  //TODO: Add functionality to sign in form

  return (
    <>
      <main className='flex justify-center items-center w-full h-full max-h-full'>
        <div className='flex flex-row w-3/4 h-2/4 max-h-99 max-w-5xl'>
          <img src="/images/Recipe.jpg" alt="" className={styles.mainImg}/>
          <div className={` flex flex-col items-center dark:bg-black bg-white ${styles.login}`}>
            <img src="" alt="" />
            <div className='flex flex-col gap-3'>
              <GithubSignIn handleClick={handleGithubClick} />
              <GoogleSignIn handleClick={handleGoogleClick} />
              <FacebookSignIn handleClick={handleFacebookClick} />
            </div>
            <div className="flex flex-row items-center">
              <span className="bg-black dark:bg-white w-32 h-0.5 rounded-sm"></span>
              <h1 className="font-Roboto font-semibold pl-1 pr-1 text-1.5xl">Or</h1>
              <span className="bg-black dark:bg-white w-32 h-0.5 rounded-sm"></span>
            </div>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Username" className={styles.usernameField}/>
              <input type="email" placeholder="Email" className={styles.emailField}/>
              <input type="password" placeholder="Password" className={styles.passwordField}/>
            </div>
            <button className="mt-5 bg-yellow w-32 h-8 rounded-xl opacity-80"><h1 className="text-black text-lg font-Roboto font-semibold opacity-100">Login</h1></button>
          </div>

        </div>
      </main>
    </>
  );
};

export default SignupPage;
