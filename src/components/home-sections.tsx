import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { site, services, towns, reviews, faqsGeneral, projects } from "@/lib/site";
import {
  Band,
  BandHead,
  SectionHeading,
  Eyebrow,
  CallButton,
  QuoteButton,
  TrustStrip,
  CardArrow,
} from "@/components/site";
import { Photo, MapPlaceholder, NAPBlock, FaqList } from "@/components/sections";
import { LeadError, submitLead } from "@/lib/leads";
import { demoPhoto } from "@/lib/demo";

// Hero photograph comes from a Custom Value so every deployment ships its own
// work. FALLBACK_HERO is only used while a client has not supplied one yet.
const FALLBACK_HERO = "/hero-placeholder.svg";
const heroSrc =
  !site.heroImage || site.heroImage.includes("{{")
    ? (demoPhoto("hero", 0) ?? FALLBACK_HERO)
    : site.heroImage;
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

const FIELD_CLASS =
  "w-full border border-input bg-background px-3 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary";

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
      <span className="mb-1 block text-step--1 font-bold uppercase tracking-[0.14em] text-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-step--1 text-destructive">{error}</span>}
    </label>
  );
}

/**
 * The hero is a solid brand-dark block, not text floating on a scrimmed
 * photograph. A scrim over a photo is what made this read as a stock lead-gen
 * template; a hard block with the work photographed beside it reads as a firm.
 *
 * The lead form stays exactly where it is. Hero lead capture is the one thing
 * on this page that must not move.
 */
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
    <section className="hero-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="min-w-0 self-center">
          <p className="rule-t-accent inline-block pt-3 text-step--1 font-bold uppercase tracking-[0.2em]">
            {site.yearsExperience}+ years in {site.mainTown}. {site.accreditation}.
          </p>

          {/* The one loud moment on the page. Nothing else reaches step 4. */}
          <SectionHeading as="h2" scale="hero" className="mt-6">
            Reliable {site.trade} in {site.mainTown}
          </SectionHeading>

          <p className="hero-ink-muted mt-6 max-w-[46ch] text-step-1 leading-relaxed">
            Local help for{" "}
            {services
              .slice(0, 3)
              .map((s) => s.name.toLowerCase())
              .join(", ")}
            , and urgent jobs across {site.serviceArea}.
          </p>

          <div className="mt-9 flex flex-wrap items-stretch gap-3">
            <a
              href={site.phoneHref}
              className="tabular inline-flex min-h-12 items-center gap-2 bg-accent px-6 text-step--1 font-bold uppercase tracking-[0.12em] text-accent-ink transition-colors hover:bg-accent/90"
            >
              Call {site.phone}
            </a>
            <Link
              to="/contact"
              className="rule-t-hero rule-b-hero hover:bg-hero-tint inline-flex min-h-12 items-center px-6 text-step--1 font-bold uppercase tracking-[0.12em] transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Lead form. Same position, same source, same handler as before. */}
        <div className="rule-all-heavy min-w-0 bg-card p-6 text-foreground sm:p-8">
          <p className="text-step--1 font-bold uppercase tracking-[0.2em] text-mark">Fast quote</p>
          <h2 className="display mt-2 text-step-2">Tell us about the job</h2>
          <p className="mt-2 text-step--1 text-muted-foreground">
            Send a few details and we'll tell you what happens next.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <HeroField label="Your name" error={errors.name?.message}>
              <input {...register("name")} className={FIELD_CLASS} placeholder="Full name" />
            </HeroField>

            <div className="grid gap-4 sm:grid-cols-2">
              <HeroField label="Phone" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  className={FIELD_CLASS}
                  placeholder={site.phone}
                />
              </HeroField>
              <HeroField label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  className={FIELD_CLASS}
                  placeholder="you@email.com"
                />
              </HeroField>
            </div>

            <HeroField label="Postcode" error={errors.postcode?.message}>
              <input
                {...register("postcode")}
                className={FIELD_CLASS}
                placeholder={site.mainTown}
              />
            </HeroField>

            <HeroField label="What do you need help with?" error={errors.need?.message}>
              <textarea
                {...register("need")}
                rows={3}
                className={FIELD_CLASS}
                placeholder="Describe the problem or job in your own words..."
              />
            </HeroField>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent py-3.5 text-step-0 font-bold uppercase tracking-[0.12em] text-accent-ink transition-colors hover:bg-accent/90 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Request a Quote"}
            </button>

            <p className="text-center text-step--1 text-muted-foreground">
              We'll get back to you as soon as possible. A photo helps, and you can send one when we
              reply.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/**
 * Full-bleed photograph directly under the hero. Nothing else on the page runs
 * edge to edge, which is what makes it land.
 */
