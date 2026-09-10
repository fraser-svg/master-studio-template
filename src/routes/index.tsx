import { createFileRoute } from "@tanstack/react-router";
import { site, services } from "@/lib/site";
import { FinalCTA, JsonLd, BreadcrumbJsonLd } from "@/components/sections";
import {
  HomeHero,
  HomeHeroBleed,
  HomeTrustBar,
  HomeServices,
  HomeRecentWork,
  HomeProofStats,
  HomeWhyChooseUs,
  HomeAreasCovered,
  HomeReviews,
  HomeFaqs,
  HomeNapBlock,
} from "@/components/home-sections";
import { demoText } from "../lib/demo";

export const Route = createFileRoute("/")({
  head: () => ({
    title: `${site.trade} in ${site.mainTown} | ${site.businessName}`,
    meta: [
      {
        name: "description",
        content: `Need a reliable ${site.trade} in ${site.mainTown}? Call ${site.businessName} for ${services
          .slice(0, 3)
          .map((s) => s.name)
          .join(", ")}, and honest quotes across ${site.serviceArea}.`,
      },
      {
        property: "og:title",
        content: `${site.trade} in ${site.mainTown} | ${site.businessName}`,
      },
      {
        property: "og:description",
        content: `Reliable ${site.trade} in ${site.mainTown}. Honest quotes, fully insured, same-day emergencies.`,
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* The band sequence IS the design: light, alt and dark alternating,
          with size varying so the page compresses and expands. Three dark
          bands, not one. Changing this order changes the rhythm - do it
          deliberately. */}
      <HomeHero />
      <HomeHeroBleed />
      <HomeTrustBar />
      <HomeServices />
      <HomeRecentWork />
      <HomeReviews />
      <HomeWhyChooseUs />
      <HomeAreasCovered />
      <HomeProofStats />
      <HomeFaqs />
      <HomeNapBlock />
      <FinalCTA heading={`Need a ${site.tradeSingular} in ${site.mainTown}?`} />
      <BreadcrumbJsonLd trail={["Home"]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: demoText("{{ custom_values.business_name }}"),
          telephone: demoText("{{ custom_values.phone }}"),
          email: demoText("{{ custom_values.email }}"),
          address: {
            "@type": "PostalAddress",
            streetAddress: demoText("{{ custom_values.address }}"),
          },
          areaServed: demoText("{{ custom_values.service_area }}"),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: demoText("{{ custom_values.google_rating }}"),
            reviewCount: demoText("{{ custom_values.review_count }}"),
          },
        }}
      />
    </>
  );
}
