import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Phone, Upload } from "lucide-react";
import { site, services, towns, reviews, faqsGeneral, projects } from "@/lib/site";
import {
  SectionHeading,
  Eyebrow,
  CallButton,
  QuoteButton,
  TrustStrip,
  CardArrow,
} from "@/components/site";
import { Photo, MapPlaceholder, NAPBlock, FaqList } from "@/components/sections";
import { LeadError, submitLead } from "@/lib/leads";

// Hero photograph comes from a Custom Value so every deployment ships its own
// work. FALLBACK_HERO is only used while a client has not supplied one yet.
const FALLBACK_HERO = "/hero-placeholder.svg";
const heroSrc = !site.heroImage || site.heroImage.includes("{{") ? FALLBACK_HERO : site.heroImage;
const heroAlt =
  !site.heroImageAlt || site.heroImageAlt.includes("{{")
    ? `${site.businessName} at work in ${site.mainTown}`
    : site.heroImageAlt;

const heroSchema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  phone: z.string().min(7, "A contact number helps us reply fast"),
  email: z.string().email("A valid email helps us reply").optional().or(z.literal("")),
  postcode: z.string().min(4, "Your postcode tells us if you're in our area"),
  need: z.string().min(10, "Tell us a little about what's wrong"),
});
type HeroFormValues = z.infer<typeof heroSchema>;

function HeroField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-step--1 font-bold uppercase tracking-wider text-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-step--1 text-destructive">{error}</span>}
    </label>
  );
}

export function HomeHero() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HeroFormValues>({ resolver: zodResolver(heroSchema) });

  const onSubmit = async (data: HeroFormValues) => {
    try {
      await submitLead({ ...data, source: "home-hero" });
      toast.success("Thanks - we'll be back to you as soon as possible.");
      reset();
    } catch (err) {
      toast.error(
        err instanceof LeadError
          ? err.message
          : "We couldn't send that. Please call us and we'll take the details.",
      );
    }
  };

  return (
    <section className="relative flex min-h-[88vh] items-stretch overflow-hidden border-b border-border">
      {/* LCP element: a real <img> so the browser can prioritise and size it. */}
      <img
        src={heroSrc}
        alt={heroAlt}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(var(--scrim), var(--scrim-soft))",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-6xl items-center px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Left content column */}
          <div className="text-on-dark">
            {/* The hero carries one small label, the headline, one line of
                subtext and the CTAs. Proof lives in the trust bar below it. */}
            <span className="inline-flex items-center border-l-2 border-accent py-0.5 pl-3 text-step--1 font-bold uppercase tracking-wider text-on-dark">
              {site.yearsExperience}+ years in {site.mainTown}. {site.accreditation}.
            </span>

            <h1 className="mt-6 font-display text-step-4 font-bold uppercase tracking-tight text-on-dark">
              Reliable {site.trade} in {site.mainTown}
            </h1>

            <p className="mt-5 max-w-xl text-step-0 leading-relaxed text-on-dark-muted">
              Local help for{" "}
              {services
                .slice(0, 3)
                .map((s) => s.name.toLowerCase())
                .join(", ")}
              , and urgent jobs across {site.serviceArea}.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-sm bg-on-dark px-5 py-3 text-step--1 font-bold uppercase tracking-wider text-brand-dark transition-all hover:bg-on-dark-surface active:scale-[0.98]"
              >
                <Phone className="size-4" />
                Call {site.phone}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-sm border border-on-dark-border bg-on-dark-surface px-5 py-3 text-step--1 font-bold uppercase tracking-wider text-on-dark transition-all hover:bg-on-dark-surface active:scale-[0.98]"
              >
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Right contact form card */}
          <div className="rounded-sm border-2 border-brand-dark bg-card p-6 sm:p-8">
            <p className="text-step--1 font-bold uppercase tracking-widest text-primary">
              Fast Quote
            </p>
            <h2 className="mt-1.5 font-display text-xl font-bold uppercase tracking-tight text-foreground">
              Tell us about the job
            </h2>
            <p className="mt-2 text-step--1 text-muted-foreground">
              Send a few details and we'll tell you what happens next.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <HeroField label="Your name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary"
                  placeholder="Full name"
                />
              </HeroField>

              <div className="grid gap-4 sm:grid-cols-2">
                <HeroField label="Phone" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary"
                    placeholder={site.phone}
                  />
                </HeroField>
                <HeroField label="Email" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary"
                    placeholder="you@email.com"
                  />
                </HeroField>
              </div>

              <HeroField label="Postcode" error={errors.postcode?.message}>
                <input
                  {...register("postcode")}
                  className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary"
                  placeholder={site.mainTown}
                />
              </HeroField>

              <HeroField label="What do you need help with?" error={errors.need?.message}>
                <textarea
                  {...register("need")}
                  rows={3}
                  className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary"
                  placeholder="Describe the problem or job in your own words..."
                />
              </HeroField>

              <div className="flex items-center gap-2.5 rounded-sm border border-dashed border-border bg-secondary/50 px-3.5 py-3 text-step--1 text-muted-foreground">
                <Upload className="size-4 shrink-0 text-primary" />
                <span>Optional photo upload - helps us understand the job.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-sm bg-accent py-3 text-step-0 font-bold uppercase tracking-wider text-accent-foreground transition-all hover:bg-accent/90 disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Request a Quote"}
              </button>

              <p className="text-center text-step--1 text-muted-foreground">
                We'll get back to you as soon as possible.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeTrustBar() {
  return (
    <div className="border-b border-border bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-6">
        <TrustStrip />
      </div>
    </div>
  );
}

