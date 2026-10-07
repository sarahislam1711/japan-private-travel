import { getLocale } from "@/lib/locale";
import Link from "next/link";
import { ui } from "@content/interface";
import { mainNav } from "@content/navigation";
import { routeFor, type RouteKey, localePath } from "@content/routes";
import type { ReactNode } from "react";
import { CopyText } from "./CopyText";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { NavGroup } from "./NavGroup";
import { NavLink } from "./NavLink";
import { Wordmark } from "./Wordmark";

const linkClass = "no-underline hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2";
const ctaClass =
  "inline-flex min-h-11 items-center rounded-(--radius-control) px-4 no-underline ring-1 ring-ink transition-colors hover:bg-ink hover:text-plate aria-[current=page]:bg-ink aria-[current=page]:text-plate";

/** Mobile sheet: big serif page links, one per line. */
const sheetLinkClass =
  "flex min-h-14 items-center font-serif text-[1.875rem] leading-tight font-[360] tracking-[-0.01em] no-underline aria-[current=page]:text-pine";

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
            {mainNav.filter((e) => e.kind === "group" || e.kind === "link").map((entry, i) => (
              <li key={i}>
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
                    className={linkClass}
                  >
                    {label(entry.route)}
                  </NavLink>
                )}
              </li>
            ))}
            {/* Language, then Advisors, then Contact (Sarah, 7 Oct 2026). */}
            <li className="ps-4">
              <LanguageSwitch />
            </li>
            {mainNav.map((entry, i) =>
              entry.kind === "utility" ? (
                <li key={`u${i}`}>
                  <NavLink href={localePath(entry.route, locale)} className={utilityClass}>
                    <CopyText copy={entry.label} />
                  </NavLink>
                </li>
              ) : null,
            )}
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

        {/* Mobile: the globe sits in the bar beside Menu; the menu opens as a full-screen sheet. */}
        <div className="flex items-center gap-1 desktop:hidden">
          <LanguageSwitch />
          <MobileMenu
            openLabel={<CopyText copy={ui.menu} />}
            closeLabel={<CopyText copy={ui.close} />}
            brand={
              <Link href={localePath("home", locale)} className="tap no-underline">
                <Wordmark />
              </Link>
            }
            extra={<LanguageSwitch />}
          >
            <nav aria-label="Main" className="flex flex-1 flex-col pt-6">
              <ul className="flex flex-col gap-1">
                {mainNav.map((entry, i) =>
                  entry.kind === "group" ? (
                    <li key={i} className="pb-4">
                      <p className="pb-1 font-gothic text-small text-ink-soft">
                        <CopyText copy={entry.label} />
                      </p>
                      <ul className="flex flex-col">
                        {entry.items.map(({ route: key }) => (
                          <li key={key}>
                            <NavLink href={localePath(key, locale)} className={sheetLinkClass}>
                              {label(key)}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : entry.kind === "link" ? (
                    <li key={i}>
                      <NavLink href={localePath(entry.route, locale)} className={sheetLinkClass}>
                        {label(entry.route)}
                      </NavLink>
                    </li>
                  ) : null,
                )}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-10 font-gothic text-label">
                {mainNav.map((entry, i) =>
                  entry.kind === "utility" ? (
                    <NavLink key={i} href={localePath(entry.route, locale)} className={`${utilityClass} flex min-h-11 items-center`}>
                      <CopyText copy={entry.label} />
                    </NavLink>
                  ) : entry.kind === "cta" ? (
                    <NavLink
                      key={i}
                      href={localePath(entry.route, locale)}
                      className="flex min-h-13 items-center justify-center rounded-(--radius-control) bg-ink px-5 text-plate no-underline transition-colors hover:bg-pine hover:text-plate"
                    >
                      {label(entry.route)}
                    </NavLink>
                  ) : null,
                )}
              </div>
            </nav>
          </MobileMenu>
        </div>
      </header>
    </>
  );
}
