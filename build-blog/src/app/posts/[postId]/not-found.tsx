import Link from "next/link";

export default function notFound() {
  return (
    <main className="w-[42rem] m-auto flex flex-col justify-center items-center gap-4">
      <p className="text-primary-text bg-card rounded-lg p-4">
        could not find blog . . .
      </p>
      <Link
        href="/posts"
        className="bg-cta hover:bg-cta-active p-2 py-1 rounded text-secondary-text"
      >
        return
      </Link>
    </main>
  );
}
