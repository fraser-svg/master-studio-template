import { createFileRoute } from "@tanstack/react-router";
import { site, faqGroups } from "@/lib/site";
import { Section, SectionHeading, Eyebrow, CallButton, QuoteButton } from "@/components/site";
import { FaqList, BreadcrumbJsonLd, JsonLd, FinalCTA } from "@/components/sections";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    title: `FAQs | ${site.businessName}`,
    meta: [
      {
        name: "description",
        content: `Frequently asked questions about our ${site.trade.toLowerCase()} work — pricing, availability, areas covered, guarantees, and emergency callouts.`,
      },
      {
        property: "og:title",
        content: `FAQs | ${site.businessName}`,
      },
      {
        property: "og:description",
        content: `Common questions about our ${site.trade.toLowerCase()} work.`,
      },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  const all = faqGroups.flatMap((g) => g.items);
  return (
    <>
      <Section className="border-b border-border bg-background">
        <Eyebrow>Knowledge base</Eyebrow>
        <SectionHeading>Frequently asked questions</SectionHeading>
        <p className="mt-5 max-w-2xl text-step-0 leading-relaxed text-muted-foreground">
          Straight answers about our service, pricing structure, arrival windows, and guarantees. If
          your question isn't covered, call {site.phone} and we'll answer it directly.
        </p>

        {/* Grouped accordion FAQs */}
        <div className="mt-12 space-y-8">
          {faqGroups.map((g) => (
            <div
              key={g.group}
              className="rounded-sm border border-border bg-secondary/30 p-6 sm:p-8"
            >
              <h2 className="font-display text-base font-bold uppercase tracking-tight text-foreground">
                {g.group}
              </h2>
              <div className="mt-6">
                <FaqList items={g.items} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <FinalCTA heading={`STILL HAVE A QUESTION FOR A ${site.tradeSingular.toUpperCase()}?`} />
      <BreadcrumbJsonLd trail={["Home", "FAQs"]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: all.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