export function HomeServices() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionHeading>Services in {site.mainTown}</SectionHeading>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-step--1 font-bold uppercase tracking-wider text-primary hover:underline"
          >
            <span>View all services</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Link
              key={s.slug}
              to="/services/$service"
              params={{ service: s.slug }}
              className="group flex flex-col justify-between rounded-sm border border-border bg-card p-5 transition-all hover:border-primary"
            >
              <div>
                <Photo
                  label={`${s.name} job`}
                  ratio="aspect-[16/10]"
                  tag={`0${idx + 1}`}
                  index={idx}
                />
                <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-foreground group-hover:text-primary">
                  {s.name}
                </h3>
                <p className="mt-2 text-step-0 text-muted-foreground line-clamp-2">{s.short}</p>
              </div>
              <div className="mt-5 flex items-center justify-end border-t border-border/70 pt-4">
                <CardArrow />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeRecentWork() {
  const featured = projects[0];
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Completed jobs</Eyebrow>
            <SectionHeading>Recent work near {site.mainTown}</SectionHeading>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-step--1 font-bold uppercase tracking-wider text-primary hover:underline"
          >
            <span>See all recent jobs</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {featured && (
          <div className="mt-10 overflow-hidden rounded-sm border border-border bg-secondary">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <Photo
                label={`${featured.jobType} in ${featured.town}`}
                ratio="aspect-[16/9] lg:aspect-auto lg:h-full"
                tag="Featured Job"
              />
              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <span className="text-step--1 font-bold uppercase tracking-widest text-primary">
                    {featured.town} · {featured.propertyType}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                    {featured.jobType}
                  </h3>
                  <p className="mt-4 text-step-0 leading-relaxed text-muted-foreground">
                    {featured.result}
                  </p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 text-step--1">
                    <div>
                      <dt className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
                        Time Taken
                      </dt>
                      <dd className="mt-1 font-semibold text-foreground">{featured.time}</dd>
                    </div>
                    <div>
                      <dt className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
                        Cost Bracket
                      </dt>
                      <dd className="mt-1 font-semibold text-foreground">{featured.cost}</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <p className="text-step-0 italic text-muted-foreground">"{featured.comment}"</p>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: featured.slug }}
                    className="shrink-0 text-step--1 font-bold uppercase tracking-wider text-primary hover:underline"
                  >
                    View Job →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function HomeProofStats() {
  // Four facts, each verifiable. Deliberately NOT four bordered stat cards with
  // a big number in each - that pattern is the fingerprint of a generated page,
  // and "100% work guaranteed" was a manufactured metric, not a fact.
  const facts = [
    {
      lead: site.rating,
      unit: "on Google",
      detail: `${site.reviewCount} reviews from ${site.serviceArea} homeowners`,
    },
    {
      lead: site.yearsExperience,
      unit: "years trading",
      detail: `Based in ${site.mainTown} since ${new Date().getFullYear() - Number(site.yearsExperience || 0) || ""}`,
    },
    {
      lead: site.accreditation,
      unit: `Licence ${site.licenceNumber}`,
      detail: "Assessed workmanship, checked annually",
    },
    {
      lead: "Insured",
      unit: site.insuranceStatement,
      detail: "Certificate available on request, before work starts",
    },
  ];

  return (
    <section className="border-b border-border bg-brand-dark text-on-dark">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <h2 className="text-step--1 font-bold uppercase tracking-widest text-accent">
          Track record
        </h2>

        <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.unit} className="border-t border-on-dark-border pt-5">
              <dt className="font-display text-step-2 font-bold uppercase tracking-tight text-on-dark">
                {f.lead}
              </dt>
              <dd className="mt-2 text-step-0 font-semibold text-on-dark">{f.unit}</dd>
              <dd className="mt-1.5 text-step--1 leading-relaxed text-on-dark-faint">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function HomeWhyChooseUs() {
  const points = [
    {
      t: "Clear quote before work starts",
      d: "Confirmed in writing before tools are out. No surprises.",
    },
    {
      t: "Tidy, respectful work",
      d: "Dust sheets down, work shoes covered, clean workspace left behind.",
    },
    { t: "Real arrival windows", d: "Genuine arrival slot, and we call if running behind." },
    {
      t: "Photos of completed work",
      d: "See what was done and why, including before-and-after photos.",
    },
    {
      t: "Guaranteed & insured work",
      d: `Fully insured, ${site.accreditation} (${site.licenceNumber}).`,
    },
    {
      t: "Honest local advice",
      d: "If a repair doesn't make financial sense, we'll tell you straight.",
    },
  ];
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <SectionHeading>Why local customers choose {site.businessName}</SectionHeading>
        {/* Deliberately not cards. These are six plain statements; boxing each one
            adds a border and removes the reading rhythm. Two columns, hairlines
            between rows, nothing else. */}
        <dl className="mt-10 grid border-t border-border sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.t} className="border-b border-border py-6 sm:odd:pr-10 sm:even:pl-10">
              <dt className="font-display text-step-1 font-bold uppercase tracking-tight text-foreground">
                {p.t}
              </dt>
              <dd className="mt-2 max-w-[48ch] text-step-0 leading-relaxed text-muted-foreground">
                {p.d}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function HomeAreasCovered() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Local presence</Eyebrow>
            <SectionHeading>Areas we cover</SectionHeading>
          </div>
          <Link
            to="/areas"
            className="inline-flex items-center gap-1.5 text-step--1 font-bold uppercase tracking-wider text-primary hover:underline"
          >
            <span>See all areas</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {/* A town list is a list. Six identical cards in a 3-up grid is the
            layout the services section already uses. */}
        <div className="mt-10 grid border-t border-border sm:grid-cols-2">
          {towns.map((t) => (
            <Link
              key={t.slug}
              to="/areas/$town"
              params={{ town: t.slug }}
              className="group flex flex-col gap-1 border-b border-border py-5 hover:bg-secondary/60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:odd:pr-10 sm:even:pl-10"
            >
              <span className="font-display text-step-1 font-bold uppercase tracking-tight text-foreground group-hover:underline">
                {t.name}
              </span>
              <span className="text-step--1 text-muted-foreground sm:text-right">
                {t.distance}, {t.time}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeReviews() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionHeading>What customers say</SectionHeading>
          </div>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-1.5 text-step--1 font-bold uppercase tracking-wider text-primary hover:underline"
          >
            <span>Read more reviews</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {/* Not the card grid the services section uses, and not six repeated
            five-star rows. The rating is already stated in the trust bar; here
            the words are the proof, so they get the type size. */}
        <div className="mt-10 grid border-t border-border sm:grid-cols-2">
          {reviews.slice(0, 4).map((r, i) => (
            <blockquote
              key={`${r.name}-${r.town}-${i}`}
              className="border-b border-border py-8 sm:odd:pr-10 sm:even:pl-10"
            >
              <p className="max-w-[46ch] text-step-1 leading-snug text-foreground">
                &ldquo;{r.text}&rdquo;
              </p>
              <footer className="mt-4 text-step--1 text-muted-foreground">
                <span className="font-bold uppercase tracking-wider text-foreground">{r.name}</span>
                , {r.town}. {r.service}.
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFaqs() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:gap-14">
          <div>
            <SectionHeading>Frequently asked questions</SectionHeading>
            <div className="mt-8">
              <FaqList items={faqsGeneral.slice(0, 5)} />
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-sm border border-border bg-secondary p-7">
            <div>
              <p className="font-display text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
                Need fast help?
              </p>
              <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Speak directly with a {site.tradeSingular}
              </h3>
              <p className="mt-3 text-step-0 text-muted-foreground">
                Send a photo if it helps us understand the job, or call directly for availability in{" "}
                {site.mainTown}.
              </p>
              <div className="mt-5">
                <Photo label={`Van & technician in ${site.mainTown}`} ratio="aspect-[16/10]" />
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-2.5">
              <CallButton label={`Call ${site.phone}`} className="w-full" />
              <QuoteButton label="Request a Quote" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeNapBlock() {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <Eyebrow>Where we work from</Eyebrow>
            <SectionHeading as="h3">Find us, check us</SectionHeading>
            <p className="mt-4 text-step-0 text-muted-foreground">
              Same name, address and number as our Google listing - so you can check we are who we
              say we are before anyone comes out.
            </p>
            <div className="mt-6">
              <NAPBlock />
            </div>
          </div>
          <MapPlaceholder height="h-full min-h-[18rem]" />
        </div>
      </div>
    </section>
  );
}
