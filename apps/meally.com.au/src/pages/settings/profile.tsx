import Custom404 from '@components/layouts/Custom404';
import localStorage from 'libs/utils/localStorage';
import React, { useEffect, useState } from 'react';
import { InputField } from 'shared';
import Image from 'next/image';
import { User } from 'libs/types';
import Button from 'shared/src/components/buttons/Button';
import useUser from 'src/common/hooks/useUser';
import NavHeader from './NavHeader';

const Profile = () => {
  const user = useUser();

  if (user) {
    return (
      <>
        <NavHeader />
        <form className="flex flex-col items-start p-2">
          <div className="flex flex-row items-center">
            <Image
              src={user.photoURL}
              alt={user.displayName}
              width={100}
              height={100}
              className="rounded-full w-24 h-24 lg:w-48 lg:h-48 m-auto"
            />
            <div className="flex flex-col gap-2">
              <InputField
                label="Name"
                inputId="Name"
                name="Name"
                aria-label="Your name"
                value={user.displayName}
              />
              <InputField
                label="Username"
                inputId="Username"
                name="Username"
                aria-label="Your Username"
                value={user.userName}
              />
            </div>
          </div>
          <textarea
            name="bio"
            id="bio"
            aria-label="Bio (optional)"
            // onChange={internalChange}
            value={user.bio || ''}
            rows={
              /\n/.test(user.bio?.toString() || '')
                ? Number(user.bio?.match(/\n/g)?.length) + 1
                : 3
            }
            maxLength={150}
            placeholder="Bio (optional)"
            className="resize-none w-full max-w-sm mt-2 p-2 rounded-md dark:bg-dark_grey dark:shadow-none bg-white shadow"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-step--1">Profile Social</h1>
            <InputField
              label="Twitter handle"
              placeholder="Twitter handle"
              inputId="twitter"
              name="twitter"
              aria-label="Your Twitter handle"
              value={user.socials?.Twitter || ''}
            />
            <InputField
              label="Instagram handle"
              placeholder="Instagram handle"
              inputId="instagram"
              name="instagram"
              aria-label="Your Instagram handle"
              value={user.socials?.Instagram || ''}
            />
            <InputField
              label="Facebook handle"
              placeholder="Facebook handle"
              inputId="facebook"
              name="facebook"
              aria-label="Your Facebook handle"
              value={user.socials?.Facebook || ''}
            />
            <InputField
              label="Your Website"
              placeholder="Your Website"
              inputId="website"
              name="website"
              aria-label="Your Website Url"
              value={user.socials?.Website || ''}
            />
          </div>
          <Button
            onClick={() => console.log('hello world')}
            intent="secondary"
            size="md"
            aria-label="Save profile changes"
            type="submit"
            className="m-auto"
          >
            Save
          </Button>
        </form>
      </>
    );
  }

  return (
    <Custom404>
      You are not logged in please click the sign up button in the top right
      hand corner.
    </Custom404>
  );
};

export default Profile;
