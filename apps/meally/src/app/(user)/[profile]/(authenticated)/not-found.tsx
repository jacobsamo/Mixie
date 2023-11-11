import { getServerAuthSession } from "@server/auth";
import Link from "next/link";

export default async function NotFoundUser() {
  const session = await getServerAuthSession();

  return (
    <>
      <h1>You can't access this page </h1>
      <p>as this is someone else profile</p>
      <Link href={`/${session?.user.id}/settings?activeLink=profile`}>
        View your settings
      </Link>
    </>
  );
}
