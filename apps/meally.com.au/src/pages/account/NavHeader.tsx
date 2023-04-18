import React, { useState } from 'react';
import Link from 'next/link';
import cva from 'clsx';
import { useRouter } from 'next/router';

const linkStyles = cva(
    'text-step--1',
    {
        variants: {
            profile: {
                true: 'underline underline-offset-1',
            },
            customization: {
                true: 'underline underline-offset-1',
            },
            account: {
                true: 'underline underline-offset-1',
            },
        },
        defaultVariants: {
            profile: true,
            customization: false,
            account: false,
        },
    }
);

const NavHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  return (
    <header>
      <Link href="/account/profile" className=''>Profile</Link>
      <Link href="/account/customization">Customization</Link>
      <Link href="/account/account">Recipes</Link>
    </header>
  );
};

export default NavHeader;