export function HomeHeroBleed() {
  return (
    <img
      src={heroSrc}
      alt={heroAlt}
      fetchPriority="high"
      decoding="async"
      className="h-[42vw] max-h-[28rem] min-h-[14rem] w-full object-cover"
    />
  );
}

export function HomeTrustBar() {
  return (
    <Band tone="dark" size="tight" as="div">
      <TrustStrip onDark />
    </Band>
  );
}

export function HomeServices() {
  return (
    <Band tone="light">
      <BandHead
        aside={
          <Link
            to="/services"
            className="text-step--1 font-bold uppercase tracking-[0.14em] text-foreground hover:text-mark"
          >
            View all services
          </Link>
        }
      >
        <SectionHeading>Services in {site.mainTown}</SectionHeading>
      </BandHead>

      {/* One card grid on the page, and it is the right component for
          image + label + link items. Hairline gutters, no card borders: the
          grid itself draws the lines. */}
      <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, idx) => (
          <Link
            key={s.slug}
            to="/services/$service"
            params={{ service: s.slug }}
            className="group flex flex-col justify-between bg-background transition-colors hover:bg-surface-alt"
          >
            <div>
              <Photo label={`${s.name} job`} ratio="aspect-[4/3]" index={idx} />
              <div className="p-6">
                <h3 className="display text-step-1">{s.name}</h3>
                <p className="mt-2.5 text-step-0 leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <CardArrow />
            </div>
          </Link>
        ))}
      </div>
    </Band>
  );
}

export function HomeRecentWork() {
  const featured = projects[0];
  if (!featured) return null;
  return (
    <Band tone="alt">
      <BandHead
        aside={
          <Link
            to="/projects"
            className="text-step--1 font-bold uppercase tracking-[0.14em] text-foreground hover:text-mark"
          >
            See all recent jobs
          </Link>
        }
      >
        <Eyebrow>Completed jobs</Eyebrow>
        <SectionHeading>Recent work near {site.mainTown}</SectionHeading>
      </BandHead>

      <div className="mt-12 grid lg:grid-cols-[1.15fr_0.85fr]">
        <Photo
          label={`${featured.jobType} in ${featured.town}`}
          ratio="aspect-[16/10] lg:aspect-auto lg:h-full"
        />
        <div className="flex flex-col justify-between bg-background p-7 sm:p-9">
          <div>
            <p className="text-step--1 font-bold uppercase tracking-[0.2em] text-mark">
              {featured.town}, {featured.propertyType}
            </p>
            <h3 className="display mt-3 text-step-2">{featured.jobType}</h3>
            <p className="mt-5 max-w-[46ch] text-step-0 leading-relaxed text-muted-foreground">
              {featured.result}
            </p>
            <dl className="rule-t mt-7 grid grid-cols-2 gap-6 pt-5">
              <div>
                <dt className="text-step--1 font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Time taken
                </dt>
                <dd className="tabular mt-1.5 text-step-0 font-semibold">{featured.time}</dd>
              </div>
              <div>
                <dt className="text-step--1 font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Cost bracket
                </dt>
                <dd className="tabular mt-1.5 text-step-0 font-semibold">{featured.cost}</dd>
              </div>
            </dl>
          </div>
          <Link
            to="/projects/$slug"
            params={{ slug: featured.slug }}
            className="rule-t mt-7 pt-5 text-step--1 font-bold uppercase tracking-[0.14em] text-foreground hover:text-mark"
          >
            View this job
          </Link>
        </div>
      </div>
    </Band>
  );
}

/**
 * One customer, at size, on a dark band. The old version was four quotes in a
 * two-column hairline list, which was the same layout the areas and
 * why-choose-us sections already used - the third repeat is what made the page
 * feel like a template. The words are the proof, so they get the type size.
 */
