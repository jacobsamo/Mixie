"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/db/next-auth-adapter";
import { useSession } from "next-auth/react";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();
  const router = useRouter();

  if (data?.user) {
    router.push("/");
  }

  return <main>{children}</main>;
}
