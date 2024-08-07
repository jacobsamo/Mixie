"use client";
import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CreateRecipeIconButton, SearchIconTrigger } from "./open-dialogs";
import UserProfile from "./user-profile-dropdown";
import VersionChip from "./versioning-chips";

const Navbar = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="flex h-14 w-full flex-row items-center justify-between bg-transparent px-2 print:hidden">
      {/* Logo & name - always show */}
      <Link href="/" className="flex flex-row items-center gap-1">
        {/* Logo image */}
        <Image
          width={44}
          height={44}
          src="/icons/icon_x48.jpg"
          alt="Logo"
          className="h-11 w-11 rounded-full"
        />
        {/* Logo text */}
        <h1 className="text-step--1">Mixie</h1>
        <VersionChip release="beta" />
      </Link>

      {/* Links - show in sidebar under 640px (sm:), otherwise always show */}
      <div
        // className={`flex flex-col gap-8 sm:flex-row ${
        //   isMobile && !isOpen ? "hidden" : ""
        // } ${
        //   isOpen
        //     ? "absolute left-0 top-14 z-50 flex h-screen w-full bg-white dark:bg-black"
        //     : ""
        // }`}
        className={cn("flex flex-col gap-8 sm:flex-row", {
          hidden: isMobile && !isOpen,
          "absolute left-0 top-14 z-50 flex h-screen w-full bg-white dark:bg-black":
            isOpen,
        })}
      >
        <Link
          href={"/recipes"}
          onClick={() => setIsOpen(false)}
          className="text-center font-roboto text-step0"
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
      <div className="flex flex-row items-center gap-1">
        <SearchIconTrigger />
        {user != undefined && <CreateRecipeIconButton />}

        <UserProfile />
        {isMobile && (
          <button
            type="button"
            className="flex flex-col items-end justify-center gap-1 sm:hidden"
            aria-label="Open sidebar"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={clsx(
                "shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] delay-[0.3s] box-border block h-[2.3px] w-4 rounded-sm bg-black transition-all ease-in-out dark:bg-white",
                { "w-[1.625rem] translate-y-[6px] rotate-45": isOpen }
              )}
            ></span>
            <span
              className={clsx(
                "shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] delay-[0.3s] box-border block h-[2.3px] w-[1.625rem] rounded-sm bg-black transition-all ease-in-out dark:bg-white",
                { "opacity-0": isOpen }
              )}
            ></span>
            <span
              className={clsx(
                "shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] delay-[0.3s] box-border block h-[2.3px] w-[1.3125rem] rounded-sm bg-black transition-all ease-in-out dark:bg-white",
                { "w-[1.625rem] -translate-y-[6px] -rotate-45": isOpen }
              )}
            ></span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
