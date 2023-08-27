'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import { SearchIcon } from 'lucide-react';
import clsx from 'clsx';
import SearchTrigger from './SearchTrigger';
import { Button } from '../ui/button';
import recipeService from '../../lib/services/RecipeService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="flex flex-row justify-between items-center px-2 h-14 w-full bg-transparent">
      {/* Logo & name - always show */}
      <Link href="/" className="flex flex-row gap-1">
        {/* Logo image */}
        <Image
          width={44}
          height={44}
          src="/favicon.ico"
          alt="Logo"
          className="rounded-full w-11 h-11"
        />
        {/* Logo text */}
        <h1 className="text-step--1">Meally</h1>
      </Link>

      {/* Links - show in sidebar under 640px (sm:), otherwise always show */}
      <div
        className={clsx('flex flex-col sm:flex-row gap-8', {
          hidden: isMobile && !isOpen,
          'flex absolute z-50 top-14 left-0 w-full h-screen bg-white dark:bg-black':
            isOpen,
        })}
      >
        <Link
          href={'/recipes'}
          onClick={() => setIsOpen(false)}
          className="font-roboto text-step0 text-center"
        >
          Recipes
        </Link>
        {/* <Link
          href={'/sweet'}
          onClick={() => setIsOpen(false)}
          className="font-roboto text-step0 text-center"
        >
          Sweet
        </Link>
        <Link
          href={'/savoury'}
          onClick={() => setIsOpen(false)}
          className="font-roboto text-step0 text-center"
        >
          Savoury
        </Link> */}
      </div>

      {/*Search icon - show always */}
      {/*user profile - show always? */}
      {/* hamburger - show under 768px (md:) */}
      <div className="flex flex-row gap-1 items-center">
        {/* <SearchDialog buttonType="searchIcon" /> */}
        <SearchTrigger>
          <SearchIcon className="w-8 h-8" />
        </SearchTrigger>
        <button
          type="button"
          className="flex flex-col items-end justify-center gap-1 sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={clsx(
              'bg-black dark:bg-white box-border block w-4 h-[2.3px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] rounded-sm transition-all ease-in-out delay-[0.3s]',
              { 'rotate-45 w-[1.625rem] translate-y-[6px]': isOpen }
            )}
          ></span>
          <span
            className={clsx(
              'bg-black dark:bg-white box-border block w-[1.625rem] h-[2.3px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] rounded-sm transition-all ease-in-out delay-[0.3s]',
              { 'opacity-0': isOpen }
            )}
          ></span>
          <span
            className={clsx(
              'bg-black dark:bg-white box-border block w-[1.3125rem] h-[2.3px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] rounded-sm transition-all ease-in-out delay-[0.3s]',
              { '-rotate-45 w-[1.625rem] -translate-y-[6px]': isOpen }
            )}
          ></span>
        </button>
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
