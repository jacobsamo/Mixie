import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="bottom-0 flex h-48 w-full flex-col items-center justify-between bg-white px-4 py-2 dark:bg-grey print:hidden sm:flex-row md:h-28">
        <div className="flex flex-row items-center justify-center gap-1">
          <Image
            src="/icons/icon.jpg"
            alt="Meally Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h1 className="text-step1">Meally</h1>
        </div>
        <div className="flex flex-col items-center gap-4 ">
          <div className="flex flex-row items-start  gap-4">
            <Link href="/">Home</Link>
            <Link href="/recipes">Recipe</Link>
          </div>
          <div className="flex flex-row items-start  gap-4">
            <Link href="/info/privacy_policy">Privacy Policy</Link>
            <Link href="/info/terms_service">Terms of Service</Link>
            <Link href="/info/about">About Us</Link>
          </div>
        </div>
        <p className="text-step--4">© 2023 Meally. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
