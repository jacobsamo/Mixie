import React, { useEffect, useState } from 'react';
// import { AddButton, InputField } from 'shared';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@components/elements/recipe_form/Form.module.scss';
import ImageWebsites from './ImageWebsites';
import { InputField } from 'shared';

interface ImgProps {
  imgUrl: string;
  imgAlt: string;
}

// interface ImageUploadDialogProps {
//   handleChange: (img: ImgProps[]) => void;
//   dialogOpen: boolean;
//   setDialogOpen: (state: boolean) => void;
// }

// const ImageUploadForm = (props: any) => {
//   const [img, setImg] = useState<ImgProps[]>([]);
//   const [imgUrl, setImgUrl] = useState('');
//   const [imgAlt, setImgAlt] = useState('');

//   function internalChange(event: any) {
//     if (event.target.name == 'imgUrl') setImgUrl(event.target.value);
//     if (event.target.name == 'imgAlt') setImgAlt(event.target.value);
//   }

//   function handleSave() {
//     setImg([{ imgUrl, imgAlt }]);
//   }

//   useEffect(() => {
//     props.handleChange(img);
//   }, [img]);

//   return (
//     <form
//       onSubmit={handleSave}
//       className="flex flex-col gap-2 bg-dark_grey p-20 rounded-md justify-center items-center w-full h-full"
//     >
//       <InputField
//         type="text"
//         required
//         value={imgUrl}
//         name="imgUrl"
//         placeholder='Image URL e.g. "https://www.example.com/image.jpg"'
//         onChange={internalChange}
//       />
//       <InputField
//         type="text"
//         required
//         value={imgAlt}
//         name="imgAlt"
//         inputId='imgAlt'
//         label='Image Description'
//         placeholder='Image Alt e.g. "Image of a cake"'
//         onChange={internalChange}
//       />
//       <button type="submit">Save</button>
//     </form>
//   );
// };

const ImageUpload = (props: any) => {
  const [img, setImg] = useState<ImgProps[]>([]);
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
          name="imgUrl"
          id="imgUrl"
          inputId='imgUrl'
          label='Image Url'
          placeholder="Image url"
          value={imgUrl}
          onChange={(event: any) => setImgUrl(event.target.value)}
        />
        <InputField
          type="text"
          name="imgAlt"
          id="imgAlt"
          inputId='imgAlt'
          label='Image Description'
          placeholder="Image description"
          value={imgAlt}
          onChange={(event: any) => setImgAlt(event.target.value)}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
