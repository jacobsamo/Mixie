// pages/[...slug].tsx

import { useRouter } from 'next/router';
import { User } from 'libs/types';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import UserService from '@lib/service/UserService';
import Navbar from '@components/modules/Navbar';
import Image from 'next/image';

interface ProfilePageProps {
  user: User;
}

function ProfilePage({ user }: ProfilePageProps) {
  return (
    <>
      <main>
        <div className="sm:w-full md:w-3/5 m-auto dark:bg-dark_grey dark:shadow-none shadow-main bg-white lg:h-80 rounded-xl mt-4 p-1">
          <Image
            src={user.photoURL}
            alt={user.displayName}
            width={100}
            height={100}
            className="rounded-full w-24 h-24 lg:w-48 lg:h-48 m-auto"
          />
          <h1 className="text-step0 text-center">{user.displayName}</h1>
          <h2 className="text-step-1 text-center">{user.userName}</h2>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;

export async function getStaticPaths() {
  const users = await UserService.getAllUsers();

  const paths = users.map((user) => {
    return { params: { profile: user.userName } };
  });

  return {
    paths,
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps(context: any) {
  const user = await UserService.getUserByUserName(context.params.profile);
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user },
    revalidate: 60 * 60 * 24,
  };
}
