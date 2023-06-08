import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import UserProfile from './UserProfile';

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center px-2 h-14 w-full bg-transparent">
      <Link href="/" className="flex flex-row gap-1">
        <Image
          width={44}
          height={44}
          src="/favicon.ico"
          alt="Logo"
          className="rounded-full w-11 h-11"
        />
        <h1 className="text-step--1">Meally</h1>
      </Link>
      <div className="flex flex-row gap-8">
        <Link href={'/recipes'} className="font-roboto text-step0 text-center">
          Recipes
        </Link>
        <Link href={'/sweet'} className="font-roboto text-step0 text-center">
          Sweet
        </Link>
        <Link href={'/savoury'} className="font-roboto text-step0 text-center">
          Savoury
        </Link>
      </div>
      <div className="flex flex-row">
        {/* <SearchDialog buttonType="searchIcon" /> */}
        <button
          type="button"
          className="flex flex-col"
          // onClick={() => setIsOpen(!isOpen)}
        >
          <span className="box-border block w-4 h-[2.3px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] rounded-sm transition ease-in-out delay-[0.3s]"></span>
          <span className="box-border block w-4 h-[2.3px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] rounded-sm transition ease-in-out delay-[0.3s]"></span>
          <span className="box-border block w-4 h-[2.3px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] rounded-sm transition ease-in-out delay-[0.3s]"></span>
        </button>
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
