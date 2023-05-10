import { useState } from 'react';
import Link from 'next/link';
import styles from '@components/elements/recipe_form/Form.module.scss';
import ImageWebsites from './ImageWebsites';
import { Dialog, InputField } from 'shared';
import { useFormContext } from 'react-hook-form';
import { Recipe } from 'libs/types';
import Button from 'shared/src/components/buttons/Button';
import FileService from '@lib/service/FileService';
import Utils from '@lib/service/Utils';

const ImageUpload = () => {
  const { control, getValues } = useFormContext<Recipe>();
  const [open, setOpen] = useState(false);

  function handleImageUpload(file: File) {
    // FileService.uploadImage(
    //   file,
    //   '',
    //   `${Utils.toId(getValues('recipeName'))}-image`
    // );
    return '';
  }

  return (
    <div className={styles.fileInput}>
      <div className="flex flex-col gap-2 dark:bg-dark_grey p-20 rounded-md justify-center items-center w-full h-full">
        <Button type="button" onClick={() => setOpen(true)}>
          Upload an image
        </Button>
        <Dialog
          isOpen={open}
          setOpen={setOpen}
          classNames={{
            overlay: 'w-1/2 h-1/2',
          }}
        >
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
          />
          <p>OR</p>
          <p>Upload your own image</p>
          <input
            type="file"
            placeholder="Upload your own file"
            // onInput={handleImageUpload}
          />
        </Dialog>
        <InputField
          type="text"
          name="image.imgAlt"
          id="imgAlt"
          hint='Description of the image, e.g. "A bowl of pasta"'
          label="Image Description"
          control={control}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
