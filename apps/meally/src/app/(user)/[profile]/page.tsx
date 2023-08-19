import { authOptions } from '@/src/db/next-auth-adapter';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <main>
        <div className="sm:w-full md:w-3/5 m-auto dark:bg-grey dark:shadow-none shadow-main bg-white lg:h-80 rounded-xl mt-4 p-1">
          <Image
            src={session.user.image || '/images/default-profile.png'}
            alt={session.user.name || 'default-profile'}
            width={100}
            height={100}
            priority
            className="rounded-full w-24 h-24 lg:w-48 lg:h-48 m-auto"
          />
          <h1 className="text-step0 text-center">{session.user.name}</h1>
          <h2 className="text-step-1 text-center">{session.user.id}</h2>
        </div>
      </main>
    );
  }
}
