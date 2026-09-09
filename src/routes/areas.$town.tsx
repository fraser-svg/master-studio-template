import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, Home, ArrowRight } from "lucide-react";
import { site, services, towns } from "@/lib/site";
import {
  Section,
  SectionHeading,
  Eyebrow,
  CallButton,
  Breadcrumbs,
  getTown,
  nearbyTowns,
} from "@/components/site";
import {
  Photo,
  ReviewCard,
  FaqList,
  MapPlaceholder,
  FinalCTA,
  JsonLd,
  BreadcrumbJsonLd,
} from "@/components/sections";

export const Route = createFileRoute("/areas/$town")({
  head: ({ params }) => {
    const t = getTown(params.town);
    const name = t?.name ?? params.town;
    return {
      title: `${site.trade} in ${name} | ${site.businessName}`,
      meta: [
        {
          name: "description",
          content: `${site.trade} in ${name}. ${site.businessName} works locally in ${name} — realistic response times, local jobs, and an honest quote. Call ${site.phone}.`,
        },
        {
          property: "og:title",
          content: `${site.trade} in ${name} | ${site.businessName}`,
        },
        {
          property: "og:description",
          content: `Local ${site.trade} working in ${name} and nearby.`,
        },
      ],
    };
  },
  component: AreaPage,
});

function AreaPage() {
  const { town: slug } = Route.useParams();
  const t = getTown(slug);

  if (!t) {
    return (
      <Section className="py-16">
        <SectionHeading>Area not found</SectionHeading>
        <p className="mt-3 text-step--1 text-muted-foreground">
          We don't have a dedicated page for that area yet.{" "}
          <Link to="/areas" className="font-bold text-primary hover:underline">
            See all areas →
          </Link>
        </p>
      </Section>
    );
  }

  const nearby = nearbyTowns(slug, 3);
  const localJobs = services.slice(0, 4);
  const faqs = [
    {
      q: `How quickly can you get to ${t.name}?`,
      a: `From our base in ${site.mainTown}, ${t.name} is about ${t.time} away. Emergencies we aim same-day; booked work usually within 2–3 days.`,
    },
    {
      q: `Do you charge extra to come out to ${t.name}?`,
      a:
        t.slug === site.mainTown.toLowerCase()
          ? `No — you're in our home town. Standard rates apply.`
          : `Within our normal area, no. We're in ${t.name} most weeks so there's no travel surcharge.`,
    },
    {
      q: `What areas near ${t.name} do you also cover?`,
      a: `We cover ${t.name} and the surrounding villages. If you're just outside, call us with your postcode.`,
    },
    {
      q: `Do you have local reviews in ${t.name}?`,
      a: `Yes — we've carried out jobs across ${t.name}. See the review below and our reviews page for more.`,
    },
  ];

  const isHome = t.slug === site.mainTown.toLowerCase();

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Areas", to: "/areas" },
              { label: t.name },
            ]}
          />
          <Eyebrow>Local Area</Eyebrow>
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div>
              <h1 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {site.trade} in {t.name}
              </h1>
              <p className="mt-5 text-step-0 leading-relaxed text-muted-foreground">
                {isHome ? (
                  <>
                    We're based right here in {t.name} — {t.distance} is our front door. Most of our
                    work is within a ten-minute drive, so for {t.name} emergencies we're usually on
                    the doorstep quickly. No travel surcharge and no waiting on a far-off company.
                  </>
                ) : (
                  <>
                    {t.name} is about {t.distance} from our base in {site.mainTown} — roughly a{" "}
                    {t.time} drive. We cover {t.name} most weeks, so we can fit you in promptly for
                    booked jobs and same-day for genuine emergencies.
                  </>
                )}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-step-0 text-foreground/80">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Clock className="size-4 text-primary" /> ~{t.time} from base
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <MapPin className="size-4 text-primary" /> {t.distance}
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Home className="size-4 text-primary" /> In {t.name} most weeks
                </span>
              </div>

              <div className="mt-7 flex gap-2.5">
                <CallButton label="Call Now" />
              </div>
            </div>

            <Photo
              label={`${site.trade} van in ${t.name}`}
              ratio="aspect-[16/10]"
              tag="Local Area"
            />
          </div>
        </div>
      </section>

      {/* Local housing stock context */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Local housing context</Eyebrow>
              <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Working in {t.name}
              </h2>
              <div className="mt-5 space-y-4 text-step-0 leading-relaxed text-muted-foreground">
                <p>
                  {t.name} has a distinct mix of housing stock that shapes the jobs we see. Older
                  properties often require pipe upgrades, boiler modernization, and non-invasive
                  leak detection; newer builds tend to see issues with system pressure and drainage.
                </p>
                <p>
                  Street parking and access vary across {t.name}, so we always call ahead on the
                  morning of the visit. We carry common replacement parts on the van to resolve most
                  repairs in a single visit.
                </p>
              </div>
            </div>
            <MapPlaceholder height="h-full min-h-[18rem]" />
          </div>
        </div>
      </section>

      {/* Services genuinely available */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Available services</Eyebrow>
          <SectionHeading>Services available in {t.name}</SectionHeading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {localJobs.map((s) => (
              <Link
                key={s.slug}
                to="/services/$service"
                params={{ service: s.slug }}
                className="group rounded-sm border border-border bg-card p-6 hover:border-primary/40"
              >
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-foreground group-hover:text-primary">
                  {s.name}
                </h3>
                <p className="mt-2 text-step-0 text-muted-foreground line-clamp-2">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-step--1 font-bold uppercase tracking-wider text-primary group-hover:underline">
                  View {s.name} in {t.name} <ArrowRight className="size-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent job & town review */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Town job</Eyebrow>
              <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Recent work in {t.name}
              </h2>
              <div className="mt-6 rounded-sm border border-border bg-card p-5">
                <Photo
                  label={`${t.name} real job photograph`}
                  ratio="aspect-[16/10]"
                  tag="Completed Job"
                />
                <h3 className="mt-4 font-display text-base font-bold uppercase tracking-tight text-foreground">
                  Job example in {t.name}
                </h3>
                <p className="mt-2 text-step-0 text-muted-foreground">
                  Real job photo placeholder — replace with an actual job completed in {t.name}.
                </p>
              </div>
            </div>

            <div>
              <Eyebrow>Town review</Eyebrow>
              <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Customer review from {t.name}
              </h2>
              <div className="mt-6">
                <ReviewCard
                  name="Verified Customer"
                  town={t.name}
                  service="Local Service"
                  text={`Called them out to a job in ${t.name} and they came the same day. Clear price, tidy work, and they actually knew the area. Will use again.`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Neighbouring towns</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
            Nearby areas we also serve
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                to="/areas/$town"
                params={{ town: n.slug }}
                className="rounded-xs border border-border bg-card px-3.5 py-2 text-step--1 font-semibold uppercase tracking-wider text-foreground hover:border-primary/40 hover:bg-secondary"
              >
                {n.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA heading={`NEED A ${site.trade.toUpperCase()} IN ${t.name.toUpperCase()}?`} />
      <BreadcrumbJsonLd trail={["Home", "Areas", t.name]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.businessName,
          telephone: site.phone,
          areaServed: t.name,
        }}
      />
    </>
  );
}
