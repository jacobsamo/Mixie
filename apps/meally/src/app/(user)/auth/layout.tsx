import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/db/next-auth-adapter";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  return <main>{children}</main>;
}
