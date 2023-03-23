import React, { useEffect, useState } from 'react';
// import { AddButton, InputField } from 'ui';
import Image from 'next/image';
import styles from '@components/elements/recipe_form/Form.module.scss';

interface imgProps {
  imgUrl: string;
  imgAlt: string;
}

// interface ImageUploadDialogProps {
//   handleChange: (img: imgProps[]) => void;
//   dialogOpen: boolean;
//   setDialogOpen: (state: boolean) => void;
// }

const ImageUploadForm = (props: any) => {
  const [img, setImg] = useState<imgProps[]>([]);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  function internalChange(event: any) {
    if (event.target.name == 'imgUrl') setImgUrl(event.target.value);
    if (event.target.name == 'imgAlt') setImgAlt(event.target.value);
  }

  function handleSave() {
    setImg([{ imgUrl, imgAlt }]);
  }

  useEffect(() => {
    props.handleChange(img);
  }, [img]);

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col gap-2 bg-dark_grey p-20 rounded-md justify-center items-center w-full h-full"
    >
      <input
        type="text"
        required
        value={imgUrl}
        name="imgUrl"
        placeholder='Image URL e.g. "https://www.example.com/image.jpg"'
        onChange={internalChange}
      />
      <input
        type="text"
        required
        value={imgAlt}
        name="imgAlt"
        placeholder='Image Alt e.g. "Image of a cake"'
        onChange={internalChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};

const ImageUpload = (props: any) => {
  const [img, setImg] = useState<imgProps[]>([]);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  function internalChange(event: any) {
    if (event.target.name == 'imgUrl') setImgUrl(event.target.value);
    if (event.target.name == 'imgAlt') setImgAlt(event.target.value);
  }

  useEffect(() => {
    setImg([{ imgUrl, imgAlt }]);
  }, [imgUrl, imgAlt]);

  useEffect(() => {
    props.handleChange(img);
  }, [img]);

  return (
    <div className={styles.fileInput}>
      {/* <AddButton
          type="button"
          name="Image"
        /> */}
      <div className="flex flex-col gap-2 bg-dark_grey p-20 rounded-md justify-center items-center w-full h-full">
        <input
          type="text"
          name="imgUrl"
          id="imgUrl"
          placeholder="Image url"
          value={imgUrl}
          onChange={(event: any) => setImgUrl(event.target.value)}
        />
        <input
          type="text"
          name="imgAlt"
          id="imgAlt"
          placeholder="Image description"
          value={imgAlt}
          onChange={(event: any) => setImgAlt(event.target.value)}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
