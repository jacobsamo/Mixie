import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export interface CollectionCardProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
}

const CollectionCard = ({
  icon,
  title,
  href,
  className,
}: CollectionCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-16 w-32 min-w-32 resize items-center justify-center gap-2 rounded-md px-4 py-2 shadow outline-2 outline-black dark:bg-grey md:w-44",
        className
      )}
    >
      {icon}
      <h2>{title}</h2>
    </Link>
  );
};

export default CollectionCard;
