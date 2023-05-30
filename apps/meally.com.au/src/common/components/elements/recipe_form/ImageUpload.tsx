'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '@components/elements/recipe_form/Form.module.scss';
import ImageWebsites from './ImageWebsites';
import { Dialog, InputField } from 'shared';
import { useForm, useFormContext } from 'react-hook-form';
import { Recipe } from 'libs/types';
import Button from 'shared/src/components/buttons/Button';
// import FileService from '@lib/service/FileService';
interface ImageUploadProps {
  fileUploadRef: React.MutableRefObject<HTMLInputElement | null>;
}

const ImageUpload = ({ fileUploadRef }: ImageUploadProps) => {
  const { control } = useFormContext<Recipe>();

  return (
    <div className="flex flex-col items-start gap-2 dark:bg-dark_grey p-20 rounded-md justify-center  w-full h-full">
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

      <p>enter a image link</p>
      <InputField
        type="text"
        name="image.imgUrl"
        id="imgUrl"
        control={control}
        label="Image Url"
        // onChange={handleUrlChange}
      />
      <p>OR</p>
      <input
        type="file"
        id="image"
        accept=".png, .jpg, .jpeg, .webp, .gif, .avif"
        ref={fileUploadRef}
      />
      <br />
      <InputField
        type="text"
        name="image.imgAlt"
        id="imgAlt"
        hint='Description of the image, e.g. "A bowl of pasta"'
        label="Image Description"
        control={control}
      />
    </div>
  );
};

export default ImageUpload;
