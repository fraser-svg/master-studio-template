import { withDemoContent } from "./demo";

// Site configuration — central place for all Custom Value merge fields.
//
// This file holds the GoHighLevel Custom Value tokens used across the whole
// template. Every value below is a merge field of the form:
//   {{ custom_values.some_key }}
//
// To deploy for a real business, set the matching Custom Values in your
// account and the entire site (business name, trade, town, phone, email,
// services, areas, trust signals, CTAs, footer and core SEO text) updates
// automatically. Do NOT hard-code business-specific text in the route files —
// reference it through `site` here instead.
//
// NOTE: Custom Values are plain text, so anything that needs to stay
// business-specific (individual service page detail, area-page local copy,
// project write-ups, review text, pricing explanations, service-specific
// FAQs) is kept as unique copy in the route files, not as a Custom Value.

const siteRaw = {
  // --- Core business identity ---
  businessName: "{{ custom_values.business_name }}",
  trade: "{{ custom_values.trade }}",
  // Singular form for sentences like "Need a roofer in Sheffield?".
  tradeSingular: "{{ custom_values.trade_singular }}",
  mainTown: "{{ custom_values.main_town }}",
  serviceArea: "{{ custom_values.service_area }}",
  phone: "{{ custom_values.phone }}",
  // tel: links must use the raw phone Custom Value.
  phoneHref: "tel:{{ custom_values.phone }}",
  email: "{{ custom_values.email }}",
  address: "{{ custom_values.address }}",
  hoursShort: "{{ custom_values.opening_hours }}",

  // Where quote forms POST. Must be a real https URL Custom Value before launch
  // — see src/lib/leads.ts, which refuses to fake success without it.
  // Visual theme for this deployment: "" = Forest (default),
  // "industrial" = concrete + safety orange, "premium" = near-black + metallic.
  // Defined in src/styles.css; no component changes are needed to switch.

  leadEndpoint: "{{ custom_values.lead_endpoint }}",

  // Hero photograph for this business. Swapped per deployment; never hard-coded
  // in a component.
  heroImage: "{{ custom_values.hero_image_url }}",
  heroImageAlt: "{{ custom_values.hero_image_alt }}",
  hours: [
    { day: "Monday", time: "{{ custom_values.opening_hours }}" },
    { day: "Tuesday", time: "{{ custom_values.opening_hours }}" },
    { day: "Wednesday", time: "{{ custom_values.opening_hours }}" },
    { day: "Thursday", time: "{{ custom_values.opening_hours }}" },
    { day: "Friday", time: "{{ custom_values.opening_hours }}" },
    { day: "Saturday", time: "{{ custom_values.opening_hours }}" },
    { day: "Sunday", time: "{{ custom_values.opening_hours }}" },
  ],

  // --- Trust signals ---
  rating: "{{ custom_values.google_rating }}",
  reviewCount: "{{ custom_values.review_count }}",
  yearsExperience: "{{ custom_values.years_trading }}",
  accreditation: "{{ custom_values.primary_accreditation }}",
  licenceNumber: "{{ custom_values.licence_number }}",
  insuranceStatement: "{{ custom_values.insurance_statement }}",
  sameDay: true,

  regions: [
    {
      name: "{{ custom_values.main_town }} & nearby",
      towns: [
        "{{ custom_values.town_1_name }}",
        "{{ custom_values.town_2_name }}",
        "{{ custom_values.town_3_name }}",
        "{{ custom_values.town_4_name }}",
        "{{ custom_values.town_5_name }}",
        "{{ custom_values.town_6_name }}",
      ],
    },
  ],
};

export const site = withDemoContent(siteRaw);

export type Region = (typeof site.regions)[number];

