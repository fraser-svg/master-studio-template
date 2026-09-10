import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, MapPin, Users, Award, Check } from "lucide-react";
import { site, towns } from "@/lib/site";
import { Section, SectionHeading, Eyebrow, CallButton, QuoteButton } from "@/components/site";
import { Photo, JsonLd, BreadcrumbJsonLd, FinalCTA } from "@/components/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    title: `About ${site.businessName} | Local ${site.trade} in ${site.mainTown}`,
    meta: [
      {
        name: "description",
        content: `About ${site.businessName} - ${site.yearsExperience}+ years of ${site.trade} in ${site.mainTown}. ${site.accreditation}, fully insured, and trusted by local customers.`,
      },
      {
        property: "og:title",
        content: `About ${site.businessName}`,
      },
      {
        property: "og:description",
        content: `Local ${site.trade} serving ${site.mainTown} and nearby.`,
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section className="border-b border-border bg-background">
        <Eyebrow>About {site.businessName}</Eyebrow>
        <SectionHeading as="h1" scale="hero">
          Practical, honest trade work in {site.mainTown}
        </SectionHeading>
        <p className="mt-5 max-w-2xl text-step-0 leading-relaxed text-muted-foreground">
          We're an established {site.trade.toLowerCase()} business that has spent{" "}
          {site.yearsExperience}+ years repairing, installing, and maintaining systems across{" "}
          {site.mainTown} and nearby areas. The reason customers call us back is simple: we give
          straight answers, confirm quotes in writing, turn up on time, and leave homes clean.
        </p>

        {/* Editorial team & van photos */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Photo label="Van on a local street" index={0} ratio="aspect-[4/3]" tag="Field Van" />
          <Photo label="Technician at work" index={1} ratio="aspect-[4/3]" tag="On Site" />
          <Photo label="Tools & diagnostic kit" index={2} ratio="aspect-[4/3]" tag="Kit" />
          <Photo label="Customer handover" index={3} ratio="aspect-[4/3]" tag="Completion" />
        </div>
      </Section>

      {/* Qualifications & Insurance */}
      <section className="border-b border-border bg-surface-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Credentials</Eyebrow>
          <SectionHeading>Licences, insurance &amp; standards</SectionHeading>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: site.accreditation, d: `Licence ${site.licenceNumber}` },
              {
                t: "Fully insured",
                d: "Public liability coverage for domestic and light commercial",
              },
              {
                t: `${site.yearsExperience}+ years`,
                d: `Trading continuously in ${site.mainTown}`,
              },
              { t: "Guaranteed workmanship", d: "Clear written guarantee on all repairs and fits" },
              { t: "Manufacturer warranties", d: "Registered warranty on newly installed units" },
              { t: "Vetted team", d: "Respectful in your home, clean work practices" },
            ].map((c, i) => (
              <div key={c.t} className="rounded-sm border border-border bg-card p-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="display text-step--1 font-bold text-primary">[0{i + 1}]</span>
                  <Check className="size-4 text-mark" />
                </div>
                <h3 className="mt-4 display text-base font-bold uppercase tracking-tight text-foreground">
                  {c.t}
                </h3>
                <p className="mt-2 text-step-0 text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <Eyebrow>Clientele</Eyebrow>
              <SectionHeading>Who we help</SectionHeading>
              <p className="mt-5 text-step-0 leading-relaxed text-muted-foreground">
                Most of our work is for private homeowners and landlords across {site.serviceArea}.
                We also take on small commercial premises (offices, shops, rental units). If a job
                is outside our expertise or better handled by a different specialist, we will tell
                you straight and point you to a reputable alternative.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <CallButton label="Call Now" />
                <QuoteButton label="Request a Quote" />
              </div>
            </div>

            <Photo
              label={`Team speaking with client in ${site.mainTown}`}
              ratio="aspect-[16/10]"
              tag="Local Trust"
            />
          </div>
        </div>
      </section>

      <FinalCTA heading={`SPEAK WITH ${site.businessName.toUpperCase()} TODAY`} />
      <BreadcrumbJsonLd trail={["Home", "About"]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${site.businessName}`,
        }}
      />
    </>
  );
}
