import Link from "next/link";
import React from "react";

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function LegalPage() {
  // TODO: add all links to legal document pages here
  // inspiration: https://vercel.com/legal
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-2 sm:flex-row">
      <div>
        <h1 className="text-4xl font-bold">Legal</h1>
        <p>Explore Mixie&apos;s Legal documents and Policies</p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Link
          href="/legal/privacy"
          className="h-fit w-full rounded-md border bg-grey p-2"
        >
          <h2>Privacy Policy</h2>
          <p className="text-step--4 font-light">
            Last Updated: {formatDate("2024-08-12")}
          </p>
        </Link>
        <Link
          href="/legal/terms"
          className="h-fit w-full rounded-md border bg-grey p-2"
        >
          <h2>Terms of Service</h2>
          <p className="text-step--4 font-light">
            Last Updated: {formatDate("2024-08-12")}
          </p>
        </Link>
      </div>
    </div>
  );
}
