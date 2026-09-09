import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/lib/site";
import { Section, SectionHeading, Eyebrow } from "@/components/site";
import { BreadcrumbJsonLd } from "@/components/sections";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    title: `Privacy Policy | ${site.businessName}`,
    meta: [
      {
        name: "description",
        content: `Privacy policy for ${site.businessName}. How we handle your contact details when you call or request a quote.`,
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <Section className="border-b border-border bg-background">
        <Eyebrow>Legal</Eyebrow>
        <SectionHeading>Privacy policy</SectionHeading>
        <p className="mt-4 text-step-0 text-muted-foreground">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-10 max-w-3xl space-y-8 text-step-0 leading-relaxed text-muted-foreground">
          <p>
            {site.businessName} ("we", "us") values your privacy. This policy explains what
            information we collect when you use this website, call our phone number, or submit a
            quote request.
          </p>

          <div>
            <h2 className="font-display text-base font-bold uppercase tracking-tight text-foreground">
              Information we collect
            </h2>
            <p className="mt-3">
              When you contact us by phone, email, or quote form, we collect your name, phone
              number, postcode or address, and details about the requested trade work. We use this
              exclusively to quote, schedule, and carry out work.
            </p>
          </div>

          <div>
            <h2 className="font-display text-base font-bold uppercase tracking-tight text-foreground">
              How we use your details
            </h2>
            <p className="mt-3">
              We never sell or rent your personal information to third-party marketers. Your details
              are used strictly for customer communication, providing quotes, managing job visits,
              and issuing invoices and guarantees.
            </p>
          </div>

          <div>
            <h2 className="font-display text-base font-bold uppercase tracking-tight text-foreground">
              Contacting us
            </h2>
            <p className="mt-3">
              If you have any questions about how your data is handled, contact {site.businessName}{" "}
              at {site.email} or by phone at {site.phone}.
            </p>
          </div>
        </div>
      </Section>
      <BreadcrumbJsonLd trail={["Home", "Privacy Policy"]} />
    </>
  );
}
