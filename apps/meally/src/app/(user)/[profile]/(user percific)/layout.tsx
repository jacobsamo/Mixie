"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface SettingsParams {
  profile: string;
}

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: SettingsParams;
}) {
  const { data: session } = useSession();

  if (session?.user.id != params.profile) {
    return (
      <>
        <h1>You can't access this page </h1>
        <p>as this is someone else profile</p>
        <Link href={`/${session?.user.id}/settings`}>View your settings</Link>
      </>
    );
  }

  return { children };
}