export function HomeReviews() {
  const lead = reviews[0];
  if (!lead) return null;
  return (
    <Band tone="dark" size="tall">
      <blockquote>
        <p className="display max-w-[19ch] text-step-3 text-on-dark">&ldquo;{lead.text}&rdquo;</p>
        <footer className="mt-9 text-step--1 font-bold uppercase tracking-[0.2em] text-mark">
          {lead.name}, {lead.town}. {lead.service}.
        </footer>
      </blockquote>
      <Link
        to="/reviews"
        className="rule-t-on-dark mt-12 block pt-5 text-step--1 font-bold uppercase tracking-[0.14em] text-on-dark hover:text-mark"
      >
        Read all {site.reviewCount} reviews
      </Link>
    </Band>
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
    <Band tone="light">
      <BandHead>
        <SectionHeading>Why local customers choose {site.businessName}</SectionHeading>
      </BandHead>
      {/* Deliberately not cards. Six plain statements; boxing each one adds a
          border and removes the reading rhythm. */}
      <dl className="rule-t mt-12 grid sm:grid-cols-2">
        {points.map((p) => (
          <div key={p.t} className="rule-b py-7 sm:odd:pr-10 sm:even:pl-10">
            <dt className="display text-step-1">{p.t}</dt>
            <dd className="mt-2.5 max-w-[48ch] text-step-0 leading-relaxed text-muted-foreground">
              {p.d}
            </dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}

export function HomeAreasCovered() {
  return (
    <Band tone="alt">
      <BandHead
        aside={
          <Link
            to="/areas"
            className="text-step--1 font-bold uppercase tracking-[0.14em] text-foreground hover:text-mark"
          >
            See all areas
          </Link>
        }
      >
        <Eyebrow>Local presence</Eyebrow>
        <SectionHeading>Areas we cover</SectionHeading>
      </BandHead>
      {/* A town list is a list. */}
      <div className="rule-t mt-12">
        {towns.map((t) => (
          <Link
            key={t.slug}
            to="/areas/$town"
            params={{ town: t.slug }}
            className="rule-b group flex flex-col gap-1 py-5 hover:text-mark sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <span className="display text-step-1">{t.name}</span>
            <span className="tabular text-step--1 text-muted-foreground sm:text-right">
              {t.distance}, {t.time}
            </span>
          </Link>
        ))}
      </div>
    </Band>
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
    <Band tone="dark">
      <p className="text-step--1 font-bold uppercase tracking-[0.2em] text-mark">Track record</p>

      <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.unit} className="rule-t-accent pt-5">
            <dt className="display tabular text-step-2 text-on-dark">{f.lead}</dt>
            <dd className="mt-3 text-step-0 font-semibold text-on-dark">{f.unit}</dd>
            <dd className="mt-2 max-w-[24ch] text-step--1 leading-relaxed text-on-dark-faint">
              {f.detail}
            </dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}

export function HomeFaqs() {
  return (
    <Band tone="light">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
        <div>
          <BandHead>
            <SectionHeading>Frequently asked questions</SectionHeading>
          </BandHead>
          <div className="mt-10">
            <FaqList items={faqsGeneral.slice(0, 5)} />
          </div>
        </div>
        <div className="flex flex-col justify-between bg-surface-deep p-7 sm:p-8">
          <div>
            <p className="text-step--1 font-bold uppercase tracking-[0.2em] text-mark">
              Need fast help?
            </p>
            <h3 className="display mt-3 text-step-2">Speak directly with a {site.tradeSingular}</h3>
            <p className="mt-4 text-step-0 leading-relaxed text-muted-foreground">
              Send a photo if it helps us understand the job, or call directly for availability in{" "}
              {site.mainTown}.
            </p>
            <div className="mt-6">
              <Photo label={`Van and technician in ${site.mainTown}`} ratio="aspect-[16/10]" />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2.5">
            <CallButton label={`Call ${site.phone}`} className="w-full" />
            <QuoteButton label="Request a Quote" className="w-full" />
          </div>
        </div>
      </div>
    </Band>
  );
}

export function HomeNapBlock() {
  return (
    <Band tone="alt">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>Where we work from</Eyebrow>
          <SectionHeading as="h3">Find us, check us</SectionHeading>
          <p className="mt-5 max-w-[52ch] text-step-0 leading-relaxed text-muted-foreground">
            Same name, address and number as our Google listing - so you can check we are who we say
            we are before anyone comes out.
          </p>
          <div className="mt-7">
            <NAPBlock />
          </div>
        </div>
        <MapPlaceholder height="h-full min-h-[18rem]" />
      </div>
    </Band>
  );
}
