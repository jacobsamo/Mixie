import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import { BookmarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AuthService from '@lib/service/Authservice';
import { auth } from '@lib/config/firebase';
import RecipeSEO from '@components/seo/RecipeSEO';
import type { UserCredential } from 'firebase/auth';
import Algolia_Search_Dialog from '@components/elements/algolia_search_dialog';
import Link from 'next/link';

const Navbar = () => {
  const [userImage, setUserImage] = useState('/favicon.ico'); //TODO: change this to a proper thing or a sign in form

  //TODO: fix issue with image flickering when reloading or navigating to a different route
  auth.onAuthStateChanged((user) => {
    if (auth.currentUser != null) {
      setUserImage(auth.currentUser.photoURL!);
    }
  });

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" >
          <a className={styles.branding}>
            <img src="favicon.ico" alt="Logo" className={styles.logo} />
            <h1>Recipe</h1>
          </a>
        </Link>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link data-testid="link" href="/recipes">Recipes</Link>
          </li>
          <li className={styles.link}>
            <Link data-testid="link" href="#">Dinners</Link>
          </li>
          <li className={styles.link}>
            <Link data-testid="link" href="#">Breakfasts</Link>
          </li>
          <li className={styles.link}>
            <Link data-testid="link" href="#">More options</Link>
          </li>
        </ul>
        <div className={styles.user}>
          <Algolia_Search_Dialog buttonType="searchIcon" />
          <div className='comingSoon w-24 h-24'>
            Coming soon
            {/* <button>
              <BookmarkIcon className="h-8 w-8x" />
            </button>
            <button>
              <Image
                src={userImage}
                alt="Profile Picture"
                width={48}
                height={48}
                className="rounded-full relative"
                priority
              />{' '}
            </button> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
