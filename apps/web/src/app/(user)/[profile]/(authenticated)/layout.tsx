import { getUser } from "@/lib/utils/getUser";
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
  const user = await getUser();

  if (!user && user!.id != params.profile) return notFound();

  return <div className="h-fit min-h-full w-full">{children}</div>;
}
