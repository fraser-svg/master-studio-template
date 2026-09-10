import { createFileRoute, Link } from "@tanstack/react-router";
import { site, projects } from "@/lib/site";
import { Section, SectionHeading, Eyebrow, CallButton } from "@/components/site";
import { Photo, BreadcrumbJsonLd, FinalCTA } from "@/components/sections";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    title: `Recent Work | ${site.businessName}`,
    meta: [
      {
        name: "description",
        content: `Recent ${site.trade} jobs from ${site.businessName} across ${site.serviceArea} - real problems, real fixes, with before and after photos.`,
      },
      {
        property: "og:title",
        content: `Recent Work | ${site.businessName}`,
      },
      {
        property: "og:description",
        content: `Real ${site.trade} jobs we've carried out locally.`,
      },
    ],
  }),
  component: ProjectsHub,
});

function ProjectsHub() {
  return (
    <>
      <Section className="border-b border-border bg-background">
        <Eyebrow>Field portfolio</Eyebrow>
        <SectionHeading>Recent work</SectionHeading>
        <p className="mt-5 max-w-2xl text-step-0 leading-relaxed text-muted-foreground">
          Real jobs we've carried out across {site.serviceArea} - the problem, what we found, what
          we did, and roughly what it cost. No staged stock photography, just the actual work.
        </p>

        {/* Filter tags */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {["All Work", "Repairs", "Installations", "Emergencies"].map((f, i) => (
            <span
              key={f}
              className={`rounded-xs border px-3.5 py-1.5 text-step--1 font-semibold uppercase tracking-wider ${
                i === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Grid of rectangular project cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col justify-between rounded-sm border border-border bg-card p-5 transition-all hover:border-primary"
            >
              <div>
                <Photo
                  label={`${p.jobType} in ${p.town}`}
                  ratio="aspect-[16/10]"
                  tag={`0${idx + 1}`}
                />
                <div className="mt-4">
                  <span className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
                    {p.town} · {p.propertyType}
                  </span>
                  <h2 className="mt-1.5 font-display text-base font-bold uppercase tracking-tight text-foreground group-hover:text-primary">
                    {p.jobType}
                  </h2>
                  <p className="mt-2 text-step-0 text-muted-foreground line-clamp-2">{p.result}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4 text-step--1">
                <span className="font-semibold text-muted-foreground">{p.time}</span>
                <span className="font-bold uppercase tracking-wider text-primary group-hover:underline">
                  View Job →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-sm border border-border bg-secondary p-7 sm:flex-row sm:p-8">
          <div>
            <p className="font-display text-base font-bold uppercase tracking-tight text-foreground">
              Have a similar job needing attention?
            </p>
            <p className="mt-1.5 text-step-0 text-muted-foreground">
              Call {site.phone} or send a photo for a realistic quote.
            </p>
          </div>
          <CallButton label="Call Now" />
        </div>
      </Section>

      <FinalCTA heading={`NEED A ${site.trade}?`} />
      <BreadcrumbJsonLd trail={["Home", "Recent Work"]} />
    </>
  );
}
