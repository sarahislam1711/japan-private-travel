import Link from "next/link";
import { routes, type RouteKey } from "@content/routes";
import { CopyText } from "./CopyText";
import { Placeholder } from "./Placeholder";
import { Wordmark } from "./Wordmark";

const primary = routes.filter((r) => r.navLabel && r.key !== "forTravelAdvisors");
const advisors = routes.find((r) => r.key === "forTravelAdvisors")!;

function NavLinks({ current, className }: { current?: RouteKey; className: string }) {
  return (
    <ul className={className}>
      {primary.map((r) => (
        <li key={r.key}>
          <Link
            href={r.path}
            aria-current={current === r.key ? "page" : undefined}
            className="no-underline hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2"
          >
            <CopyText copy={r.navLabel!} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Wordmark at inline-start, navigation at inline-end. Not sticky. */
export function SiteHeader({ current }: { current?: RouteKey }) {
  return (
    <header className="mx-auto flex max-w-(--content-max) items-baseline justify-between gap-6 px-(--page-margin) pt-7 pb-5">
      <Link href="/" className="no-underline">
        <Wordmark />
      </Link>

      <nav aria-label="Main" className="hidden items-baseline gap-8 font-gothic text-label desktop:flex">
        <NavLinks current={current} className="flex gap-6" />
        <Link href={advisors.path} className="text-small text-ink-soft no-underline hover:underline">
          <CopyText copy={advisors.navLabel!} />
        </Link>
      </nav>

      <details className="group relative font-gothic text-label desktop:hidden">
        <summary className="cursor-pointer list-none underline underline-offset-[0.22em] [&::-webkit-details-marker]:hidden">
          <Placeholder name="MENU_LABEL" />
        </summary>
        <nav aria-label="Main" className="absolute end-0 z-10 mt-3 min-w-56 border-4 border-double border-ink bg-plate px-5 py-3">
          <NavLinks current={current} className="flex flex-col gap-2.5" />
          <Link href={advisors.path} className="mt-3 block border-t border-hairline pt-3 text-small text-ink-soft">
            <CopyText copy={advisors.navLabel!} />
          </Link>
        </nav>
      </details>
    </header>
  );
}
