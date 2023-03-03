import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className=" flex flex-col items-center justify-center w-full h-24 dark:bg-dark_grey bg-white">
        <div className="flex flex-row gap-4 ">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <p className="text-sm">© 2023 Meally. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
