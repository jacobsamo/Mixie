import React, { useState } from 'react';
import { AddButton, Dialog, InputField } from 'ui';
import Image from 'next/image';
import styles from '@components/elements/recipe_elemnts/form_items/From.module.scss';


const ImageUpload = (props: any) => {
  interface imgProps {
    imgUrl: string;
    imgAlt: string;
  }
  const [img, setImg] = useState<imgProps[]>([]);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [open, setOpen] = useState(false);

  function handleSave() {
    setImg([{ imgUrl, imgAlt }]);
    setOpen(false);
  }

  const ImageUploadDialog = () => {
    return (
      <>
        <Dialog
          open={open}
          setOpen={setOpen}
          className="flex justify-center items-center w-full h-full"
        >
          <div className="flex flex-col gap-2 bg-dark_grey p-20 rounded-md">
            <InputField
              value={imgUrl}
              type="text"
              required
              placeholder="Image url"
              name="imgUrl"
              onChange={(e: any) => setImgUrl(e.target.value)}
            />
            <InputField
              value={imgAlt}
              type="text"
              placeholder="Image description e.g chocolate brownies"
              name="imgAlt"
              onChange={(e: any) => setImgAlt(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </Dialog>
      </>
    );
  };

  const RecipeImage = () => {
    return (
      <>
        {img.map((img, index) => (
          <Image
            src={img?.imgUrl || ''}
            alt={img?.imgAlt || ''}
            width={800}
            height={600}
            priority
          />
        ))}
      </>
    );
  };

  return (
    <div className={styles.fileInput}>
      <AddButton
        type="button"
        name="Image"
        onClick={() => {
          setOpen(true);
        }}
      />
      <ImageUploadDialog />
    </div>
  );
};

export default ImageUpload;