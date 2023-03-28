import React from 'react';
import Link from 'next/link';
import styles from './algolia_search_dialog.module.scss';
import { Hits, Highlight } from 'react-instantsearch-hooks-web';
import { Hit } from 'libs/types';

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
export default Hit;
