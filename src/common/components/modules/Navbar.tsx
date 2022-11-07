import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import AuthService from '@lib/service/Authservice';
import { auth } from '@lib/config/firebase';
import RecipeSEO from '@components/seo/RecipeSEO';
import type { UserCredential } from 'firebase/auth'

const Navbar = () => {
  const [userImage, setUserImage] = useState('/favicon.ico'); //TODO: change this to a proper thing or a sign in form


  //TODO: fix issue with image flickering when reloading or navigating to a different route
  auth.onAuthStateChanged((user) => {
    if (auth.currentUser != null) {
      setUserImage(auth.currentUser.photoURL!)
    }
  })

  
  return (
    <>
      <nav className={styles.nav}>
        <a href="/" className={styles.branding}>
          <img src="favicon.ico" alt="Logo" className={styles.logo} />
          <h1>Recipe</h1>
        </a>
        <ul className={styles.links}>
          <li className={styles.link}>
            <a href="/recipes">Recipes</a>
          </li>
          <li className={styles.link}>
            <a href="#">Dinners</a>
          </li>
          <li className={styles.link}>
            <a href="#">Breakfasts</a>
          </li>
          <li className={styles.link}>
            <a href="#">More options</a>
          </li>
        </ul>
        <div className={styles.user}>
          <button>
            <BookmarkIcon className="h-8 w-8" />
          </button>
          <button>
            <Image
              src={userImage}
              alt="Profile Picture"
              width={48}
              height={48}
              className="rounded-full relative"
              priority
            /> {/*TODO: change this to open up the sign in / sign up dialog if user isn't logged in */}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
