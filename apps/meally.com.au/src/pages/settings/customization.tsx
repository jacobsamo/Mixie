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

const Customization = () => {
  const user = useUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted: ', e.currentTarget);
    console.log('submit');
  };

  if (user) {
    return (
      <>
        <NavHeader />
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Site Theme</h1>
            <button>System</button>
            <button>Dark</button>
            <button>Light</button>
          </div>
          <div>
            <h1>Reading Font</h1>
            <button>Default</button>
            <button>open dyslexic</button>
            <button>monospace</button>
            <button>sans serif</button>
          </div>
          <div>
            <h1>Cooking</h1>
            <InputField
              label="Diet"
              name="diet"
              inputId="diet"
              placeholder="Diet"
              value={user.preferences?.Diet || ''}
              // onChange={handleChange}
            />
            <InputField
              label="Allergens"
              name="allergens"
              inputId="allergens"
              placeholder="Allergens"
              value={user.preferences?.Allergies || ''}
              // onChange={handleChange}
            />
            <InputField
              label="Love cooking"
              name="loveCooking"
              inputId="loveCooking"
              placeholder="Love cooking"
              value={user.preferences?.loveCooking || ''}
              // onChange={handleChange}
            />
            <InputField
              label="Average time to cook a meal"
              name="averageTimeToCook"
              inputId="averageTimeToCook"
              placeholder="Average time to cook a meal"
              value={user.preferences?.AverageCookingTime || ''}
              // onChange={handleChange}
            />
            <Button type="submit" intent="secondary">
              Save
            </Button>
          </div>
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

export default Customization;
