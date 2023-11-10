"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  ArrowUpRightSquare,
  Bookmark,
  Settings,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import CreateRecipeDialog from "../elements/CreateRecipeDialog";

const UserProfile = () => {
  const { session, user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link
        href={"/api/auth/signin"}
        className="rounded-md bg-yellow p-1 px-2 font-semibold text-black"
      >
        Login
      </Link>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Image
          width={42}
          height={42}
          src={
            user?.image ||
            "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="user profile picture"
          className="h-10 w-10 cursor-pointer rounded-full object-cover"
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-2">
        <Link
          onClick={() => setOpen(false)}
          href={`/${user?.id}`}
          className="flex flex-row gap-1"
        >
          <UserCircle2 /> Profile
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={`/${user?.id}/bookmarks`}
          className="flex flex-row gap-1"
        >
          {" "}
          <Bookmark />
          Bookmarks
        </Link>
        <CreateRecipeDialog />
        <Link
          onClick={() => setOpen(false)}
          href={`/${user?.id}/settings/profile`}
          className="flex flex-row gap-1"
        >
          {" "}
          <Settings />
          Settings
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/api/auth/signout"}
          className="flex flex-row gap-1"
        >
          {" "}
          <ArrowUpRightSquare />
          Signout
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
