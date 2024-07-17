"use client";
import { Button } from "@/components/ui/button";
import { createQueryString } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface SettingsParams {
  userId: string;
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeLink = searchParams.get("activeLink") || "profile";

  return (
    <>
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
    </>
  );
}
