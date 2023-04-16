import Custom404 from '@components/layouts/Custom404';
import localStorage from 'libs/utils/localStorage';
import React, { useEffect, useState } from 'react';
import { InputField } from 'shared';
import Image from 'next/image';
import { User } from 'libs/types';

const Customization = () => {
  const [user, setUser] = useState<undefined | User>(undefined);

  const getUser = async () => {
    const user = await localStorage.readLocal('user');
    return user;
  };

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);
  if (user) {
    return (
      <>
        <form>
          <div>
            <h1>Site Theme</h1>
            <input type="radio">System</input>
            <input type="radio">Dark</input>
            <input type="radio">Light</input>
          </div>
          <div>
            <h1>Reading Font</h1>
            <input type="radio">Default</input>
            <input type="radio">open dyslexic</input>
            <input type="radio">monospace</input>
            <input type="radio">sans serif</input>
          </div>
          <div>
            <h1>Cooking</h1>
            <InputField
              label='Diet'
              name='diet'
              type='text'
              inputId='diet'
              placeholder='Diet'
              value={user.preferences?.Diet || ""}
              // onChange={handleChange}
            />
            <InputField
              label='Allergens'
              name='allergens'
              type='text'
              inputId='allergens'
              placeholder='Allergens'
              value={user.preferences?.Allergies || ""}
              // onChange={handleChange}
            />
            <InputField
              label='Love cooking'
              name='loveCooking'
              type='text'
              inputId='loveCooking'
              placeholder='Love cooking'
              value={user.preferences?.loveCooking || ""}
              // onChange={handleChange}
            />
            <InputField
              label='Average time to cook a meal'
              name='averageTimeToCook'
              type='number'
              inputId='averageTimeToCook'
              placeholder='Average time to cook a meal'
              value={user.preferences?.AverageCookingTime || ""}
              // onChange={handleChange}
            />
          </div>
        </form>
      </>
    );
  }

  return (
    <Custom404>
      You are not logged in please click the sign up input in the top right
      hand corner.
    </Custom404>
  );
};

export default Customization;
