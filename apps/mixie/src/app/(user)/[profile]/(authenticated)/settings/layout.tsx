"use client";
import React from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/src/common/components/ui/button";

interface SettingsParams {
  profile: string;
}

const linkStyles = cva("text-step--2", {
  variants: {
    selected: {
      true: "underline underline-offset-1",
      false: "",
    },
  },
});

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: SettingsParams;
}) {
  const searchParams = useSearchParams();
  const activeLink = searchParams.get("activeLink") || "profile";

  const router = useRouter();
  const pathName = usePathname();

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  return (
    <main className="h-full w-full">
      <header className="mx-auto mt-2 flex w-full flex-row justify-center gap-4 rounded-md bg-white p-1 shadow-main md:w-2/4 dark:bg-grey">
        <Button
          unstyled
          aria-label="Go to edit profile page"
          onClick={() => {
            router.push("?" + createQueryString("activeLink", "profile"));
          }}
          className={linkStyles({ selected: activeLink === "profile" })}
        >
          Profile
        </Button>
        <Button
          unstyled
          aria-label="Go to edit profile page"
          onClick={() => {
            router.push("?" + createQueryString("activeLink", "customization"));
          }}
          className={linkStyles({ selected: activeLink === "customization" })}
        >
          Customization
        </Button>
        <Button
          unstyled
          aria-label="Go to edit profile page"
          onClick={() => {
            router.push("?" + createQueryString("activeLink", "account"));
          }}
          className={linkStyles({ selected: activeLink === "account" })}
        >
          Account
        </Button>
      </header>
      {children}
    </main>
  );
}
