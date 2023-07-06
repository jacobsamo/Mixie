'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@components/ui/button';
import Link from 'next/link';
import {getServerSession} from 'next-auth/next'
import { useSession } from 'next-auth/react';
import {Popover, PopoverContent, PopoverTrigger} from '@components/ui/popover'

const UserProfile = () => {
  const session = useSession();


  if (session.data?.user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Image
            width={42}
            height={42}
            src={session.data.user.image || 'https://unsplash.com/photos/K4mSJ7kc0As'}
            alt="user profile picture"
            className="rounded-full w-10 h-10 cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent className='flex flex-row'>
          <Link href={'/profile'}>
          Profile</Link>
          <Link href={'/bookmarks'}>Bookmarks</Link>
          <Link href={'/settings'}>Settings</Link>
          <Link href={'/api/auth/signout'}>Signout</Link>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Link
      href={'/api/auth/signin'}
      className="px-2 p-1 bg-yellow rounded-md text-black font-semibold"
    >
      Sign up
    </Link>
  );
};

export default UserProfile;
