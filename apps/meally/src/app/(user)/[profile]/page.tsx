import { authOptions } from '@/src/db/next-auth-adapter';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div>
        <Link href={`/${session.user.id}/drafts`}>Go to your drafts</Link>
      </div>
    );
  }
}
