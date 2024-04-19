import { getUser } from "@/lib/utils/getUser";
import Link from "next/link";

export default async function NotFoundUser() {
  const session = await getUser();

  return (
    <>
      <h1>You can't access this page </h1>
      <Link href={`/${session?.user.id}/settings?activeLink=profile`}>
        View your settings
      </Link>
    </>
  );
}
