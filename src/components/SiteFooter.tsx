import Link from "next/link";
import { ui } from "@content/interface";
import { mainNav } from "@content/navigation";
import { about } from "@content/pages/about";
import { routeFor, type RouteKey } from "@content/routes";
import { site } from "@content/site";
import { CopyText } from "./CopyText";
import { FieldTable } from "./FieldTable";
import { Wordmark } from "./Wordmark";

const label = (text: string) => {
  const row = about.credentials.rows.find((r) => r.label.body[0] === text);
  if (!row) throw new Error(`No credentials label "${text}"`);
  return <CopyText copy={row.label} />;
};

const trips = mainNav.find((e) => e.kind === "group");
const companyRoutes: RouteKey[] = ["familyServices", "experiences", "about", "forTravelAdvisors", "contact"];

function Column({ heading, children }: { heading: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-gothic text-label text-ink-soft">{heading}</p>
      <ul className="mt-4 flex flex-col gap-2.5 font-gothic text-label">{children}</ul>
    </div>
  );
}

/**
 * Every page ends on pine: the site map in columns, then the legal block
 * (COMPLIANCE C1, C2) with the brand's trading-name line.
 */
export function SiteFooter() {
  return (
    <footer className="on-pine">
      <div className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-14 px-(--page-margin) pt-16 pb-16">
        <div className="col-span-12 desktop:col-span-4">
          <Wordmark />
          <p className="mt-5 max-w-[22rem] font-serif text-field text-ink-soft">
            <CopyText copy={site.tradeNameLine} />
          </p>
        </div>
        <nav aria-label="Footer" className="col-span-12 grid grid-cols-2 gap-10 tablet:grid-cols-3 desktop:col-span-7 desktop:col-start-6">
          {trips && trips.kind === "group" ? (
            <Column heading={<CopyText copy={trips.label} />}>
              {trips.items.map(({ route }) => (
                <li key={route}>
                  <Link href={routeFor(route).path}>
                    <CopyText copy={routeFor(route).navLabel!} />
                  </Link>
                </li>
              ))}
            </Column>
          ) : null}
          <Column heading={<CopyText copy={site.brand.name} />}>
            {companyRoutes.map((key) => (
              <li key={key}>
                <Link href={routeFor(key).path}>
                  <CopyText copy={routeFor(key).navLabel!} />
                </Link>
              </li>
            ))}
          </Column>
          <Column heading={<CopyText copy={ui.footer.legal} />}>
            <li>
              <Link href="/privacy">
                <CopyText copy={ui.footer.privacy} />
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <CopyText copy={ui.footer.terms} />
              </Link>
            </li>
          </Column>
        </nav>
        <FieldTable
          variant="bare"
          className="col-span-12 pt-6 desktop:col-span-7 desktop:col-start-6"
          fields={[
            {
              key: "entity",
              label: label("Registered entity"),
              value: (
                <>
                  <CopyText copy={site.entity.nameEn} /> (<CopyText copy={site.entity.nameJa} />)
                </>
              ),
            },
            { key: "registration", label: label("Registration"), value: <CopyText copy={site.registration.lineJa} /> },
            { key: "tokyo", label: label("Tokyo office"), value: <CopyText copy={site.entity.address} /> },
            { key: "osaka", label: label("Osaka office"), value: <CopyText copy={site.entity.osakaAddress} /> },
            { key: "mgr-tokyo", label: label("Travel services manager, Tokyo"), value: <CopyText copy={site.managers.tokyo} /> },
            { key: "mgr-osaka", label: label("Travel services manager, Osaka"), value: <CopyText copy={site.managers.osaka} /> },
            { key: "memberships", label: label("Memberships"), value: site.memberships.map((m, i) => <CopyText key={i} copy={m} />) },
          ]}
        />
      </div>
    </footer>
  );
}
