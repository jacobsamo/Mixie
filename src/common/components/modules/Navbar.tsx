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
  const [isOpen, setIsOpen] = useState(false);

  //TODO: fix issue with image flickering when reloading or navigating to a different route
  // auth.onAuthStateChanged((user) => {
  //   if (auth.currentUser != null) {
  //     setUserImage(auth.currentUser.photoURL!);
  //   }
  // });



  return (
    <>
      <nav className={`${isOpen ? styles.show_nav : ''} ${styles.nav}`}>
        <Link href="/">
          <a className={styles.branding}>
            <Image
              width={42}
              height={42}
              src="/favicon.ico"
              alt="Logo"
              className={styles.brand_logo}
            />
            <h1 className={styles.brand_name}>Meally</h1>
          </a>
        </Link>
        <div
          className={styles.nav_links}
        >
          <Link href="/recipes">
            <a className={styles.nav_link} onClick={() => setIsOpen(false)}>
              Recipes
            </a>
          </Link>
          <Link href="/sweet">
            <a className={styles.nav_link} onClick={() => setIsOpen(false)}>
              Sweet
            </a>
          </Link>
          <Link href="/savoury">
            <a className={styles.nav_link} onClick={() => setIsOpen(false)}>
              Savoury
            </a>
          </Link>
          <Link href="/categories">
            <a className={styles.nav_link} onClick={() => setIsOpen(false)}>
              Categories
            </a>
          </Link>
        </div>
        <div className={styles.utility}>
          <Algolia_Search_Dialog buttonType="searchIcon" />
          <button 
            type='button'
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={styles.hamburger_bar}></span>
            <span className={styles.hamburger_bar}></span>
            <span className={styles.hamburger_bar}></span>
          </button>
          <div className={styles.comingSoon}>
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
