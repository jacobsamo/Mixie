import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="m-auto">
      <h2>Could not find the Recipe you were looking for</h2>
      <p>Either wrong ID or the recipes doesn&apos;t exist</p>
      <p className="text-[#188FA7] underline underline-offset-2">
        View <Link href="/recipes">all recipes</Link>
      </p>
    </div>
  );
}
