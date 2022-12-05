import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useCallback, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
} from 'react-instantsearch-hooks-web';
import { is } from 'cypress/types/bluebird';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import styles from './algolia_search_dialog.module.scss';

interface SearchDialogType {
  buttonType: string;
}

const searchClient = algoliasearch(
  'ZKJ2IQ1M9Y',
  '799c88bf6f889e72af4c7ccceafa8f7b'
);

const Hit = ({ hit }: any) => {
  return (
    <article>
      <img src="#" alt="" />
      <h1>
        <Highlight attribute="recipeName" hit={hit} />
      </h1>
      <p>Ingredients: {hit.ingredients}</p>
    </article>
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
            <Dialog.Panel className="w-3/4 h-3/4">
              <InstantSearch searchClient={searchClient} indexName="recipes">
                <Configure hitsPerPage={10} />
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
                <Hits hitComponent={Hit} />
              </InstantSearch>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
