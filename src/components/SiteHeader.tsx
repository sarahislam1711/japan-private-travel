import Link from "next/link";
import { ui } from "@content/interface";
import { mainNav } from "@content/navigation";
import { routeFor, type RouteKey } from "@content/routes";
import type { ReactNode } from "react";
import { CopyText } from "./CopyText";
import { NavGroup } from "./NavGroup";
import { NavLink } from "./NavLink";
import { Wordmark } from "./Wordmark";

const linkClass = "no-underline hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2";
const ctaClass =
  "inline-block rounded-(--radius-control) px-4 py-2 no-underline ring-1 ring-ink transition-colors hover:bg-ink hover:text-plate aria-[current=page]:bg-ink aria-[current=page]:text-plate";

const utilityClass = `${linkClass} text-small text-ink-soft hover:text-ink`;

const label = (key: RouteKey): ReactNode => <CopyText copy={routeFor(key).navLabel!} />;

/** Skip link, wordmark at inline-start, navigation at inline-end (docs/CONTENT.md §2). Not sticky. */
export function SiteHeader() {
  return (
    <>
      <a href="#main" className="skip-link">
        <CopyText copy={ui.skipLink} />
      </a>
      <header className="mx-auto flex max-w-(--content-max) items-center justify-between gap-6 px-(--page-margin) pt-6 pb-5">
        <Link href="/" className="no-underline">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden font-gothic text-label desktop:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((entry, i) => (
              <li key={i} className={entry.kind === "utility" ? "border-s border-hairline ps-8" : undefined}>
                {entry.kind === "group" ? (
                  <NavGroup
                    label={<CopyText copy={entry.label} />}
                    items={entry.items.map((item) => ({
                      href: routeFor(item.route).path,
                      label: label(item.route),
                      description: <CopyText copy={item.description} />,
                    }))}
                  />
                ) : (
                  <NavLink
                    href={routeFor(entry.route).path}
                    className={entry.kind === "cta" ? ctaClass : entry.kind === "utility" ? utilityClass : linkClass}
                  >
                    {entry.kind === "utility" ? <CopyText copy={entry.label} /> : label(entry.route)}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <details className="relative font-gothic text-label desktop:hidden">
          <summary className="cursor-pointer list-none underline underline-offset-[0.22em] [&::-webkit-details-marker]:hidden">
            <CopyText copy={ui.menu} />
          </summary>
          <nav aria-label="Main" className="absolute end-0 z-20 mt-3 min-w-64 rounded-(--radius-control) bg-plate px-5 py-4 ring-1 ring-hairline">
            <ul className="flex flex-col gap-3">
              {mainNav.map((entry, i) => (
                <li key={i}>
                  {entry.kind === "group" ? (
                    <>
                      <span className="text-ink-soft">
                        <CopyText copy={entry.label} />
                      </span>
                      <ul className="mt-2 flex flex-col gap-2 border-s border-hairline ps-4">
                        {entry.items.map(({ route: key }) => (
                          <li key={key}>
                            <NavLink href={routeFor(key).path} className={linkClass}>
                              {label(key)}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink
                      href={routeFor(entry.route).path}
                      className={entry.kind === "cta" ? `${ctaClass} mt-1` : entry.kind === "utility" ? utilityClass : linkClass}
                    >
                      {entry.kind === "utility" ? <CopyText copy={entry.label} /> : label(entry.route)}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </header>
    </>
  );
}
