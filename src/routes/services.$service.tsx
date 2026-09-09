import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { site, services, reviews, towns } from "@/lib/site";
import {
  Section,
  SectionHeading,
  Eyebrow,
  CTAPair,
  Breadcrumbs,
  getService,
  CardArrow,
} from "@/components/site";
import {
  Photo,
  ReviewCard,
  FaqList,
  FinalCTA,
  JsonLd,
  BreadcrumbJsonLd,
} from "@/components/sections";

export const Route = createFileRoute("/services/$service")({
  head: ({ params }) => {
    const s = getService(params.service) ?? {
      name: "Service",
      slug: params.service,
    };
    return {
      title: `${s.name} in ${site.mainTown} | ${site.businessName}`,
      meta: [
        {
          name: "description",
          content: `${s.name} in ${site.mainTown}. Clear costs, what's included, and the signs you need it. Call ${site.businessName} for an honest quote.`,
        },
        {
          property: "og:title",
          content: `${s.name} in ${site.mainTown} | ${site.businessName}`,
        },
        {
          property: "og:description",
          content: `${s.name} across ${site.serviceArea}. Clear quote before work starts.`,
        },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: slug } = Route.useParams();
  const s = getService(slug);

  if (!s) {
    return (
      <Section className="py-16">
        <SectionHeading>Service not found</SectionHeading>
        <p className="mt-3 text-step--1 text-muted-foreground">
          We couldn't find that service.{" "}
          <Link to="/services" className="font-bold text-primary hover:underline">
            See all services →
          </Link>
        </p>
      </Section>
    );
  }

  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  const serviceReviews = reviews.slice(0, 2);
  const faqs = [
    {
      q: `How much does ${s.name.toLowerCase()} usually cost?`,
      a: `Most ${s.name.toLowerCase()} jobs come in around ${s.priceRange}, depending on ${s.costFactors}. We always confirm the exact price before starting.`,
    },
    {
      q: `Can you do ${s.name.toLowerCase()} same-day?`,
      a: site.sameDay
        ? `Yes — for emergencies we aim same-day, often within the hour locally. Booked work is usually within 2–3 days.`
        : `Booked work is usually within 2–3 days. We'll give you a real arrival window when you call.`,
    },
    {
      q: `Is ${s.name.toLowerCase()} work guaranteed?`,
      a: `Yes. Workmanship is guaranteed and parts carry the manufacturer's warranty.`,
    },
    {
      q: `Do you charge a callout fee for ${s.name.toLowerCase()}?`,
      a: `There's a one-hour minimum for callouts, which we confirm before we set off. No surprise charges.`,
    },
    {
      q: `Will I get a price before you start?`,
      a: `Always. We confirm a clear quote before any work begins.`,
    },
    {
      q: `Do you do ${s.name.toLowerCase()} outside ${site.mainTown}?`,
      a: `We cover up to about 25 miles from ${site.mainTown}. Call with your postcode and we'll confirm.`,
    },
    {
      q: `Are you insured to do ${s.name.toLowerCase()}?`,
      a: `Fully insured and ${site.accreditation} (${site.licenceNumber}).`,
    },
    {
      q: `Can you give a rough price on the phone?`,
      a: `For straightforward ${s.name.toLowerCase()} jobs, yes. For anything we need to see, we'll give a range and confirm in person.`,
    },
  ];

  const included = [
    `Initial diagnosis and assessment`,
    `Labour for the agreed scope`,
    `Standard parts and fittings`,
    `Test and commission after the job`,
    `Clean-up and disposal of worn parts`,
    `Workmanship guarantee on finish`,
  ];
  const signs = [
    `You notice an unusual sound, smell, or drop in performance`,
    `Energy or water costs are higher than normal without reason`,
    `A previous quick-fix has failed again`,
    `System is leaking, dripping, or showing fault codes`,
    `The problem is worsening quickly`,
  ];

  return (
    <>
      {/* 1. Answer First Hero */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: s.name },
            ]}
          />
          <Eyebrow>Individual Service</Eyebrow>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <h1 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {s.name} in {site.mainTown}
              </h1>
              <p className="mt-5 text-step-0 leading-relaxed text-muted-foreground">
                {s.name} is for {s.forWho}. Most {s.name.toLowerCase()} jobs cost between{" "}
                <strong className="text-foreground">{s.priceRange}</strong>, depending on{" "}
                {s.costFactors}. We carry out {s.name.toLowerCase()} across {site.mainTown} and
                nearby areas.
              </p>
              <div className="mt-7">
                <CTAPair />
              </div>
            </div>
            <Photo
              label={`${s.name} at work in ${site.mainTown}`}
              ratio="aspect-[16/10]"
              tag="Field Work"
            />
          </div>
        </div>
      </section>

      {/* 2. What's Included & Signs */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-sm border border-border bg-card p-7">
              <Eyebrow>Scope</Eyebrow>
              <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
                What's included in {s.name}
              </h2>
              <ul className="mt-5 space-y-3">
                {included.map((i) => (
                  <li key={i} className="flex items-start gap-2.5 text-step-0 text-foreground/90">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm border border-border bg-card p-7">
              <Eyebrow>Diagnostics</Eyebrow>
              <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Signs you need {s.name.toLowerCase()}
              </h2>
              <ul className="mt-5 space-y-3">
                {signs.map((i) => (
                  <li key={i} className="flex items-start gap-2.5 text-step-0 text-foreground/90">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How the job works */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Workflow</Eyebrow>
          <SectionHeading>How the job works</SectionHeading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Call or send a photo", d: "Tell us what's wrong in plain words." },
              { n: "02", t: "We assess & price", d: "We confirm the plan and a clear quote." },
              { n: "03", t: "Carry out the work", d: "Tidy, tested, and explained." },
              { n: "04", t: "Backed guarantee", d: "Workmanship guaranteed on every job." },
            ].map((step) => (
              <div key={step.n} className="rounded-sm border border-border bg-secondary/50 p-5">
                <span className="font-display text-lg font-bold text-primary">[{step.n}]</span>
                <h3 className="mt-3 font-display text-step-0 font-bold uppercase tracking-tight text-foreground">
                  {step.t}
                </h3>
                <p className="mt-2 text-step-0 text-muted-foreground">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Cost breakdown */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
            <div className="rounded-sm border border-border bg-card p-7">
              <Eyebrow>Pricing transparency</Eyebrow>
              <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
                What {s.name.toLowerCase()} costs
              </h2>
              <p className="mt-4 font-display text-3xl font-bold uppercase leading-none text-primary">
                {s.priceRange}
              </p>
              <p className="mt-3 text-step-0 leading-relaxed text-muted-foreground">
                Typical range across {site.serviceArea}. The final figure depends on {s.costFactors}
                . We always confirm the exact figure in writing before starting work.
              </p>
            </div>
            <div className="flex flex-col justify-between rounded-sm border border-border bg-card p-7">
              <div>
                <h3 className="font-display text-step-0 font-bold uppercase tracking-tight text-foreground">
                  No hidden extras
                </h3>
                <p className="mt-3 text-step-0 leading-relaxed text-muted-foreground">
                  Parts are priced before fitting. If the job turns out more complex once inspected,
                  we stop, show you why, and re-confirm — never just keep billing.
                </p>
              </div>
              <div className="mt-6">
                <CTAPair />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Proof: Recent service jobs */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Proof</Eyebrow>
          <SectionHeading>Recent {s.name.toLowerCase()} work</SectionHeading>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-sm border border-border bg-card p-4">
                <Photo
                  label={`${s.name} job ${i}`}
                  ratio="aspect-[4/3]"
                  tag={`Job 0${i}`}
                  index={i}
                />
                <h3 className="mt-4 font-display text-step-0 font-bold uppercase tracking-tight text-foreground">
                  {s.name} job {i} in {site.mainTown}
                </h3>
                <p className="mt-2 text-step--1 text-muted-foreground">
                  Real job photo placeholder — replace with actual on-site photograph.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Service Reviews */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Verified feedback</Eyebrow>
          <SectionHeading>{s.name} — Customer reviews</SectionHeading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {serviceReviews.map((r) => (
              <ReviewCard key={r.name} {...r} service={s.name} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Common questions</Eyebrow>
          <SectionHeading>{s.name} FAQs</SectionHeading>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      {/* 8. Areas & Related */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Coverage</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
            Where we carry out {s.name.toLowerCase()}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {towns.map((t) => (
              <Link
                key={t.slug}
                to="/areas/$town"
                params={{ town: t.slug }}
                className="rounded-xs border border-border bg-card px-3.5 py-2 text-step--1 font-semibold uppercase tracking-wider text-foreground hover:border-primary/40 hover:bg-secondary"
              >
                {t.name}
              </Link>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-10">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Related services
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/services/$service"
                  params={{ service: r.slug }}
                  className="group rounded-sm border border-border bg-card p-5 hover:border-primary/40"
                >
                  <h4 className="font-display text-step-0 font-bold uppercase tracking-tight text-foreground group-hover:text-primary">
                    {r.name}
                  </h4>
                  <p className="mt-2 text-step-0 text-muted-foreground line-clamp-2">{r.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-step--1 font-bold uppercase tracking-wider text-primary group-hover:underline">
                    View service <ArrowRight className="size-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA heading={`NEED ${s.name.toUpperCase()} IN ${site.mainTown.toUpperCase()}?`} />
      <BreadcrumbJsonLd trail={["Home", "Services", s.name]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${s.name} in ${site.mainTown}`,
          provider: { "@type": "LocalBusiness", name: site.businessName },
          areaServed: site.serviceArea,
          offers: { "@type": "Offer", priceRange: s.priceRange },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
