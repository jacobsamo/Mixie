import Custom404 from '@components/layouts/Custom404';
import React from 'react';
import { Theme, Font, Diet, Allergies } from 'libs/types';
import useUser from 'src/common/hooks/useUser';
import Button from 'shared/src/components/buttons/Button';
import NavHeader from './NavHeader';
import { useForm } from 'react-hook-form';
import UserService from '@lib/service/UserService';
import { cva } from 'class-variance-authority';

const Customization = () => {
  const { user, setNewUser } = useUser();
  const { register, control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      theme: user?.preferences?.theme,
      font: user?.preferences?.font,
      diet: user?.preferences?.Diet || [],
      allergens: user?.preferences?.Allergies || [],
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

  const allergies: Allergies[] = [
    Allergies.DAIRY_FREE,
    Allergies.GLUTEN_FREE,
    Allergies.NUT_FREE,
  ];

  const diet: Diet[] = [
    Diet.GLUTEN_FREE,
    Diet.KETO,
    Diet.PALEO,
    Diet.VEGAN,
    Diet.VEGETARIAN,
    Diet.OTHER,
  ];

  const styles = cva(
    'flex items-center gap-2 p-2 max-w-xs dark:outline dark:outline-grey dark:outline-2 dark:bg-dark_grey dark:text-white dark:shadow-none shadow-main bg-white text-black rounded-md',
    {
      variants: {
        size: {
          sm: 'text-sm',
          md: 'h-12 w-28 ',
          lg: 'h-12 w-46',
        },
      },
      defaultVariants: {
        size: 'md',
      },
    }
  );

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
      try {
        await UserService.updateUser(updatedPreferences);
        await setNewUser(updatedPreferences);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCheckboxChange = (event: any, name: any) => {
    const diet = event.target.value;
    const values = getValues(name);

    // If the checkbox is checked, add the item to the list.
    if (event.target.checked) {
      values.push(diet);
    } else {
      // If the checkbox is unchecked, remove the item from the list.
      const index = values.indexOf(diet);
      if (index > -1) {
        values.splice(index, 1);
      }
    }

    setValue(name, values);
  };

  if (user) {
    return (
      <>
        <NavHeader />
        <main className="flex flex-row mx-auto md:w-2/4 w-full mt-2 p-4 justify-center dark:bg-dark_grey  bg-white shadow-main rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2 className="text-step0 my-2">Theme</h2>
              <div className="flex flex-auto flex-wrap gap-2">
                {themes.map((theme, index) => (
                  <label key={index} className={styles({ size: 'md' })}>
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
              <h2 className="text-step0 my-2">Reading Font</h2>
              <div className="flex flex-auto flex-wrap gap-2">
                {fonts.map((font, index) => (
                  <label key={index} className={styles({ size: 'lg' })}>
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
              <h2 className="text-step0 my-2">Diet</h2>
              <div className="flex flex-auto flex-wrap gap-2">
                {diet.map((diet, index) => (
                  <label key={index} className={styles({ size: 'lg' })}>
                    <input
                      key={diet}
                      type="checkbox"
                      {...register('diet')}
                      value={diet}
                      defaultChecked={user?.preferences?.Diet?.includes(diet)}
                      onChange={(event) => {
                        handleCheckboxChange(event, 'diet');
                      }}
                      className="w-4 h-4"
                    />
                    <p className="text-step--2">{diet}</p>
                  </label>
                ))}
              </div>
              {/*TODO: Create a component that can handle tags do this once recipe page tags have been handled */}
              <h2 className="text-step0 my-2">Allergies</h2>
              <div className="flex flex-auto flex-wrap gap-2">
                {allergies.map((allergies, index) => (
                  <label key={index} className={styles({ size: 'lg' })}>
                    <input
                      key={allergies}
                      type="checkbox"
                      {...register('allergens')}
                      value={allergies}
                      defaultChecked={user?.preferences?.Allergies?.includes(
                        allergies
                      )}
                      onChange={(event) => {
                        handleCheckboxChange(event, 'allergens');
                      }}
                      className="w-4 h-4"
                    />
                    <p className="text-step--2">{allergies}</p>
                  </label>
                ))}
              </div>
            </div>
            <Button type="submit" intent="secondary" className="m-auto mt-12">
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

export default Customization;
