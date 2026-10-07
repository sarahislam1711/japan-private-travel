import Link from "next/link";
import type { ReactNode } from "react";
import { ui } from "@content/interface";
import { mainNav } from "@content/navigation";
import { about } from "@content/pages/about";
import { localePath, routeFor, type RouteKey } from "@content/routes";
import type { Copy } from "@content/schema";
import { site } from "@content/site";
import { getLocale } from "@/lib/locale";
import { CopyText } from "./CopyText";
import { Wordmark } from "./Wordmark";

const label = (text: string) => {
  const row = about.credentials.rows.find((r) => r.label.body[0] === text);
  if (!row) throw new Error(`No credentials label "${text}"`);
  return <CopyText copy={row.label} />;
};

const trips = mainNav.find((e) => e.kind === "group");

/** The page links in three labelled columns. */
const columns: { heading: Copy; links: RouteKey[] }[] = [
  { heading: trips && trips.kind === "group" ? trips.label : site.brand.name, links: trips && trips.kind === "group" ? trips.items.map((i) => i.route) : [] },
  { heading: site.brand.name, links: ["familyServices", "experiences", "about"] },
  { heading: ui.footer.talkToUs, links: ["contact", "forTravelAdvisors"] },
];

/** One legal fact, set inline: "Label: value". */
function Fact({ name, children }: { name: ReactNode; children: ReactNode }) {
  return (
    <span className="inline">
      <span className="text-ink-soft">{name}:</span> <span className="text-ink">{children}</span>
    </span>
  );
}

/**
 * A quiet sign-off on mist, apart from the page's pine close. Above: the
 * brand and the page links in one row.
 * Below: the legal block required on every page (COMPLIANCE C1, C2), set as a
 * few lines of small print rather than a table.
 */
export async function SiteFooter() {
  const locale = await getLocale();
  const facts: { key: string; name: ReactNode; value: ReactNode }[] = [
    {
      key: "entity",
      name: label("Registered entity"),
      value: (
        <>
          <CopyText copy={site.entity.nameEn} /> (<CopyText copy={site.entity.nameJa} />)
        </>
      ),
    },
    { key: "registration", name: label("Registration"), value: <CopyText copy={site.registration.lineJa} /> },
    { key: "tokyo", name: label("Tokyo office"), value: <CopyText copy={site.entity.address} /> },
    { key: "osaka", name: label("Osaka office"), value: <CopyText copy={site.entity.osakaAddress} /> },
    { key: "mgr-tokyo", name: label("Travel services manager, Tokyo"), value: <CopyText copy={site.managers.tokyo} /> },
    { key: "mgr-osaka", name: label("Travel services manager, Osaka"), value: <CopyText copy={site.managers.osaka} /> },
    { key: "memberships", name: label("Memberships"), value: site.memberships.map((m, i) => <CopyText key={i} copy={m} />) },
  ];

  return (
    <footer className="bg-mist text-ink">
      <div className="mx-auto max-w-(--content-max) px-(--page-margin) pt-14 pb-10">
        <div className="flex flex-col gap-8 desktop:flex-row desktop:items-start desktop:justify-between">
          <div className="max-w-[18rem] shrink-0">
            <Wordmark stacked />
            <p className="mt-3 font-gothic text-small text-ink-soft">
              <CopyText copy={site.tradeNameLine} />
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-6 tablet:grid-cols-3 desktop:gap-x-16">
            {columns.map((col, c) => (
              <div key={c}>
                <p className="font-gothic text-small text-ink-soft">
                  <CopyText copy={col.heading} />
                </p>
                <ul className="mt-1 font-gothic text-label">
                  {col.links.map((key) => (
                    <li key={key}>
                      <Link href={localePath(key, locale)} className="flex min-h-10 items-center">
                        <CopyText copy={routeFor(key).navLabel!} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink/15 pt-6 desktop:flex-row desktop:items-start desktop:justify-between desktop:gap-12">
          <p className="max-w-[62rem] font-gothic text-small leading-[1.8]">
            {facts.map((f, i) => (
              <span key={f.key}>
                <Fact name={f.name}>{f.value}</Fact>
                {/* The dot stays with the fact before it, so a line never starts with a separator. */}
                {i < facts.length - 1 ? (
                  <>
                    <span aria-hidden className="text-ink-soft">{"\u00a0\u00a0·"}</span>{" "}
                  </>
                ) : null}
              </span>
            ))}
          </p>
          <ul className="flex shrink-0 gap-x-6 font-gothic text-small desktop:-mt-2.5">
            <li>
              <Link href={localePath("privacy", locale)} className="flex min-h-11 items-center">
                <CopyText copy={ui.footer.privacy} />
              </Link>
            </li>
            <li>
              <Link href={localePath("terms", locale)} className="flex min-h-11 items-center">
                <CopyText copy={ui.footer.terms} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