// Main towns that get their own area page (must have real local content).
// Slugs and names come from Custom Values so links resolve to the right pages.
const townsRaw = [
  {
    slug: "{{ custom_values.town_1_slug }}",
    name: "{{ custom_values.town_1_name }}",
    distance: "{{ custom_values.town_1_local_note }}",
    time: "{{ custom_values.town_1_local_note }}",
  },
  {
    slug: "{{ custom_values.town_2_slug }}",
    name: "{{ custom_values.town_2_name }}",
    distance: "{{ custom_values.town_2_local_note }}",
    time: "{{ custom_values.town_2_local_note }}",
  },
  {
    slug: "{{ custom_values.town_3_slug }}",
    name: "{{ custom_values.town_3_name }}",
    distance: "{{ custom_values.town_3_local_note }}",
    time: "{{ custom_values.town_3_local_note }}",
  },
  {
    slug: "{{ custom_values.town_4_slug }}",
    name: "{{ custom_values.town_4_name }}",
    distance: "{{ custom_values.town_4_local_note }}",
    time: "{{ custom_values.town_4_local_note }}",
  },
  {
    slug: "{{ custom_values.town_5_slug }}",
    name: "{{ custom_values.town_5_name }}",
    distance: "{{ custom_values.town_5_local_note }}",
    time: "{{ custom_values.town_5_local_note }}",
  },
  {
    slug: "{{ custom_values.town_6_slug }}",
    name: "{{ custom_values.town_6_name }}",
    distance: "{{ custom_values.town_6_local_note }}",
    time: "{{ custom_values.town_6_local_note }}",
  },
];

// Services — each gets its own page at /services/[slug].
// Names, slugs, short descriptions and price ranges come from Custom Values so
// homepage cards, footer links and the services hub stay in sync. The detailed
// service-page copy (what's included, signs, process, cost factors, FAQs) is
// kept as unique template copy in the route file and is NOT a Custom Value.
const servicesRaw = [
  {
    slug: "{{ custom_values.service_1_slug }}",
    name: "{{ custom_values.service_1_name }}",
    short: "{{ custom_values.service_1_short_description }}",
    description: "{{ custom_values.service_1_short_description }}",
    forWho: "customers who need this work done properly and on time",
    priceRange: "{{ custom_values.service_1_price_range }}",
    costFactors: "the size of the job, parts required, and access",
    icon: "Service1",
  },
  {
    slug: "{{ custom_values.service_2_slug }}",
    name: "{{ custom_values.service_2_name }}",
    short: "{{ custom_values.service_2_short_description }}",
    description: "{{ custom_values.service_2_short_description }}",
    forWho: "customers who need this work done properly and on time",
    priceRange: "{{ custom_values.service_2_price_range }}",
    costFactors: "the size of the job, parts required, and access",
    icon: "Service2",
  },
  {
    slug: "{{ custom_values.service_3_slug }}",
    name: "{{ custom_values.service_3_name }}",
    short: "{{ custom_values.service_3_short_description }}",
    description: "{{ custom_values.service_3_short_description }}",
    forWho: "customers who need this work done properly and on time",
    priceRange: "{{ custom_values.service_3_price_range }}",
    costFactors: "the size of the job, parts required, and access",
    icon: "Service3",
  },
  {
    slug: "{{ custom_values.service_4_slug }}",
    name: "{{ custom_values.service_4_name }}",
    short: "{{ custom_values.service_4_short_description }}",
    description: "{{ custom_values.service_4_short_description }}",
    forWho: "customers who need this work done properly and on time",
    priceRange: "{{ custom_values.service_4_price_range }}",
    costFactors: "the size of the job, parts required, and access",
    icon: "Service4",
  },
  {
    slug: "{{ custom_values.service_5_slug }}",
    name: "{{ custom_values.service_5_name }}",
    short: "{{ custom_values.service_5_short_description }}",
    description: "{{ custom_values.service_5_short_description }}",
    forWho: "customers who need this work done properly and on time",
    priceRange: "{{ custom_values.service_5_price_range }}",
    costFactors: "the size of the job, parts required, and access",
    icon: "Service5",
  },
  {
    slug: "{{ custom_values.service_6_slug }}",
    name: "{{ custom_values.service_6_name }}",
    short: "{{ custom_values.service_6_short_description }}",
    description: "{{ custom_values.service_6_short_description }}",
    forWho: "customers who need this work done properly and on time",
    priceRange: "{{ custom_values.service_6_price_range }}",
    costFactors: "the size of the job, parts required, and access",
    icon: "Service6",
  },
];

