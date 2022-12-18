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
  auth.onAuthStateChanged((user) => {
    if (auth.currentUser != null) {
      setUserImage(auth.currentUser.photoURL!);
    }
  });

  return (
    <>
      <nav className={styles.nav}>
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
        <div className="container">
          <Link href="/recipes">
            <a>Recipes</a>
          </Link>
          <Link href="/#">
            <a>Sweet</a>
          </Link>
          <Link href="/#">
            <a>Savoury</a>
          </Link>
          <Link href="/#">
            <a>Categories</a>
          </Link>
          <Link href="/#">
            <a>:</a>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <ul className={`nav-links ${isOpen ? 'show-nav' : ''}`}>
          <Link href="/about">
            <a onClick={() => setIsOpen(false)}>Recipes</a>
          </Link>
          <Link href="/#">
            <a onClick={() => setIsOpen(false)}>Sweet</a>
          </Link>
          <Link href="/#">
            <a onClick={() => setIsOpen(false)}>Savoury</a>
          </Link>
          <Link href="/contact">
            <a onClick={() => setIsOpen(false)}>Categories</a>
          </Link>
        </ul>
        <div className={styles.user}>
          <Algolia_Search_Dialog buttonType="searchIcon" />
          <div className="comingSoon w-24 h-14">
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
