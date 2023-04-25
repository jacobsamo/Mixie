import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import { useRouter } from 'next/router';


const linkStyles = cva('text-step--2', {
  variants: {
    selected: {
      true: 'underline underline-offset-1',
      false: '',
    },
  },
});

const NavHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  return (
    <header className="flex flex-row mx-auto md:w-2/4 w-full mt-2 p-1 justify-center gap-4 dark:bg-dark_grey bg-white shadow-main rounded-md">
      <Link
        href="/settings/profile"
        className={linkStyles({ selected: lastSegment === 'profile' })}
      >
        Profile
      </Link>
      <Link
        href="/settings/customization"
        className={linkStyles({ selected: lastSegment === 'customization' })}
      >
        Customization
      </Link>
      <Link
        href="/settings/account"
        className={linkStyles({ selected: lastSegment === 'account' })}
      >
        Account
      </Link>
    </header>
  );
};

export default NavHeader;
