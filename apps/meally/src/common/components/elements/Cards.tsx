'use client';
import React from 'react';
import Image from 'next/image';
import type { Info, Recipe } from '@/src/db/types';
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';

function addBookMark(recipe: Info) {
  throw Error('Function not implemented.');
}

interface CardProps {
  recipe: Info;
}

interface BaseCardProps extends CardProps {
  hasCookTime?: boolean;
  classNames: {
    container?: string;
    image?: string;
    title?: string;
    time?: string;
    bookmarkContainer?: string;
    cookTime?: string;
    bookmarkButton?: string;
    bookmarkIcon?: string;
  };
}

const BaseCard = ({
  recipe,
  hasCookTime = true,
  classNames,
}: BaseCardProps) => {
  const { toast } = useToast();

  return (
    <div
      className={`${classNames.container} relative flex p-2 items-center justify-between flex-col h-58 w-58 rounded-xl text-black dark:text-white`}
    >
      <Link
        href={`/recipes/${recipe.id}`}
        className={`${classNames.title} text-center text-step--2`}
      >
        {recipe.title}
      </Link>

      {hasCookTime ? (
        <div
          className={`${classNames.bookmarkContainer} flex flex-row w-full justify-between `}
        >
          <h3 className={`${classNames.cookTime} w-fit whitespace-nowrap`}>
            {recipe.total}
          </h3>
          <button
            onClick={() => {
              addBookMark(recipe);
              toast({
                description: 'Recipe has been bookmarked',
              });
            }}
            className={classNames.bookmarkButton}
          >
            <HeartIcon
              className={`${classNames.bookmarkIcon} w-8 h-8 cursor-pointer`}
            />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            addBookMark(recipe);
            toast({
              description: 'Recipe has been bookma',
            });
          }}
          className={`absolute right-2 bottom-2 ${classNames.bookmarkButton}`}
        >
          <HeartIcon
            className={`${classNames.bookmarkIcon} w-8 h-8 cursor-pointer`}
          />
        </button>
      )}

      <Image
        src={recipe.imgUrl || ''}
        alt={recipe.imgAlt || ''}
        fill
        priority
        className={`${classNames.image} rounded-xl object-cover h-58 w-58 -z-20`}
      />
    </div>
  );
};

const CardSquare = ({ recipe }: CardProps) => {
  return <BaseCard recipe={recipe} classNames={{ container: 'h-58 w-58' }} />;
};

const CardRectangleSmall = ({ recipe }: CardProps) => {
  return (
    <BaseCard
      recipe={recipe}
      classNames={{ container: 'h-58 w-46', image: 'h-58 w-46' }}
    />
  );
};

interface SearchCardProps extends CardProps {
  as: 'li' | 'div' | 'article' | 'section';
  edit?: boolean;
}

const SearchCard = ({ as, edit, recipe }: SearchCardProps) => {
  const Tag = as;
  return (
    <Tag className="flex flex-row relative w-full max-w-[600px] gap-2 h-32 rounded-md bg-grey">
      <Image
        src={recipe.imgUrl || ''}
        alt={recipe.imgAlt || ''}
        width={100}
        height={100}
        className="w-2/5 h-32 object-cover rounded-lg"
      />
      <button
        onClick={() => addBookMark(recipe)}
        className="absolute right-2 bottom-2"
      >
        <HeartIcon className={`w-8 h-8 cursor-pointer`} />
      </button>
      <div>
        <Link
          href={`/recipes/${recipe.id}${edit ? '/edit' : ''}`}
          className="text-step--1"
        >
          {recipe.title}
        </Link>
        {recipe.keywords && (
          <div className="flex flex-row flex-wrap gap-1 w-full">
            {recipe?.keywords?.slice(0, 5).map((keyword, index) => {
              return (
                <p
                  key={index}
                  className="text-center w-fit h-fit p-1 rounded-lg text-step--4 bg-yellow opacity-80 text-black"
                >
                  {keyword.value}
                </p>
              );
            }) || null}
            {recipe?.keywords?.length > 5 && (
              <p className="text-center text-step--4 opacity-80 text-black">
                ...
              </p>
            )}
          </div>
        )}
      </div>
    </Tag>
  );
};

const CardRectangle = ({ recipe }: CardProps) => {
  return (
    <BaseCard
      recipe={recipe}
      hasCookTime={false}
      classNames={{
        container: 'h-64 w-[43.75rem] resize',
        bookmarkContainer: 'absolute right-2 bottom-2',
        image: 'h-64 w-[43.75rem] resize',
        title: 'text-step0',
      }}
    />
  );
};

export { CardRectangleSmall, CardRectangle, SearchCard, CardSquare };
