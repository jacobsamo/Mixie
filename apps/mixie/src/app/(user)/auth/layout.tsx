import { getServerAuthSession } from "@/server/auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session) {
    return redirect("/");
  }

  return (
    <main className="h-full w-full">
      <div className="m-auto flex max-w-md flex-col items-center gap-3 rounded-3xl bg-white p-3 text-center dark:bg-grey">
        {children}
      </div>
    </main>
  );
}
