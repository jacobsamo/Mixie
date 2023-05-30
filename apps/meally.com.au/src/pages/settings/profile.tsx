import Custom404 from '@components/layouts/Custom404';
import UserService from '@lib/service/UserService';
import React from 'react';
import { InputField } from 'shared';
import Image from 'next/image';
import Button from 'shared/src/components/buttons/Button';
import useUser from 'src/common/hooks/useUser';
import NavHeader from './NavHeader';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const { user, setNewUser } = useUser();
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      name: user?.displayName,
      userName: user?.userName,
      bio: user?.bio,
      Twitter: user?.socials?.Twitter,
      Instagram: user?.socials?.Instagram,
      Facebook: user?.socials?.Facebook,
      Website: user?.socials?.Website,
    },
  });
  const onSubmit = async (data: any) => {
    const updatedUser = Object.assign({}, user, {
      displayName: data.name,
      userName: data.userName,
      bio: data.bio,
      socials: {
        Twitter: data.Twitter,
        Instagram: data.Instagram,
        Facebook: data.Facebook,
        Website: data.Website,
      },
    });
    if (user) {
      await UserService.updateUser(updatedUser);
      await setNewUser(updatedUser);
    }
  };

  if (user) {
    return (
      <>
        <NavHeader />
        <main className="flex flex-row mx-auto md:w-2/4 w-full mt-2 md:p-4 justify-center gap-4 dark:bg-dark_grey  bg-white shadow-main rounded-md">
          <form
            className="flex flex-col items-start p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row items-center gap-2">
              <Image
                src={user.photoURL}
                alt={user.displayName || 'Profile picture'}
                width={100}
                height={100}
                priority
                className="rounded-full w-24 h-24 lg:w-48 lg:h-48 m-auto"
              />
              <div className="flex flex-col gap-2">
                <InputField
                  id="displayName"
                  name="name"
                  label="Name"
                  control={control}
                  defaultValue={user.displayName}
                />
                <InputField
                  id="userName"
                  name="userName"
                  label="User Name"
                  control={control}
                  defaultValue={user.userName}
                />
              </div>
            </div>
            <textarea
              id="bio"
              defaultValue={user.bio}
              {...register('bio', { maxLength: 150 })}
              rows={
                /\n/.test(user.bio?.toString() || '')
                  ? Number(user.bio?.match(/\n/g)?.length) + 1
                  : 3
              }
              placeholder="Bio (optional)"
              className="resize-none w-full max-w-sm mt-2 p-2 rounded-md dark:outline dark:outline-grey dark:outline-2 dark:bg-dark_grey dark:shadow-none bg-white shadow-main"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-step--1">Profile Social</h1>
              <InputField
                id="twitter"
                name="Twitter"
                label="Twitter"
                control={control}
                defaultValue={user.socials?.Twitter}
              />
              <InputField
                id="instagram"
                name="Instagram"
                label="Instagram"
                control={control}
                defaultValue={user.socials?.Instagram}
              />
              <InputField
                id="facebook"
                name="Facebook"
                label="Facebook"
                control={control}
                defaultValue={user.socials?.Facebook}
              />
              <InputField
                id="website"
                name="Website"
                label="Website"
                control={control}
                defaultValue={user.socials?.Website}
              />
            </div>
            <Button
              intent="secondary"
              size="md"
              aria-label="Save profile changes"
              type="submit"
              className="m-auto mt-12"
            >
              Save
            </Button>
          </form>
        </main>
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
