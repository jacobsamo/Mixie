import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from 'react-instantsearch-hooks-web';
import { is } from 'cypress/types/bluebird';

interface Search {
  search_placeholder: string;
  collection: string;
  clicked: boolean;
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

const Algolia_Search_Dialog = ({
  search_placeholder,
  collection,
  clicked,
}: Search) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Dialog.Panel>
          <InstantSearch searchClient={searchClient} indexName="recipes">
            <SearchBox
              placeholder="Search for recipes"
              autoFocus={true}
              searchAsYouType={true}
            />
            <Hits hitComponent={Hit} />
          </InstantSearch>
          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Algolia_Search_Dialog;