// Recent work / projects — page-specific proof. Keep as unique template copy
// (NOT Custom Values): replace each entry with a real job's details and photos.
const projectsRaw = [
  {
    slug: "project-1",
    jobType: "[Job Type]",
    propertyType: "[Property Type]",
    town: "[Town]",
    service: "[Service]",
    result: "Replace with a one-line summary of the problem and the result for this real job.",
    problem: "Describe the problem the customer called about.",
    found: "Describe what you found when you assessed it.",
    did: "Describe what you did to fix it.",
    time: "[Time taken]",
    cost: "[Rough cost bracket]",
    comment: "Replace with a real customer comment from this job.",
    author: "[First name]",
  },
  {
    slug: "project-2",
    jobType: "[Job Type]",
    propertyType: "[Property Type]",
    town: "[Town]",
    service: "[Service]",
    result: "Replace with a one-line summary of the problem and the result for this real job.",
    problem: "Describe the problem the customer called about.",
    found: "Describe what you found when you assessed it.",
    did: "Describe what you did to fix it.",
    time: "[Time taken]",
    cost: "[Rough cost bracket]",
    comment: "Replace with a real customer comment from this job.",
    author: "[First name]",
  },
  {
    slug: "project-3",
    jobType: "[Job Type]",
    propertyType: "[Property Type]",
    town: "[Town]",
    service: "[Service]",
    result: "Replace with a one-line summary of the problem and the result for this real job.",
    problem: "Describe the problem the customer called about.",
    found: "Describe what you found when you assessed it.",
    did: "Describe what you did to fix it.",
    time: "[Time taken]",
    cost: "[Rough cost bracket]",
    comment: "Replace with a real customer comment from this job.",
    author: "[First name]",
  },
];

// Reviews — individual review text is page-specific proof, kept as unique
// template copy. Replace each with a real review (first name, town, service, text).
const reviewsRaw = [
  {
    name: "[First name]",
    town: "[Town]",
    date: "[Review date]",
    service: "[Service]",
    text: "Replace with a real review. Came out the same day I called, gave me a clear price before starting, and left the place spotless.",
  },
  {
    name: "[First name]",
    town: "[Town]",
    date: "[Review date]",
    service: "[Service]",
    text: "Replace with a real review. Honest, sharp, and tidy. No hidden charges.",
  },
  {
    name: "[First name]",
    town: "[Town]",
    date: "[Review date]",
    service: "[Service]",
    text: "Replace with a real review. Clean every night, no surprises on the invoice.",
  },
  {
    name: "[First name]",
    town: "[Town]",
    date: "[Review date]",
    service: "[Service]",
    text: "Replace with a real review. Came out of hours and didn't take the mickey on price.",
  },
  {
    name: "[First name]",
    town: "[Town]",
    date: "[Review date]",
    service: "[Service]",
    text: "Replace with a real review. Explained exactly what was wrong and showed me the fix.",
  },
  {
    name: "[First name]",
    town: "[Town]",
    date: "[Review date]",
    service: "[Service]",
    text: "Replace with a real review. Gave me two options at different prices and let me choose.",
  },
];

// General FAQs — answers reference Custom Values for trade, town, phone,
// accreditation and licence so they stay correct across businesses.
const faqsGeneralRaw = [
  {
    q: "Do you cover my area?",
    a: "Probably. We cover {{ custom_values.main_town }} and the surrounding area. If you're unsure, call us with your postcode and we'll tell you straight away.",
  },
  {
    q: "How quickly can you come out?",
    a: "For emergencies we aim for same-day, often within the hour locally. For booked work, usually within 2–3 days.",
  },
  {
    q: "Do you charge a callout fee?",
    a: "For emergency callouts there's a minimum charge that covers the first hour. We'll tell you the figure before we set off — no surprise bills.",
  },
  {
    q: "Can you give a quote before visiting?",
    a: "For straightforward jobs, yes — send us a photo. For anything that needs seeing, we'll give a rough range on the phone and confirm in person.",
  },
  {
    q: "Are you insured and licensed?",
    a: "Yes. We're {{ custom_values.primary_accreditation }} (licence {{ custom_values.licence_number }}), {{ custom_values.insurance_statement }}, and all work is guaranteed.",
  },
  {
    q: "Do you do commercial work?",
    a: "We take on small commercial jobs — offices, shops, and rental units. Call us and we'll tell you honestly if it's our kind of work.",
  },
];

