import { getServerAuthSession } from "@/src/server/auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session) {
    return redirect("/");
  }

  return <main className="h-full w-full">{children}</main>;
}
