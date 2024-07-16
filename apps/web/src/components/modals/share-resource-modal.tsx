"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyIcon, PrinterIcon, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/advanced-components/input";
import CopyButton from "../copy-to-clipboard";
import toast from "react-hot-toast";

interface ShareDialogProps {
  /**
   * Recipe url e.g `https://www.mixiecooking/recipes/${recipe.id}`
   */
  url: string;
  /**
   * The image url to be shared
   */
  image: string;
  /**
   * Recipe title
   */
  title: string;
  /**
   * For twitter sharing, this is the keywords at the bottom of the post
   */
  hashtags?: string;
  /**
   * For twitter sharing, this is the @
   */
  via?: string;
}

const ShareDialog = ({
  url,
  title,
  hashtags,
  image,
  via = "mixiecooking",
}: ShareDialogProps) => {
  const copy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Copied to clipboard"))
      .catch((e) => {
        console.log(e);
      });
  };

  const twitterLink = `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=${via}${
    hashtags ? `&hashtags=${hashtags}` : ""
  }`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const pinterestLink = `http://pinterest.com/pin/create/button/?url=${url}&description=${title}&media=${image}`;

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer flex-row items-center gap-1 rounded-lg bg-white px-2 dark:bg-grey">
        <Share2 /> Share
      </DialogTrigger>
      <DialogContent className="print:hidden">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share this recipes to your friends
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4 overflow-y-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/30">
            <CopyButton aria-label="Copy url" text={url} autoFocus={true} />
          </div>

          <Link
            href={facebookLink}
            target="_blank"
            aria-label="Share to Facebook"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#0866FF"
              viewBox="0 0 24 24"
              height="28"
              width="28"
            >
              <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
            </svg>
          </Link>
          <Link
            className="flex h-12 w-12  items-center justify-center rounded-full bg-secondary/30"
            target="_blank"
            aria-label="Share to Twitter"
            href={twitterLink}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="30px"
              height="30px"
              fill="#03A9F4"
              className="m-auto"
            >
              <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
            </svg>
          </Link>
          <Link
            className="flex h-12 w-12  items-center justify-center rounded-full bg-secondary/30"
            href={pinterestLink}
            target="_blank"
            aria-label="Share to Pinterest"
          >
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
              aria-label=""
              role="img"
              fill="#E60023"
              className="m-auto"
            >
              <path d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12"></path>
            </svg>
          </Link>
          {/* <Button unstyled={true} aria-label="Share to Reddit">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            />
          </Button> */}
          {/* <Button unstyled={true} aria-label="Share to Email">
            Email
          </Button> */}
          <Button
            unstyled={true}
            onClick={() => print()}
            aria-label="Print recipe"
            className="size-12 flex items-center justify-center rounded-full bg-secondary/30"
          >
            <PrinterIcon className="m-auto text-foreground" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
