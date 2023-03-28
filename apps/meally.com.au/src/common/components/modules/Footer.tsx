import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <footer className="flex md:flex-row flex-col justify-between items-center w-full h-28 dark:bg-dark_grey bg-white px-4 absolute bottom-0">
        <div className="flex flex-row gap-1 items-center justify-center">
          <Image src="/favicon.ico" alt="Meally Logo" width={60} height={60} />
          <h1 className="text-step1">Meally</h1>
        </div>
        <div className="flex flex-row gap-4 items-start ">
          <Link href="/">Home</Link>
          <Link href="/recipes">Recipe</Link>
          <Link href="/sweet">Sweet</Link>
          <Link href="/savoury">Savoury</Link>
        </div>
        <p className="text-step--4">© 2023 Meally. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
