import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { Hit } from 'libs/types';


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
        {info.dietary.map((dietary: any) => {
          return <li key={dietary.length}>{dietary}</li>;
        })}
      </ul>
    );
  };
  //TODO: Make this faster and responsive for mobile and any other device just giving me the shits atm (9th, Dec, 2022)
  //TODO: Make highlighting to also cover over measures of searching
  return (
    <Link className="relative" href={info.path.toString()}>
        <Highlight
          attribute="recipeName"
          hit={hit}
          classNames={{
            root: styles.hitName,
          }}
        />
        <DietaryNeeds />
    </Link>
  );
};

export default function Algolia_Search_Dialog({
  buttonType,
}: SearchDialogType) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const ref = useRef();

  const handleKeyPress = useCallback((event: any) => {
    if (event.ctrlKey == true && event.key == 'k') setDialogOpen(true);
  }, []);

  const handleKeyEscape = useCallback((event: any) => {
    if (event.key === 'Escape') setDialogOpen(false);
  }, []);

  //TODO: make it so you can click out side of the dialog to close it
  // useEffect(() => {
  //   const checkIfClickedOutside = (e: any) => {
  //     // If the menu is open and the clicked target is not within the menu,
  //     // then close the menu
  //     if (ref.current && !ref.current.contains(e.target as Node)) {
  //       setDialogOpen(false)
  //     }
  //   }

  //   document.addEventListener("mousedown", checkIfClickedOutside)

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", checkIfClickedOutside)
  //   }
  // }, [dialogOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEscape);
    return () => document.removeEventListener('keydown', handleKeyEscape);
  }, [handleKeyEscape]);

  const Button = () => {
    if (buttonType === 'searchBar') {
      return (
        <>
          <button
            onClick={() => setDialogOpen(true)}
            style={{ width: '28rem', height: '2.8rem' }}
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

  //TODO: handle clicking outside of the dialog to close
  return (
    <>
      <Button />
      <div
        style={{
          display: dialogOpen ? 'block' : 'none',
        }}
        className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm"
      >
        <InstantSearch searchClient={searchClient} indexName="recipes">
          <Configure hitsPerPage={10} />
          <div className={styles.searchBox}>
            {/*TODO: (not urgent) center this element in the middle for desktop */}
            <span>
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
              <button
                className="absolute right-2 top-4"
                onClick={() => setDialogOpen(false)}
              >
                Esc
              </button>
            </span>
            <Hits
              classNames={{
                root: 'flex flex-col gap-2 h-full w-full',
                list: 'h-full w-full flex justify-center pt-1',
                item: styles.hitContainer,
              }}
              hitComponent={Hit}
            />
          </div>
        </InstantSearch>
      </div>
    </>
  );
}
