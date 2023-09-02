import { User } from 'libs/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import UserService from '@lib/service/UserService';
import Image from 'next/image';
import { generateSiteMap } from '@lib/service/Build';

interface ProfilePageProps {
  profile: User;
}

function ProfilePage({ profile }: ProfilePageProps) {
  return (
    <>
      <main>
        <div className="sm:w-full md:w-3/5 m-auto dark:bg-dark_grey dark:shadow-none shadow-main bg-white lg:h-80 rounded-xl mt-4 p-1">
          <Image
            src={profile.photoURL}
            alt={profile.displayName}
            width={100}
            height={100}
            priority
            className="rounded-full w-24 h-24 lg:w-48 lg:h-48 m-auto"
          />
          <h1 className="text-step0 text-center">{profile.displayName}</h1>
          <h2 className="text-step-1 text-center">{profile.userName}</h2>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await UserService.getAllUsers();
  generateSiteMap<User>(users, 'users', 'users');

  const paths = users.map((user) => {
    return { params: { profile: user.userName } };
  });

  return {
    paths,
    fallback: 'blocking', // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const user = JSON.parse(
    JSON.stringify(await UserService.getUserByUserName(context.params.profile))
  );

  if (!user || !Object.keys(user).length) {
    return {
      notFound: true,
    };
  }
  return {
    props: { profile: user },
    revalidate: 60 * 60 * 24,
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const user = await UserService.getUserByUserName(context.params.profile);
//   if (!user) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: { user },
//     revalidate: 60 * 60 * 24,
//   };
// };
