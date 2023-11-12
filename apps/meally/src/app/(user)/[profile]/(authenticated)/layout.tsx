import { getServerAuthSession } from "@/src/server/auth";
import { get } from "http";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface SettingsParams {
  profile: string;
}

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: SettingsParams;
}) {
  const session = await getServerAuthSession();

  if (session?.user.id != params.profile) return notFound();

  return <main className="h-full w-full">{children}</main>;
}
