import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between h-14 w-full bg-transparent">
      <Link href={'/recipes'}>Recipes</Link>
      <Link href={'#'}>Sweet</Link>
      <Link href={'#'}>Savoury</Link>
    </nav>
  );
};

export default Navbar;
