import Link from "next/link";
import { storeKind } from "@/lib/enquiries/store";
import { signOut } from "./actions";

/** The admin area's top bar: name, where plans are stored, export and sign-out. */
export function AdminBar() {
  return (
    <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 pt-6 pb-4">
      <Link href="/admin" className="no-underline">
        <span className="font-serif text-[1.5rem]">
          <span className="text-pine">Hala</span>Japan
        </span>
        <span className="ms-3 text-small text-ink-soft">Trip plans</span>
      </Link>
      <div className="flex items-center gap-3 text-small">
        <span className="rounded-full bg-plate px-3 py-1 text-ink-soft">{storeKind() === "supabase" ? "Database: Supabase" : "Database: local file (development)"}</span>
        <a href="/admin/export" className="tap text-ink">
          Export CSV
        </a>
        <form action={signOut}>
          <button type="submit" className="tap cursor-pointer text-ink-soft underline hover:text-pine">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
