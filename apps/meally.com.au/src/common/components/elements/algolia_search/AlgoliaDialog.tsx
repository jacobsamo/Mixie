import React, { useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import algoliasearch from 'algoliasearch/lite';
import styles from './algolia_search_dialog.module.scss';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from 'react-instantsearch-hooks-web';
import { Dialog } from 'ui';
import Hit from './Hit';

interface AlgoliaDialogProps {
  buttonType: string;
}

const searchClient = algoliasearch(
  'ZKJ2IQ1M9Y',
  '799c88bf6f889e72af4c7ccceafa8f7b'
);

export default function AlgoliaDialog({ buttonType }: AlgoliaDialogProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const Button = () => {
    if (buttonType === 'searchBar') {
      return (
        <>
          <button
            onClick={() => setDialogOpen(true)}
            // style={{ width: '28rem', height: '2.8rem' }}
            className="dark:bg-dark_grey dark:text-white p-1 pr-5 min-w-max max-w-[28rem] h-[2.8rem] resize bg-white shadow-searchBarShadow relative flex items-center rounded-xl"
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
      <Dialog
        isOpen={dialogOpen}
        setOpen={() => setDialogOpen(!dialogOpen)}
        closeOnEscape={true}
        closeOnOutsideClick={true}
        openKeys={['Control', '/', 'k']}
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
      </Dialog>
    </>
  );
}
