import { useState } from 'react';
import Link from 'next/link';
import styles from '@components/elements/recipe_form/Form.module.scss';
import ImageWebsites from './ImageWebsites';
import { Dialog, InputField } from 'shared';
import { useFormContext } from 'react-hook-form';
import { Recipe } from 'libs/types';
import Button from 'shared/src/components/buttons/Button';

const ImageUpload = () => {
  const { control } = useFormContext<Recipe>();

  return (
    <div className={styles.fileInput}>
      <div className="flex flex-col gap-2 dark:bg-dark_grey p-20 rounded-md justify-center items-center w-full h-full">
        <label htmlFor="imgUrl">
          Our preferred image source is from{' '}
          <Link
            href={'https://unsplash.com'}
            target="_blank"
            className="text-blue underline"
          >
            Unsplash
          </Link>
        </label>
        <ImageWebsites />
        <InputField
          type="text"
          name="image.imgAlt"
          id="imgAlt"
          hint='Description of the image, e.g. "A bowl of pasta"'
          label="Image Description"
          control={control}
        />
        <InputField
          type="text"
          name="image.imgUrl"
          id="imgUrl"
          control={control}
          label="Image Url"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
