import Custom404 from '@components/layouts/Custom404';
import localStorage from 'libs/utils/localStorage';
import React, { useEffect, useState } from 'react';
import { User, Theme, Font } from 'libs/types';
import { InputField } from 'shared';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import CircleIcon from '@components/elements/CircleIcon';
import useUser from 'src/common/hooks/useUser';
import Button from 'shared/src/components/buttons/Button';
import NavHeader from './NavHeader';
import { useForm } from 'react-hook-form';
import UserService from '@lib/service/UserService';

const Customization = () => {
  const { user, setNewUser } = useUser();
  const { register, control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      theme: user?.preferences?.theme,
      font: user?.preferences?.font,
      diet: user?.preferences?.Diet || '',
      allergens: user?.preferences?.Allergies || '',
      loveCooking: user?.preferences?.loveCooking || '',
      averageTimeToCook: user?.preferences?.AverageCookingTime || '',
    },
  });

  const themes: Theme[] = [Theme.SYSTEM, Theme.DARK, Theme.LIGHT];
  const fonts: Font[] = [
    Font.DEFAULT,
    Font.OPEN_DYSLEXIC,
    Font.MONOSPACE,
    Font.SANS_SERIF,
  ];

  const onSubmit = async (data: any) => {
    const updatedPreferences = Object.assign({}, user, {
      preferences: {
        theme: data.theme,
        font: data.font,
        Diet: data.diet,
        Allergies: data.allergens,
        loveCooking: data.loveCooking,
        AverageCookingTime: data.averageTimeToCook,
      },
    });
    if (user) {
      await UserService.updateUser(updatedPreferences);
      await setNewUser(updatedPreferences);
    }
  };

  if (user) {
    return (
      <>
        <NavHeader />
        <main className='flex justify-center'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1 className="text-step0">Theme</h1>
              <div className="flex flex-auto flex-wrap gap-2">
                {themes.map((theme, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 p-2 h-12 w-28 max-w-xs bg-dark_grey text-white rounded-md"
                  >
                    <input
                      key={theme}
                      type="radio"
                      {...register('theme')}
                      value={theme}
                      defaultChecked={user?.preferences?.theme === theme}
                      onChange={() => {
                        setValue('theme', theme);
                      }}
                      className="w-4 h-4"
                    />
                    <p className="text-step--2">{theme}</p>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-step0">Reading Font</h1>
              <div className="flex flex-auto flex-wrap gap-2">
                {fonts.map((font, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 p-2 h-12 w-46 max-w-xs bg-dark_grey text-white rounded-md"
                  >
                    <input
                      key={font}
                      type="radio"
                      {...register('font')}
                      value={font}
                      defaultChecked={user?.preferences?.font === font}
                      onChange={() => {
                        setValue('font', font);
                      }}
                      className="w-4 h-4"
                    />
                    <p className="text-step--2">{font}</p>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-step0">Cooking</h1>
              {/* <InputField
                label="Diet"
                name="diet"
                id="diet"
                placeholder="Diet"
                defaultValue={user?.preferences?.Diet}
                control={control}
              />
              <InputField
                label="Allergens"
                name="allergens"
                id="allergens"
                placeholder="Allergens"
                defaultValue={user?.preferences?.Allergies}
                control={control}
              />
              <InputField
                label="Love cooking"
                name="loveCooking"
                id="loveCooking"
                placeholder="Love cooking"
                defaultValue={user?.preferences?.loveCooking}
                control={control}
              />
              <InputField
                label="Average time to cook a meal"
                name="averageTimeToCook"
                id="averageTimeToCook"
                placeholder="Average time to cook a meal"
                defaultValue={user?.preferences?.AverageCookingTime}
                control={control}
              /> */}
              <Button type="submit" intent="secondary">
                Save
              </Button>
            </div>
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

export default Customization;
