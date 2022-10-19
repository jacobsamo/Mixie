import type { NextPage } from 'next';
import React from 'react';
import styles from './styles/Navbar.module.scss';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const Navbar: NextPage = () => {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.branding}>
          <img src="favicon.ico" alt="Logo" className={styles.logo} />
          <h1>Recipe</h1>
        </div>
        <ul className={styles.links}>
          <li className={styles.link}>
            <a href="#">Recipes</a>
          </li>
          <li className={styles.link}>
            <a href="#">Dinners</a>
          </li>
          <li className={styles.link}>
            <a href="#">Breakfasts</a>
          </li>
          <li className={styles.link}>
            <a href="#">Quick & easy</a>
          </li>
        </ul>
        <div className={styles.user}>
          <button>
            <BookmarkIcon className="h-8 w-8" />
          </button>
          <button>
            <img src="favicon.ico" alt="" className="rounded-full" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
