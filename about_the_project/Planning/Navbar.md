# Creating a navbar
creating a responsive navbar in Nextjs / React is a bit tricky. You can use the [react-bootstrap](https://react-bootstrap.github.io/components/navbar/) library to create a navbar. But it is not responsive. So, I have created a custom navbar component which is responsive and can be used in any Nextjs / React project.

## Navbar component

```jsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <nav className={styles.nav}>
            <button className={styles.hamburger}>
                <span className={styles.hamburger_bar}/>
                <span className={styles.hamburger_bar}/>
                <span className={styles.hamburger_bar}/>
            </button>
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
            <div className={`${styles.nav-links} ${isOpen ? styles.show_nav : ''}`}>
                <Link href="/">
                    <a
                        className={styles.nav_link}
                        onClick={() => setIsOpen(false)}
                    >
                        Recipes
                    </a>
                </Link>
                <Link href="/sweet">
                    <a
                        className={styles.nav_link}
                        onClick={() => setIsOpen(false)}
                    >
                        Sweet
                    </a>
                </Link>
                <Link href="/savoury">
                    <a
                        className={styles.nav_link}
                        onClick={() => setIsOpen(false)}
                    >
                        Savoury
                    </a>
                </Link>
                <Link href="/categories">
                    <a
                        className={styles.nav_link}
                        onClick={() => setIsOpen(false)}
                    >
                        Categories
                    </a>
                </Link>
            </div>
            <div className={styles.user}>
                <Algolia_Search_Dialog buttonType="searchIcon" />
                <div className="comingSoon w-24 h-14">
            </div>
    )
}
```
