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
      <Navbar />
      <main className="flex flex-col pt-4 items-center">
        <Image
          src={user.photoURL}
          alt={user.displayName}
          width={200}
          height={200}
          className="rounded-full w-48 h-48"
        />
        <h1 className='text-step2'>{user.displayName}</h1>
        <h2 className='text-step-1'>{user.userName}</h2>
        {/* <div className='flex flex-row'>
          <p className='text-step-1'>{user.followerCount || ''}</p>
          <button onClick={() => followUser()}>Follow</button>
        </div> */}
        <span className="w-1/2 h-[0.125rem] my-2 mb-4 dark:bg-white bg-dark_grey rounded-md "></span>
        <h1 className='text-step-1'>Recipes</h1>
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
  console.log('User: ', user);
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
