import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { site, reviews } from "@/lib/site";
import { Section, SectionHeading, Eyebrow, CallButton } from "@/components/site";
import { ReviewCard, BreadcrumbJsonLd, FinalCTA } from "@/components/sections";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    title: `Reviews | ${site.businessName}`,
    meta: [
      {
        name: "description",
        content: `Read real customer reviews for ${site.businessName}. Rated ${site.rating} from ${site.reviewCount}+ reviews across ${site.serviceArea}.`,
      },
      {
        property: "og:title",
        content: `Reviews | ${site.businessName}`,
      },
      {
        property: "og:description",
        content: `Rated ${site.rating} across ${site.reviewCount}+ reviews.`,
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const byService = reviews.reduce<Record<string, typeof reviews>>((acc, r) => {
    (acc[r.service] ??= []).push(r);
    return acc;
  }, {});

  return (
    <>
      <Section className="border-b border-border bg-background">
        <Eyebrow>Customer verification</Eyebrow>
        <SectionHeading>Customer reviews</SectionHeading>
        <p className="mt-5 max-w-2xl text-step-0 leading-relaxed text-muted-foreground">
          Independent customer feedback from homeowners, landlords, and local businesses across{" "}
          {site.serviceArea}. We link directly to our public Google Business Profile.
        </p>

        {/* Rating summary cards in editorial style */}
        <div className="mt-10 grid gap-5 rounded-sm border border-border bg-secondary p-7 sm:grid-cols-3 sm:p-8">
          <div className="text-center">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-star text-star" />
              ))}
            </div>
            <p className="mt-3 font-display text-4xl font-bold uppercase leading-none text-primary">
              {site.rating}
            </p>
            <p className="mt-3 text-step--1 font-bold uppercase tracking-wider text-foreground">
              Google Rating
            </p>
          </div>
          <div className="text-center sm:border-l sm:border-border">
            <p className="font-display text-4xl font-bold uppercase leading-none text-foreground">
              {site.reviewCount}+
            </p>
            <p className="mt-3 text-step--1 font-bold uppercase tracking-wider text-foreground">
              Verified Reviews
            </p>
            <p className="mt-1 text-step--1 text-muted-foreground">Public profile</p>
          </div>
          <div className="text-center sm:border-l sm:border-border">
            <p className="font-display text-4xl font-bold uppercase leading-none text-foreground">
              {site.yearsExperience}+
            </p>
            <p className="mt-3 text-step--1 font-bold uppercase tracking-wider text-foreground">
              Years Trading
            </p>
            <p className="mt-1 text-step--1 text-muted-foreground">Serving {site.mainTown}</p>
          </div>
        </div>

        {/* Reviews grid in clean beige panels */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
            All recent feedback
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <ReviewCard key={r.name + i} {...r} />
            ))}
          </div>
        </div>

        {/* Grouped by service */}
        {Object.entries(byService).map(([service, list]) => (
          <div key={service} className="mt-12">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              {service} reviews
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((r, i) => (
                <ReviewCard key={r.name + service + i} {...r} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      <FinalCTA heading={`JOIN OUR SATISFIED CUSTOMERS IN ${site.mainTown.toUpperCase()}`} />
      <BreadcrumbJsonLd trail={["Home", "Reviews"]} />
    </>
  );
}
