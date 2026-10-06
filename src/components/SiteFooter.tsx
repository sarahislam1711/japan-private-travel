import Link from "next/link";
import { about } from "@content/pages/about";
import { routeFor } from "@content/routes";
import { site } from "@content/site";
import { CopyText } from "./CopyText";
import { FieldTable } from "./FieldTable";
import { Placeholder } from "./Placeholder";

const label = (text: string) => {
  const row = about.credentials.rows.find((r) => r.label.body[0] === text);
  if (!row) throw new Error(`No credentials label "${text}"`);
  return <CopyText copy={row.label} />;
};

/**
 * The legal block on every route (COMPLIANCE C1, C2), set as the plate in
 * reverse: paper rules on the ink ground.
 */
export function SiteFooter() {
  const advisors = routeFor("forTravelAdvisors");
  const contact = routeFor("contact");
  return (
    <footer className="mt-36 bg-ink text-plate [--color-hairline:#4a4f57] [--color-ink-soft:#b9bec4] [&_:focus-visible]:outline-plate">
      <div className="mx-auto grid max-w-(--content-max) gap-x-6 gap-y-10 px-(--page-margin) py-16 desktop:grid-cols-12">
        <p className="font-serif text-lede desktop:col-span-4 desktop:col-start-2">
          <CopyText copy={site.tradeNameLine} />
        </p>
        <FieldTable
          variant="bare"
          className="desktop:col-span-6 desktop:col-start-6 [&_dd]:text-plate"
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
            {
              key: "memberships",
              label: label("Memberships"),
              value: site.memberships.map((m, i) => <CopyText key={i} copy={m} />),
            },
          ]}
        />
        <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-4 font-gothic text-small desktop:col-span-10 desktop:col-start-2">
          <li>
            <Link href={advisors.path}>
              <CopyText copy={advisors.navLabel!} />
            </Link>
          </li>
          <li>
            <Link href="/privacy">
              <Placeholder name="PRIVACY_TITLE" />
            </Link>
          </li>
          <li>
            <Link href="/terms">
              <Placeholder name="TERMS_TITLE" />
            </Link>
          </li>
          <li>
            <Link href={contact.path}>
              <CopyText copy={contact.navLabel!} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
