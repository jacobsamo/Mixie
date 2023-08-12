'use client';
import React from 'react';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { usePathname } from 'next/navigation';

const linkStyles = cva('text-step--2', {
  variants: {
    selected: {
      true: 'underline underline-offset-1',
      false: '',
    },
  },
});

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  const firstSegment = pathname.split('/')[1];
  console.log('pathNAme: ', pathname);
  console.log('lastSegment: ', lastSegment);
  console.log('firstSegment: ', firstSegment);

  return (
    <main>
      <header className="flex flex-row mx-auto md:w-2/4 w-full mt-2 p-1 justify-center gap-4 dark:bg-grey bg-white shadow-main rounded-md">
        <Link
          href={`/${firstSegment}/settings/profile`}
          className={linkStyles({ selected: lastSegment === 'profile' })}
        >
          Profile
        </Link>
        <Link
          href={`/${firstSegment}/settings/customization`}
          className={linkStyles({
            selected: lastSegment === 'customization',
          })}
        >
          Customization
        </Link>
        <Link
          href={`/${firstSegment}/settings/account`}
          className={linkStyles({ selected: lastSegment === 'account' })}
        >
          Account
        </Link>
      </header>
      {children}
    </main>
  );
}
