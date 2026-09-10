import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/lib/site";
import { Section, SectionHeading, Eyebrow } from "@/components/site";
import { BreadcrumbJsonLd } from "@/components/sections";

export const Route = createFileRoute("/terms")({
  head: () => ({
    title: `Terms & Conditions | ${site.businessName}`,
    meta: [
      {
        name: "description",
        content: `Terms and conditions for ${site.businessName}. Payment terms, quotations, callout fees, and workmanship guarantees.`,
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <Section className="border-b border-border bg-background">
        <Eyebrow>Legal</Eyebrow>
        <SectionHeading>Terms &amp; conditions</SectionHeading>
        <p className="mt-4 text-step-0 text-muted-foreground">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-10 max-w-3xl space-y-8 text-step-0 leading-relaxed text-muted-foreground">
          <div>
            <h2 className="display text-base font-bold uppercase tracking-tight text-foreground">
              Quotes &amp; Pricing
            </h2>
            <p className="mt-3">
              All quotations are agreed before any work commences. If additional faults or
              unexpected conditions are discovered during the visit, we stop and agree any revised
              scope and price before carrying on.
            </p>
          </div>

          <div>
            <h2 className="display text-base font-bold uppercase tracking-tight text-foreground">
              Callouts &amp; diagnostics
            </h2>
            <p className="mt-3">
              Standard diagnostic callouts carry a one-hour minimum charge. The rate will be
              confirmed when you speak to us prior to arrival.
            </p>
          </div>

          <div>
            <h2 className="display text-base font-bold uppercase tracking-tight text-foreground">
              Guarantees
            </h2>
            <p className="mt-3">
              Workmanship is guaranteed by {site.businessName}. Any new components or boilers fitted
              carry the relevant manufacturer warranty. Full terms are specified on your written
              invoice.
            </p>
          </div>
        </div>
      </Section>
      <BreadcrumbJsonLd trail={["Home", "Terms"]} />
    </>
  );
}
