import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import { useRouter } from 'next/router';

//TODO: Change styles from using clsx to using cva
const linkStyles = cva('text-step--2', {
  variants: {
    selected: {
      profile: 'underline underline-offset-1',
      customization: 'underline underline-offset-1',
      account: 'underline underline-offset-1',
    },
  },
});

const NavHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  return (
    <header className="flex flex-row mx-auto md:w-2/4 w-full mt-2 p-1 justify-center gap-4 dark:bg-dark_grey bg-white shadow rounded-md">
      <Link
        href="/settings/profile"
        className={clsx(
          lastSegment == 'profile'
            ? 'text-step--2 underline underline-offset-1 '
            : 'text-step--2'
        )}
      >
        Profile
      </Link>
      <Link
        href="/settings/customization"
        className={clsx(
          lastSegment == 'customization'
            ? 'text-step--2 underline underline-offset-1 '
            : 'text-step--2'
        )}
      >
        Customization
      </Link>
      <Link
        href="/settings/account"
        className={clsx(
          lastSegment == 'account'
            ? 'text-step--2 underline underline-offset-1 '
            : 'text-step--2'
        )}
      >
        Account
      </Link>
    </header>
  );
};

export default NavHeader;
