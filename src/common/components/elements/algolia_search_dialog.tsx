import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
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
  "ZKJ2IQ1M9Y",
  "799c88bf6f889e72af4c7ccceafa8f7b"
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
      <Transition appear show={dialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={styles.dialogContainer}>
                  <InstantSearch searchClient={searchClient} indexName="recipes">
                    <Configure hitsPerPage={10} />
                    <SearchBox />
                    <Hits hitComponent={Hit} />
                  </InstantSearch>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
