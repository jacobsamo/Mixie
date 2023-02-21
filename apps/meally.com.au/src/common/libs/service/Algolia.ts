import algoliasearch from 'algoliasearch/lite';
import { createRef } from 'react';

const searchClient = algoliasearch(
    'ZKJ2IQ1M9Y',
    '799c88bf6f889e72af4c7ccceafa8f7b'
);

const handleAlgoliaSearchClick = (type: string) => {
    let state = false
    if (type == 'clickEvent') state = !state
    if (type == 'checkState') return state
}

export { searchClient, handleAlgoliaSearchClick }