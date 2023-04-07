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

interface ProfilePageProps {
  user: User;
}

function ProfilePage({ user }: ProfilePageProps) {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Profile Page</h1>
        <p>{user.userName}</p>
      </div>
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
  if (!user || !Object.keys(user).length) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user },
    revalidate: 60 * 60 * 24,
  };
}
