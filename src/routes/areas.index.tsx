import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import { site, towns } from "@/lib/site";
import { Section, SectionHeading, Eyebrow, CallButton } from "@/components/site";
import { MapPlaceholder, BreadcrumbJsonLd, FinalCTA } from "@/components/sections";

export const Route = createFileRoute("/areas/")({
  head: () => ({
    title: `Areas Covered | ${site.businessName}`,
    meta: [
      {
        name: "description",
        content: `${site.businessName} covers ${site.mainTown} and the surrounding area. See the towns we serve - only where we genuinely work.`,
      },
      {
        property: "og:title",
        content: `Areas Covered | ${site.businessName}`,
      },
      {
        property: "og:description",
        content: `${site.trade} across ${site.serviceArea}.`,
      },
    ],
  }),
  component: AreasHub,
});

const smallerTowns = ["[Smaller town]", "[Smaller town]", "[Smaller town]"];

function AreasHub() {
  return (
    <>
      <Section className="border-b border-border bg-background">
        <Eyebrow>Coverage</Eyebrow>
        <SectionHeading as="h1" scale="hero">
          Areas we cover
        </SectionHeading>
        <p className="mt-5 max-w-2xl text-step-0 leading-relaxed text-muted-foreground">
          Based in {site.mainTown}, we cover {site.serviceArea}. The towns below with their own page
          have real local jobs and verified details - we only list a town here if we genuinely work
          there.
        </p>

        <div className="mt-10">
          <MapPlaceholder height="h-72 sm:h-80" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="display text-lg font-bold uppercase tracking-tight text-foreground">
              Towns with dedicated pages
            </h2>
            <p className="mt-2 text-step-0 text-muted-foreground">
              Each page contains local housing context, realistic travel times, and real job
              examples.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {towns.map((t) => (
                <Link
                  key={t.slug}
                  to="/areas/$town"
                  params={{ town: t.slug }}
                  className="group flex items-center justify-between rounded-sm border border-border bg-card p-4 hover:border-primary/40 hover:bg-surface-alt"
                >
                  <div>
                    <span className="display text-base font-bold uppercase tracking-tight text-foreground group-hover:text-primary">
                      {t.name}
                    </span>
                    <span className="mt-1 block text-step--1 text-muted-foreground">
                      {t.distance} · {t.time}
                    </span>
                  </div>
                  <MapPin className="size-5 text-primary transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="display text-lg font-bold uppercase tracking-tight text-foreground">
              Also covered nearby
            </h2>
            <p className="mt-2 text-step-0 text-muted-foreground">
              We work in smaller surrounding places too. Rather than create thin duplicate pages
              without real jobs, we list them here honestly. Call with your postcode to check
              today's availability.
            </p>
            <p className="mt-5 text-step-0 font-semibold text-foreground/85">
              {smallerTowns.join(" · ")}
            </p>

            <div className="mt-8 rounded-sm border border-border bg-secondary p-6">
              <p className="display text-step-0 font-bold uppercase tracking-tight text-foreground">
                Not sure if we cover you?
              </p>
              <p className="mt-2 text-step-0 text-muted-foreground">
                Call {site.phone} with your postcode and we'll tell you straight away.
              </p>
              <div className="mt-5">
                <CallButton label="Call us to check" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FinalCTA heading={`NEED A ${site.trade}?`} />
      <BreadcrumbJsonLd trail={["Home", "Areas"]} />
    </>
  );
}
