import React from 'react'
import type { NextPage } from 'next'
import styles from './Navbar.module.scss'

const Navbar: NextPage = () => {
  return (
    <>
        <nav className={styles.nav}>
            <div className={styles.branding}>
                <img src="https://unsplash.com/photos/x60YFtdOsGU" alt="Logo" />
                <h1>Recipe</h1>
            </div>
            <ul className={styles.links}>
                <li>Recipes</li>
                <li>About</li>
            </ul>
            <div className={styles.personal}>
                <button>Add your own</button>
                <span>Profile</span>
            </div>
        </nav>
    </>
  )
}

export default Navbar