'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@components/ui/button';

const UserProfile = () => {
  const [user, setUser] = useState(false);

  if (user) {
    return (
      <Image
        width={42}
        height={42}
        src={'https://unsplash.com/photos/K4mSJ7kc0As'}
        alt="user profile picture"
        className="rounded-full w-10 h-10"
      />
    );
  }

  return (
    <Button
      onClick={() => console.log('Sign up')}
      variant={'primary'}
      className="px-2 p-1 bg-yellow rounded-md text-black font-semibold"
    >
      Sign up
    </Button>
  );
};

export default UserProfile;
