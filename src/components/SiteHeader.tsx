import Link from "next/link";
import { ui } from "@content/interface";
import { routes, type RouteKey } from "@content/routes";
import { CopyText } from "./CopyText";
import { Wordmark } from "./Wordmark";

const primary = routes.filter((r) => r.navLabel && r.key !== "forTravelAdvisors");
const advisors = routes.find((r) => r.key === "forTravelAdvisors")!;

function NavLink({ href, current, children }: { href: string; current: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className="no-underline hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2"
    >
      {children}
    </Link>
  );
}

/** Skip link, wordmark at inline-start, navigation at inline-end. Not sticky. */
export function SiteHeader({ current }: { current?: RouteKey }) {
  return (
    <>
      <a href="#main" className="skip-link">
        <CopyText copy={ui.skipLink} />
      </a>
      <header className="mx-auto flex max-w-(--content-max) items-baseline justify-between gap-6 px-(--page-margin) pt-7 pb-5">
        <Link href="/" className="no-underline">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-baseline gap-6 font-gothic text-label desktop:flex">
          <ul className="flex gap-6">
            {primary.map((r) => (
              <li key={r.key}>
                <NavLink href={r.path} current={current === r.key}>
                  <CopyText copy={r.navLabel!} />
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Advisors are the primary audience: same weight, set apart by space and a rule. */}
          <span className="border-s border-hairline ps-6">
            <NavLink href={advisors.path} current={current === "forTravelAdvisors"}>
              <CopyText copy={advisors.navLabel!} />
            </NavLink>
          </span>
        </nav>

        <details className="relative font-gothic text-label desktop:hidden">
          <summary className="cursor-pointer list-none underline underline-offset-[0.22em] [&::-webkit-details-marker]:hidden">
            <CopyText copy={ui.menu} />
          </summary>
          <nav aria-label="Main" className="absolute end-0 z-10 mt-3 min-w-60 rounded-(--radius-control) bg-plate px-5 py-4 ring-1 ring-hairline">
            <ul className="flex flex-col gap-3">
              {[...primary, advisors].map((r) => (
                <li key={r.key}>
                  <NavLink href={r.path} current={current === r.key}>
                    <CopyText copy={r.navLabel!} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </header>
    </>
  );
}
