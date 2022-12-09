import React, { Fragment, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import algoliasearch from 'algoliasearch/lite';
import styles from './algolia_search_dialog.module.scss';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
} from 'react-instantsearch-hooks-web';
import { Hit } from '@lib/types/algolia';

interface SearchDialogType {
  buttonType: string;
}

const searchClient = algoliasearch(
  'ZKJ2IQ1M9Y',
  '799c88bf6f889e72af4c7ccceafa8f7b'
);

const Hit = ({ hit }: any) => {
  const info: Hit = hit;
  const DietaryNeeds = () => {
    if (hit.dietary.length == 0) {
      return <></>;
    }
    return (
      <ul className={styles.hitDietary}>
        {info.dietary.map((dietary) => {
          return (
            <li key={dietary.length} >
              {dietary}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <a className='relative' href={info.path}>
      <img
        src={info.imgUrl}
        alt={info.recipeName}
        className='h-full w-10 left-0'
      />
        <Highlight attribute="recipeName" hit={hit} classNames={{
          root: styles.hitName,
        }}/>
      <DietaryNeeds />
    </a>
  );
};

export default function Algolia_Search_Dialog({
  buttonType,
}: SearchDialogType) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleKeyPress = useCallback((event: any) => {
    // check if the Shift key is pressed
    if (event.ctrlKey === true && event.key.toLowerCase() === 'k') {
      setDialogOpen(true);
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  function closeModal() {
    setDialogOpen(false);
  }

  const searchBarStyles = {
    width: '28rem',
    height: '2.8rem',
  };

  const Button = () => {
    if (buttonType === 'searchBar') {
      return (
        <>
          <button
            onClick={() => setDialogOpen(true)}
            style={searchBarStyles}
            className="dark:bg-dark_grey dark:text-white bg-white shadow-searchBarShadow relative flex items-center rounded-xl"
          >
            <MagnifyingGlassIcon className="h-5 w-5 ml-5" />
            <span className="m-1">
              Search by keyword, ingredient or recipes
            </span>
          </button>
        </>
      );
    }
    if (buttonType === 'searchIcon') {
      return (
        <button onClick={() => setDialogOpen(true)}>
          <MagnifyingGlassIcon className="h-8 w-8" />
        </button>
      );
    }
    return <></>;
  };

  return (
    <>
      <Button />
      <Dialog
        as="div"
        className="relative z-10 w-full h-full"
        onClose={closeModal}
        open={dialogOpen}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className={styles.container}>
            <Dialog.Panel className={styles.dialogPanel}>
              <InstantSearch searchClient={searchClient} indexName="recipes">
                <Configure hitsPerPage={10} />
                <div className="flex flex-col gap-2 justify-center">
                  <SearchBox
                    placeholder="Search by keyword, ingredient or recipes"
                    submitIconComponent={({ classNames }) => (
                      <MagnifyingGlassIcon className={classNames.submitIcon} />
                    )}
                    classNames={{
                      root: styles.searchContainer,
                      form: styles.searchForm,
                      input: styles.searchField,
                      submitIcon: styles.searchIcon,
                      resetIcon: 'hidden',
                    }}
                    autoFocus={true}
                    searchAsYouType={true}
                  />
                  <Hits
                    classNames={{
                      root: 'flex flex-col gap-2 h-full w-full',
                      list: 'h-full w-full',
                      item: styles.hitContainer,
                    }}
                    hitComponent={Hit}
                  />
                </div>
              </InstantSearch>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