const faqGroupsRaw = [
  {
    group: "Pricing",
    items: [
      {
        q: "Will I get a price before you start?",
        a: "Always. We confirm a price before any work begins so there are no surprises.",
      },
      {
        q: "Is there a minimum charge?",
        a: "Yes — a one-hour minimum for callouts. We'll tell you the amount before we head over.",
      },
      {
        q: "Do you offer payment plans on bigger jobs?",
        a: "For installations over a certain amount we can talk through spreading the cost. Ask us when you call.",
      },
    ],
  },
  {
    group: "Availability",
    items: [
      {
        q: "Do you work weekends?",
        a: "Saturday mornings by appointment, and Sundays for genuine emergencies only.",
      },
      {
        q: "What counts as an emergency?",
        a: "Anything that risks damage to your home if left — leaks, flooding, no heating in winter, and similar.",
      },
    ],
  },
  {
    group: "Areas covered",
    items: [
      {
        q: "How far will you travel?",
        a: "We cover {{ custom_values.service_area }}. Beyond that we may still help — call us with your postcode.",
      },
      {
        q: "Do you charge for travelling out?",
        a: "Within our normal area, no. Further afield we may add a modest travel cost, agreed up front.",
      },
    ],
  },
  {
    group: "Guarantees",
    items: [
      {
        q: "Is your work guaranteed?",
        a: "Yes. Repairs carry a workmanship guarantee and parts carry the manufacturer's warranty.",
      },
      {
        q: "What if a repair fails again?",
        a: "Call us. If it's the same fault within the guarantee period, we come back free of charge.",
      },
    ],
  },
  {
    group: "Emergency work",
    items: [
      {
        q: "Should I turn off the water before you arrive?",
        a: "If you can safely reach the stopcock, yes. We'll talk you through it on the phone if needed.",
      },
      {
        q: "Do you board up after a leak?",
        a: "We make things safe and dry. For full drying or plastering we'll recommend a trusted local hand.",
      },
    ],
  },
  {
    group: "Before the visit",
    items: [
      {
        q: "Should I clear the area first?",
        a: "Just enough for us to reach the problem. We bring dust sheets and clean up after.",
      },
      {
        q: "Can someone be there remotely?",
        a: "Yes, for booked jobs we can liaise with a neighbour or key-holder if you arrange access.",
      },
    ],
  },
];

// Pricing tiers — job labels and notes are unique template copy; prices use
// the service price-range Custom Values where a tier maps to a listed service.
const pricingTiersRaw = [
  {
    job: "{{ custom_values.service_1_name }}",
    price: "{{ custom_values.service_1_price_range }}",
    note: "Typical range — confirm in writing before starting",
  },
  {
    job: "{{ custom_values.service_2_name }}",
    price: "{{ custom_values.service_2_price_range }}",
    note: "Typical range — confirm in writing before starting",
  },
  {
    job: "{{ custom_values.service_3_name }}",
    price: "{{ custom_values.service_3_price_range }}",
    note: "Typical range — confirm in writing before starting",
  },
  {
    job: "{{ custom_values.service_4_name }}",
    price: "{{ custom_values.service_4_price_range }}",
    note: "Typical range — confirm in writing before starting",
  },
  {
    job: "{{ custom_values.service_5_name }}",
    price: "{{ custom_values.service_5_price_range }}",
    note: "Typical range — confirm in writing before starting",
  },
  {
    job: "{{ custom_values.service_6_name }}",
    price: "{{ custom_values.service_6_price_range }}",
    note: "Typical range — confirm in writing before starting",
  },
  {
    job: "Emergency callout (out of hours)",
    price: "from [minimum charge]",
    note: "Includes first hour, evenings & weekends",
  },
  {
    job: "Minimum callout charge",
    price: "from [minimum charge]",
    note: "One-hour minimum, confirmed before we set off",
  },
];

export const towns = withDemoContent(townsRaw);
export const services = withDemoContent(servicesRaw);
export const projects = withDemoContent(projectsRaw);
export const reviews = withDemoContent(reviewsRaw);
export const faqsGeneral = withDemoContent(faqsGeneralRaw);
export const faqGroups = withDemoContent(faqGroupsRaw);
export const pricingTiers = withDemoContent(pricingTiersRaw);
