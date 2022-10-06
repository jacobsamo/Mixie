import type { NextPage } from 'next';
import React from 'react';
import styles from './Signup.module.scss';
import {FacebookSignIn, GoogleSignIn, GithubSignIn} from '../../elements/AuthButtons';


const SignupPage: NextPage = () => {

  const handleGithubClick = () => {
    return console.log('Github');
  }
  const handleGoogleClick = () => {
    return console.log('Google');
  }
  const handleFacebookClick = () => {
    return console.log('Facebook');
  }



  return (
    <>
      <main>
        <div className='flex justify-between items-center'>
            <img src="" alt="" />
            <div>
              <GithubSignIn handleClick={handleGithubClick}/>
              <GoogleSignIn handleClick={handleGoogleClick}/>
              <FacebookSignIn handleClick={handleFacebookClick}/>
            </div>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
