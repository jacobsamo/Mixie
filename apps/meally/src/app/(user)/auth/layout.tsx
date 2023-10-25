"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();
  const router = useRouter();

  if (data?.user) {
    router.push("/");
  }

  return <main className="h-full w-full">{children}</main>;
}
