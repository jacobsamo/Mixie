import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="h-full w-full">
      <h2>Could not find the Recipe you were looking for</h2>
      <p>
        View <Link href="/recipes">all recipes</Link>
      </p>
    </main>
  );
}
