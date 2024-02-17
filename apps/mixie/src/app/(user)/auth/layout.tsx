import { getServerAuthSession } from "@/server/auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { headers } from "next/headers";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh w-full">
      <div className="z-10 m-auto flex max-w-md flex-col items-center justify-center gap-3 rounded-3xl  bg-grey/20 p-3 text-center shadow backdrop-blur-sm dark:bg-grey/60">
        {children}
      </div>
      <Image
        src="/images/auth-background.webp"
        alt="background image"
        fill
        className="absolute -z-50 h-full w-full object-cover object-center"
      />
    </div>
  );
}
