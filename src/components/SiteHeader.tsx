import { getLocale } from "@/lib/locale";
import Link from "next/link";
import { ui } from "@content/interface";
import { mainNav } from "@content/navigation";
import { routeFor, type RouteKey, localePath } from "@content/routes";
import type { ReactNode } from "react";
import { CopyText } from "./CopyText";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavGroup } from "./NavGroup";
import { NavLink } from "./NavLink";
import { Wordmark } from "./Wordmark";

const linkClass = "no-underline hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2";
const ctaClass =
  "inline-flex min-h-11 items-center rounded-(--radius-control) px-4 no-underline ring-1 ring-ink transition-colors hover:bg-ink hover:text-plate aria-[current=page]:bg-ink aria-[current=page]:text-plate";

const utilityClass = `${linkClass} text-small text-ink-soft hover:text-ink`;

const label = (key: RouteKey): ReactNode => <CopyText copy={routeFor(key).navLabel!} />;

/** Skip link, wordmark at inline-start, navigation at inline-end (docs/CONTENT.md §2). Not sticky. */
export async function SiteHeader() {
  const locale = await getLocale();
  return (
    <>
      <a href="#main" className="skip-link">
        <CopyText copy={ui.skipLink} />
      </a>
      <header className="mx-auto flex max-w-(--content-max) items-center justify-between gap-6 px-(--page-margin) pt-6 pb-5">
        <Link href={localePath("home", locale)} className="tap no-underline">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden font-gothic text-label desktop:block">
          <ul className="flex items-center gap-8">
            {mainNav.filter((e) => e.kind !== "cta").map((entry, i) => (
              <li key={i} className={entry.kind === "utility" ? "ps-4" : undefined}>
                {entry.kind === "group" ? (
                  <NavGroup
                    label={<CopyText copy={entry.label} />}
                    items={entry.items.map((item) => ({
                      href: localePath(item.route, locale),
                      label: label(item.route),
                      description: <CopyText copy={item.description} />,
                    }))}
                  />
                ) : (
                  <NavLink
                    href={localePath(entry.route, locale)}
                    className={entry.kind === "utility" ? utilityClass : linkClass}
                  >
                    {entry.kind === "utility" ? <CopyText copy={entry.label} /> : label(entry.route)}
                  </NavLink>
                )}
              </li>
            ))}
            <li>
              <LanguageSwitch />
            </li>
            {mainNav
              .filter((e) => e.kind === "cta")
              .map((entry) => (
                <li key={entry.route}>
                  <NavLink href={localePath(entry.route, locale)} className={ctaClass}>
                    {label(entry.route)}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>

        {/* Mobile: the globe sits in the bar beside Menu, never nested inside it. */}
        <div className="flex items-center gap-3 desktop:hidden">
          <LanguageSwitch />
        <details className="relative font-gothic text-label">
          <summary className="flex min-h-11 cursor-pointer list-none items-center underline underline-offset-[0.22em] [&::-webkit-details-marker]:hidden">
            <CopyText copy={ui.menu} />
          </summary>
          <nav aria-label="Main" className="absolute end-0 z-20 mt-3 min-w-64 rounded-(--radius-control) bg-plate px-5 py-4 ring-1 ring-hairline">
            <ul className="flex flex-col">
              {mainNav.map((entry, i) => (
                <li key={i}>
                  {entry.kind === "group" ? (
                    <>
                      <span className="flex min-h-11 items-center text-ink-soft">
                        <CopyText copy={entry.label} />
                      </span>
                      <ul className="flex flex-col ps-4">
                        {entry.items.map(({ route: key }) => (
                          <li key={key}>
                            <NavLink href={localePath(key, locale)} className={`${linkClass} flex min-h-11 items-center`}>
                              {label(key)}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink
                      href={localePath(entry.route, locale)}
                      className={entry.kind === "cta" ? `${ctaClass} mt-2` : `${entry.kind === "utility" ? utilityClass : linkClass} flex min-h-11 items-center`}
                    >
                      {entry.kind === "utility" ? <CopyText copy={entry.label} /> : label(entry.route)}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </details>
        </div>
      </header>
    </>
  );
}
