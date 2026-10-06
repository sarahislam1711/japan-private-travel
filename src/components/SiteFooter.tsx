import Link from "next/link";
import { ui } from "@content/interface";
import { about } from "@content/pages/about";
import { routeFor } from "@content/routes";
import { site } from "@content/site";
import { CopyText } from "./CopyText";
import { FieldTable } from "./FieldTable";

const label = (text: string) => {
  const row = about.credentials.rows.find((r) => r.label.body[0] === text);
  if (!row) throw new Error(`No credentials label "${text}"`);
  return <CopyText copy={row.label} />;
};

/**
 * The legal block on every route (COMPLIANCE C1, C2): the registration plate
 * on a tinted section, with the brand's trade-name line beneath the facts.
 */
export function SiteFooter() {
  const advisors = routeFor("forTravelAdvisors");
  const contact = routeFor("contact");
  return (
    <footer className="bg-mist">
      <div className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-8 px-(--page-margin) py-16">
        <FieldTable
          className="col-span-12 desktop:col-span-6 desktop:col-start-7 desktop:row-start-1"
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
        <p className="col-span-12 self-start pt-3 font-serif text-lede desktop:col-span-4 desktop:col-start-2 desktop:row-start-1">
          <CopyText copy={site.tradeNameLine} />
        </p>
        <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-5 font-gothic text-small desktop:col-span-11 desktop:col-start-2">
          <li>
            <Link href={advisors.path}>
              <CopyText copy={advisors.navLabel!} />
            </Link>
          </li>
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
