'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '@styles/modules/Navbar.module.scss';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import AlgoliaDialog from '@components/elements/algolia_search/AlgoliaDialog';
import Link from 'next/link';
import { auth } from '@lib/config/firebase';
import UserProfile from '@components/elements/UserProfile';
import SignInDialog from '@components/elements/SignInDialog';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBookmarkClick = () => {
    if (!auth.currentUser) {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <nav className={`${isOpen ? styles.show_nav : ''} ${styles.nav}`}>
        <Link href="/" className={styles.branding}>
          <Image
            width={42}
            height={42}
            src="/favicon.ico"
            alt="Logo"
            className={styles.brand_logo}
          />
          <h1 className={styles.brand_name}>Meally</h1>
        </Link>
        <div className={styles.nav_links}>
          <Link
            href="/recipes"
            className={styles.nav_link}
            onClick={() => setIsOpen(false)}
          >
            Recipes
          </Link>
          <Link
            href="/sweet"
            className={styles.nav_link}
            onClick={() => setIsOpen(false)}
          >
            Sweet
          </Link>
          <Link
            href="/savoury"
            className={styles.nav_link}
            onClick={() => setIsOpen(false)}
          >
            Savoury
          </Link>
          {/*TODO: Un comment this once it exists */}
          {/* <Link
            href="/categories"
            className={styles.nav_link}
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link> */}
        </div>
        <div className={styles.utility}>
          <AlgoliaDialog buttonType="searchIcon" />
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={styles.hamburger_bar}></span>
            <span className={styles.hamburger_bar}></span>
            <span className={styles.hamburger_bar}></span>
          </button>
          <button onClick={() => handleBookmarkClick()}>
            <BookmarkIcon className="h-8 w-8x" />
            <SignInDialog open={dialogOpen} setOpen={setDialogOpen} />
          </button>
          <UserProfile />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
