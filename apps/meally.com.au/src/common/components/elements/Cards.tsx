import React from 'react';
import Image from 'next/image';
import type { ImageProps } from 'libs/types';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface CardProps {
  title: string;
  id: string;
  totalTime: number;
  handleClick: () => void;
  image: ImageProps;
}

const CardSquare = ({
  title,
  id,
  totalTime,
  handleClick,
  image,
}: CardProps) => {
  const time = totalTime < 60 ? `${totalTime} mins` : `${totalTime / 60} hrs`;
  const router = useRouter();
  return (
    <div className="relative flex p-2 items-center justify-between flex-col h-58 w-58 rounded-xl text-black dark:text-white">
      <h1 className="text-center text-step--2">{title}</h1>
      <div className="flex flex-row w-full justify-between ">
        <h3 className="w-fit whitespace-nowrap">{time}</h3>
        <button onClick={handleClick}>
          <HeartIcon className="w-8 h-8 cursor-pointer" />
          {/* Change width and height on different component types */}
        </button>
      </div>
      <Image
        src={image.imgUrl}
        alt={image.imgAlt}
        fill
        className="rounded-xl object-cover h-58 w-46 -z-20"
        onClick={() => {
          router.push(`/recipes/${id}}`);
        }}
      />
    </div>
  );
};

const CardRectangleSmall = ({
  title,
  id,
  totalTime,
  handleClick,
  image,
}: CardProps) => {
  const time = totalTime < 60 ? `${totalTime} mins` : `${totalTime / 60} hrs`;
  const router = useRouter();
  return (
    <div className="relative flex p-2 items-center justify-between flex-col h-58 w-46 rounded-xl text-black dark:text-white">
      <h1 className="text-center text-step--2">{title}</h1>
      <div className="flex flex-row w-full justify-between ">
        <h3 className="w-fit whitespace-nowrap">{time}</h3>
        <button onClick={handleClick}>
          <HeartIcon className="w-8 h-8 cursor-pointer" />
          {/* Change width and height on different component types */}
        </button>
      </div>
      <Image
        src={image.imgUrl}
        alt={image.imgAlt}
        fill
        className="rounded-xl object-cover h-58 w-46 -z-20"
        onClick={() => {
          router.push(`/recipes/${id}}`);
        }}
      />
    </div>
  );
};

const CardRectangle = ({
  title,
  id,
  totalTime,
  handleClick,
  image,
}: CardProps) => {
  const time = totalTime < 60 ? `${totalTime} mins` : `${totalTime / 60} hrs`;
  const router = useRouter();
  return (
    <div className="relative flex flex-col p-2 items-center justify-between  h-64 w-[43.75rem] resize rounded-xl text-black dark:text-white">
      <h1 className="text-center text-step1">{title}</h1>
      <button onClick={handleClick} className="absolute right-2 bottom-2">
        <HeartIcon className="w-8 h-8 cursor-pointer" />
        {/* Change width and height on different component types */}
      </button>
      <Image
        src={image.imgUrl}
        alt={image.imgAlt}
        fill
        className="rounded-xl object-cover h-58 w-46 -z-20"
        onClick={() => {
          router.push(`/recipes/${id}}`);
        }}
      />
    </div>
  );
};

export { CardRectangleSmall, CardRectangle, CardSquare };
