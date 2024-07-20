"use client";
import FeedbackDialog from "@/components/modals/feedback-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from "jotai";
import {
  ArrowUpRightSquare,
  ScrollText,
  Settings,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useUser from "../hooks/useUser";
import { CreateRecipeTrigger } from "./open-dialogs";
import { userDropDownOpen } from "./providers/state-provider";

const UserProfile = () => {
  const user = useUser();
  const [open, setOpen] = useAtom(userDropDownOpen);

  if (!user) {
    return (
      <Link
        onClick={() => setOpen}
        href={"/auth/login"}
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
            user?.user_metadata.picture ||
            "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          unoptimized
          alt="user profile picture"
          className="h-10 w-10 cursor-pointer rounded-full object-cover"
        />
      </PopoverTrigger>
      <PopoverContent className="z-50 flex w-fit flex-col gap-2">
        <Link
          onClick={() => setOpen(false)}
          href={`/${user?.id}`}
          className="flex flex-row gap-1"
        >
          <UserCircle2 /> Profile
        </Link>
        <CreateRecipeTrigger
          props={{ unstyled: true }}
          className="inline-flex dark:text-white"
        />
        {/* <Link
          onClick={() => setOpen(false)}
          href={`/${user?.id}/bookmarks`}
          className="flex flex-row gap-1"
        >
          {" "}
          <Bookmark />
          Bookmarks
        </Link> */}
        <Link
          onClick={() => setOpen(false)}
          href={`/${user?.id}/drafts`}
          className="flex flex-row gap-1"
        >
          <ScrollText /> Drafts
        </Link>
        <FeedbackDialog
          props={{ unstyled: true }}
          className="inline-flex dark:text-white"
        />
        <Link
          onClick={() => setOpen(false)}
          href={`/${user?.id}/settings?activeLink=profile`}
          className="flex flex-row gap-1"
        >
          {" "}
          <Settings />
          Settings
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/auth/signout"}
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
