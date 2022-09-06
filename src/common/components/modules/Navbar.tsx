import React from 'react'
import type { NextPage } from 'next'
import styles from './Navbar.module.scss'
import { BookmarkIcon } from '@heroicons/react/24/outline'

const Navbar: NextPage = () => {
  return (
    <>
        <nav className={styles.nav}>
            <div className={styles.branding}>
                <img src="favicon.ico" alt="Logo" className={styles.logo} />
                <h1>Recipe</h1>
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>Recipes</li>
                <li className={styles.link}>Dinner</li>
                <li className={styles.link}>Breakfast</li>
                <li className={styles.link}>Quick & easy</li>
            </ul>
            <div className={styles.user}>
                <button><BookmarkIcon className="h-8 w-8"/></button>
                <img src="favicon.ico" alt="" className="rounded-full" />
            </div>
        </nav>
    </>
  )
}

export default Navbar