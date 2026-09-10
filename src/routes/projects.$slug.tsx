import { createFileRoute, Link } from "@tanstack/react-router";
import { site, projects } from "@/lib/site";
import { Section, SectionHeading, Eyebrow, CallButton, Breadcrumbs } from "@/components/site";
import { Photo, FinalCTA, JsonLd, BreadcrumbJsonLd } from "@/components/sections";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug) ?? {
      jobType: "Job",
      town: site.mainTown,
      propertyType: "Property",
    };
    return {
      title: `${p.jobType} in ${p.town} | ${site.businessName}`,
      meta: [
        {
          name: "description",
          content: `${p.jobType} in ${p.town} by ${site.businessName}. The problem, what we found, what we did, and the result.`,
        },
        {
          property: "og:title",
          content: `${p.jobType} in ${p.town} | ${site.businessName}`,
        },
        {
          property: "og:description",
          content: `Real job write-up from ${site.businessName}.`,
        },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const p = projects.find((x) => x.slug === slug);

  if (!p) {
    return (
      <Section className="py-16">
        <SectionHeading>Job not found</SectionHeading>
        <p className="mt-3 text-step--1 text-muted-foreground">
          We couldn't find that job.{" "}
          <Link to="/projects" className="font-bold text-primary hover:underline">
            See all recent work →
          </Link>
        </p>
      </Section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Recent Work", to: "/projects" },
              { label: p.jobType },
            ]}
          />
          <Eyebrow>Case study</Eyebrow>
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div>
              <span className="text-step--1 font-bold uppercase tracking-wider text-primary">
                {p.town} · {p.propertyType}
              </span>
              <h1 className="mt-2 font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {p.jobType}, {p.propertyType}, {p.town}
              </h1>
              <p className="mt-5 text-step-0 leading-relaxed text-muted-foreground">{p.result}</p>

              <div className="mt-7 flex flex-wrap gap-6 border-y border-border py-5 text-step--1">
                <div>
                  <span className="block text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
                    Time Taken
                  </span>
                  <span className="mt-1 block font-semibold text-foreground">{p.time}</span>
                </div>
                <div className="border-l border-border pl-6">
                  <span className="block text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
                    Rough Cost
                  </span>
                  <span className="mt-1 block font-semibold text-foreground">{p.cost}</span>
                </div>
                <div className="border-l border-border pl-6">
                  <span className="block text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
                    Customer
                  </span>
                  <span className="mt-1 block font-semibold text-foreground">{p.author}</span>
                </div>
              </div>

              <div className="mt-7">
                <CallButton label="Call about a similar job" />
              </div>
            </div>

            <Photo
              label={`Main job photo: ${p.jobType}`}
              ratio="aspect-[16/10]"
              tag="Completed Job"
            />
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-sm border border-border bg-card p-6">
              <span className="font-display text-step--1 font-bold uppercase tracking-wider text-primary">
                [01] The Problem
              </span>
              <h2 className="mt-3 font-display text-base font-bold uppercase tracking-tight text-foreground">
                What went wrong
              </h2>
              <p className="mt-3 text-step-0 leading-relaxed text-muted-foreground">{p.problem}</p>
            </div>

            <div className="rounded-sm border border-border bg-card p-6">
              <span className="font-display text-step--1 font-bold uppercase tracking-wider text-primary">
                [02] What We Found
              </span>
              <h2 className="mt-3 font-display text-base font-bold uppercase tracking-tight text-foreground">
                On-site inspection
              </h2>
              <p className="mt-3 text-step-0 leading-relaxed text-muted-foreground">{p.found}</p>
            </div>

            <div className="rounded-sm border border-border bg-card p-6">
              <span className="font-display text-step--1 font-bold uppercase tracking-wider text-primary">
                [03] What We Did
              </span>
              <h2 className="mt-3 font-display text-base font-bold uppercase tracking-tight text-foreground">
                The resolution
              </h2>
              <p className="mt-3 text-step-0 leading-relaxed text-muted-foreground">{p.did}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After photos */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Visual evidence</Eyebrow>
          <SectionHeading>Before and after</SectionHeading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-sm border border-border bg-card p-4">
              <Photo label="Before photo" index={2} ratio="aspect-[4/3]" tag="Before" />
              <p className="mt-3 text-step-0 font-semibold uppercase text-foreground">
                Condition before arrival
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-4">
              <Photo label="After photo" index={5} ratio="aspect-[4/3]" tag="After" />
              <p className="mt-3 text-step-0 font-semibold uppercase text-foreground">
                Finished repair / installation
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-sm border border-border bg-secondary p-7">
            <p className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
              Customer comment
            </p>
            <p className="mt-3 text-base italic text-foreground">"{p.comment}"</p>
            <p className="mt-3 text-step--1 font-semibold text-primary">
              - {p.author}, {p.town}
            </p>
          </div>
        </div>
      </section>

      <FinalCTA heading={`NEED ${p.jobType.toUpperCase()} NEAR ${site.mainTown.toUpperCase()}?`} />
      <BreadcrumbJsonLd trail={["Home", "Recent Work", p.jobType]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${p.jobType} in ${p.town}`,
          author: { "@type": "Organization", name: site.businessName },
        }}
      />
    </>
  );
}
