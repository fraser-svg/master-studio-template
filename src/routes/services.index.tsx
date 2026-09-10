import { createFileRoute, Link } from "@tanstack/react-router";
import { site, services } from "@/lib/site";
import {
  Section,
  SectionHeading,
  Eyebrow,
  CallButton,
  QuoteButton,
  CardArrow,
} from "@/components/site";
import { BreadcrumbJsonLd, Photo, FinalCTA } from "@/components/sections";
import { demoText } from "../lib/demo";

export const Route = createFileRoute("/services/")({
  head: () => ({
    title: `Our Services | ${site.trade} in ${site.mainTown} | ${site.businessName}`,
    meta: [
      {
        name: "description",
        content: `Browse all ${site.trade} services from ${site.businessName} — repairs, installations, and emergency callouts across ${site.serviceArea}.`,
      },
      {
        property: "og:title",
        content: `Our Services | ${site.businessName}`,
      },
      {
        property: "og:description",
        content: `All ${site.trade} services we offer in ${site.mainTown} and nearby.`,
      },
    ],
  }),
  component: ServicesHub,
});

const groups = [
  {
    name: "Domestic",
    slugs: [
      demoText("{{ custom_values.service_1_slug }}"),
      demoText("{{ custom_values.service_3_slug }}"),
    ],
  },
  {
    name: "Installation",
    slugs: [
      demoText("{{ custom_values.service_2_slug }}"),
      demoText("{{ custom_values.service_5_slug }}"),
    ],
  },
  {
    name: "Emergency",
    slugs: [
      demoText("{{ custom_values.service_4_slug }}"),
      demoText("{{ custom_values.service_6_slug }}"),
    ],
  },
];

function ServicesHub() {
  return (
    <>
      <Section className="border-b border-border bg-background">
        <Eyebrow>Services Hub</Eyebrow>
        <SectionHeading>
          {site.trade} services in {site.mainTown}
        </SectionHeading>
        <p className="mt-5 max-w-2xl text-step-0 leading-relaxed text-muted-foreground">
          We carry out the {site.trade.toLowerCase()} jobs below across {site.serviceArea}. Each
          service has its own page with what is included, rough cost ranges, and the signs you need
          it — so you know exactly what to expect before calling.
        </p>

        {/* 3-column editorial cards grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Link
              key={s.slug}
              to="/services/$service"
              params={{ service: s.slug }}
              className="group flex flex-col justify-between rounded-sm border border-border bg-card p-5 transition-all hover:border-primary"
            >
              <div>
                <Photo
                  label={`${s.name} service`}
                  ratio="aspect-[16/10]"
                  tag={`0${idx + 1}`}
                  index={idx}
                />
                <h2 className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-foreground group-hover:text-primary">
                  {s.name}
                </h2>
                <p className="mt-2 text-step-0 text-muted-foreground line-clamp-2">{s.short}</p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                <span className="text-step--1 font-semibold text-muted-foreground">
                  Typical: <strong className="text-foreground">{s.priceRange}</strong>
                </span>
                <CardArrow />
              </div>
            </Link>
          ))}
        </div>

        {/* Small CTA panel */}
        <div className="mt-14 rounded-sm border border-border bg-secondary p-7 sm:p-8">
          <div className="max-w-xl">
            <p className="text-step--1 font-bold uppercase tracking-widest text-primary">
              Need advice?
            </p>
            <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground sm:text-2xl">
              Not sure which service you need?
            </h2>
            <p className="mt-3 text-step-0 leading-relaxed text-muted-foreground">
              Call {site.phone}. We'll ask a couple of quick questions and tell you honestly whether
              it's a quick repair, a full replacement, or if someone else is better suited.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <CallButton label={`Call ${site.phone}`} />
              <QuoteButton label="Request a Quote" />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
            Service categories
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {groups.map((g) => (
              <span
                key={g.name}
                className="rounded-xs border border-border bg-card px-3.5 py-1.5 text-step--1 font-semibold uppercase tracking-wider text-foreground"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <FinalCTA heading={`NEED A ${site.trade}?`} />
      <BreadcrumbJsonLd trail={["Home", "Services"]} />
    </>
  );
}
