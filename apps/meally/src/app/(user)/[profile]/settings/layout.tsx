"use client";
import React from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const pathname = usePathname();
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const firstSegment = pathname.split("/")[1];
  const { data: session } = useSession();

  if (session?.user?.id !== params.profile) {
    return (
      <main>
        <h1 className="text-center text-step--2">You are not authorized.</h1>
      </main>
    );
  }

  return (
    <main>
      <header className="mx-auto mt-2 flex w-full flex-row justify-center gap-4 rounded-md bg-white p-1 shadow-main dark:bg-grey md:w-2/4">
        <Link
          href={`/${firstSegment}/settings/profile`}
          className={linkStyles({ selected: lastSegment === "profile" })}
        >
          Profile
        </Link>
        <Link
          href={`/${firstSegment}/settings/customization`}
          className={linkStyles({
            selected: lastSegment === "customization",
          })}
        >
          Customization
        </Link>
        <Link
          href={`/${firstSegment}/settings/account`}
          className={linkStyles({ selected: lastSegment === "account" })}
        >
          Account
        </Link>
      </header>
      {children}
    </main>
  );
}
