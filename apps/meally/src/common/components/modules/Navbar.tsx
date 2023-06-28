'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import UserProfile from './UserProfile';
import { SearchIcon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="flex flex-row justify-between items-center px-2 h-14 w-full bg-transparent">
      {/*Logo & name - always show */}
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
      {/*Links - show in sidebar under 768px (md:) */}
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
      {/*Search icon - show always */}
      {/*user profile - show always? */}
      {/* hamburger - show under 768px (md:) */}
      <div className="flex flex-row items-center">
        {/* <SearchDialog buttonType="searchIcon" /> */}
        <SearchIcon className="w-8 h-8" />
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
