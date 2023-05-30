import { SearchCard } from '@components/modules/Cards';
import UserService from '@lib/service/UserService';
import { SimplifiedRecipe, User } from 'libs/types';
import { GetServerSideProps } from 'next';
import React from 'react';
import { getCookie } from 'cookies-next';

interface BookmarksProps {
  bookmarks: SimplifiedRecipe[];
}

const Bookmarks = ({ bookmarks }: BookmarksProps) => {
  return (
    <div className="flex flex-col m-auto mt-2 bg-dark_grey md:w-1/2 w-full rounded-md">
      <h1 className="text-center text-step0">Bookmarks</h1>
      <ul className='mt-2'>
        {bookmarks.map((bookmark) => (
          <SearchCard recipe={bookmark} as="li" />
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;

export const getServerSideProps: GetServerSideProps<{
  bookmarks: SimplifiedRecipe[];
}> = async ({ req, res }) => {
  const reqUser = getCookie('user', { req, res });
  const user = reqUser ? JSON.parse(reqUser?.toString()) : undefined;
  const bookmarks = await UserService.getBookmarks(user);

  if (!user) {
    return {
      notFound: true,
    };
  }
  return { props: { bookmarks } };
};
