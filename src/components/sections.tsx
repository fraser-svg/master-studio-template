import { site } from "@/lib/site";
import { demoPhoto } from "@/lib/demo";
import { Star, Check, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  CTAPair,
  Section,
  SectionHeading,
  Eyebrow,
  PhoneLink,
  EmailLink,
  CallButton,
} from "./site";
import type { ReactNode } from "react";

// Map placeholder - replace src with a real embed for production.
export function MapPlaceholder({
  label = "Service area map",
  height = "h-64",
}: {
  label?: string;
  height?: string;
}) {
  // Deliberately not a dotted radial grid with a pin in the middle. That read
  // as a broken embed, and it shipped twice on the homepage. Until a real
  // Google Map embed is dropped in (replace this whole component's body with
  // the iframe), a solid brand block carrying the address in type is honest
  // and looks intentional.
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative ${height} w-full overflow-hidden bg-dark-surface text-on-dark`}
    >
      <div className="flex size-full flex-col justify-end p-7 sm:p-9">
        <p className="text-step--1 font-bold uppercase tracking-[0.2em] text-mark">Service area</p>
        <p className="display mt-3 text-step-2 text-on-dark">
          {site.mainTown} &amp; {site.serviceArea}
        </p>
        <p className="rule-t-on-dark mt-5 pt-4 text-step--1 leading-relaxed text-on-dark-muted">
          Based at {site.address}
        </p>
        {import.meta.env.DEV && (
          <p className="mt-3 text-step--1 uppercase tracking-[0.14em] text-on-dark-faint">
            Replace with a real Google Map embed
          </p>
        )}
      </div>
    </div>
  );
}

// Rectangular image placeholder inspired by editorial layout in reference
export function Photo({
  label,
  src,
  className,
  ratio = "aspect-[4/3]",
  tag,
  index,
  priority = false,
}: {
  /** Describes the work shown. Becomes the alt text - write it for a customer. */
  label: string;
  /** Real photograph. Without it, a neutral placeholder block renders instead. */
  src?: string;
  className?: string;
  ratio?: string;
  tag?: string;
  /** Position in a list, so demo photos never repeat side by side. */
  index?: number;
  priority?: boolean;
}) {
  // A client photo wins; in demo mode a stock shot stands in so layouts can be
  // judged with real imagery instead of grey boxes.
  const resolved = src && !src.includes("{{") ? src : demoPhoto(label, index);
  const hasImage = Boolean(resolved);

  return (
    <figure
      className={`group relative ${ratio} m-0 w-full overflow-hidden bg-surface-deep ${className ?? ""}`}
    >
      {hasImage ? (
        <img
          src={resolved}
          alt={label}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        // No instructional copy in production - an unfilled slot must read as a
        // quiet surface to a customer, not as a note to the developer.
        <div
          role="img"
          aria-label={label}
          className="flex size-full flex-col items-center justify-center bg-surface-deep p-6 text-center"
        >
          {import.meta.env.DEV && (
            <span className="mt-3 text-step--1 font-semibold uppercase tracking-wider text-muted-foreground">
              {label} - add a real photo
            </span>
          )}
        </div>
      )}
      {tag && (
        <span className="absolute top-0 left-0 bg-accent px-2.5 py-1 text-step--1 font-bold uppercase tracking-[0.14em] text-accent-ink">
          {tag}
        </span>
      )}
    </figure>
  );
}

// Compact stat card inspired by the reference "50+ Active Programs / 10K+ Lives"
export function StatCard({
  value,
  label,
  sublabel,
}: {
  value: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-card p-5 sm:p-6">
      <p className="display text-3xl font-bold uppercase leading-none tracking-tight text-primary sm:text-4xl">
        {value}
      </p>
      <p className="mt-3 text-step--1 font-bold uppercase tracking-wider text-foreground">
        {label}
      </p>
      {sublabel && <p className="mt-1 text-step--1 text-muted-foreground">{sublabel}</p>}
    </div>
  );
}

// NAP block formatted cleanly as an editorial info card
export function NAPBlock() {
  return (
    <div className="rounded-sm border border-border bg-card p-6 text-step--1">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
        <h3 className="display text-step-0 font-bold uppercase tracking-tight text-foreground">
          {site.businessName}
        </h3>
        <span className="rounded-xs bg-secondary px-2 py-0.5 text-step--1 font-semibold uppercase tracking-wider text-muted-foreground">
          Matches our Google listing
        </span>
      </div>
      <dl className="space-y-3">
        <div>
          <dt className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
            Business Name
          </dt>
          <dd className="mt-1 font-semibold text-foreground">{site.businessName}</dd>
        </div>
        <div>
          <dt className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
            Service Address
          </dt>
          <dd className="mt-1 text-foreground">{site.address}</dd>
        </div>
        <div>
          <dt className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
            Direct Phone
          </dt>
          <dd className="mt-1 font-bold text-primary">
            <PhoneLink />
          </dd>
        </div>
        <div>
          <dt className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
            Email
          </dt>
          <dd className="mt-1">
            <EmailLink />
          </dd>
        </div>
        <div>
          <dt className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
            Working Hours
          </dt>
          <dd className="mt-1 text-foreground">{site.hoursShort}</dd>
        </div>
      </dl>
    </div>
  );
}

// Review card in clean beige panel like reference
export function ReviewCard({
  name,
  town,
  service,
  text,
  date,
}: {
  name: string;
  town: string;
  service: string;
  text: string;
  /** When the review was left. Beats a repeated "5.0/5.0" for credibility. */
  date?: string;
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-sm border border-border bg-secondary p-6 sm:p-7">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-star text-star" />
            ))}
          </div>
          {date && <span className="text-step--1 text-muted-foreground">{date}</span>}
        </div>
        <p className="text-step-0 leading-relaxed text-foreground/90">"{text}"</p>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
        <div className="flex size-8 items-center justify-center rounded-sm bg-primary/10 text-step--1 font-bold text-primary">
          {name.charAt(0)}
        </div>
        <div className="text-step--1">
          <p className="font-bold text-foreground">
            {name} · <span className="font-normal text-muted-foreground">{town}</span>
          </p>
          <p className="mt-0.5 text-step--1 text-muted-foreground">{service}</p>
        </div>
      </div>
    </div>
  );
}

// Accordion FAQ item
export function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-sm border border-border bg-card p-5 transition-colors open:bg-surface-alt">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-step-0 font-bold uppercase tracking-wide text-foreground">
        <span>{q}</span>
        <span className="flex size-5 shrink-0 items-center justify-center rounded-xs bg-muted text-primary transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-3 text-step-0 leading-relaxed text-muted-foreground">{a}</p>
    </details>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, i) => (
        <FaqItem key={i} q={item.q} a={item.a} />
      ))}
    </div>
  );
}

// Large image-led final CTA banner inspired by the bottom CTA banner in reference
export function FinalCTA({
  heading = `Need a ${site.tradeSingular} in ${site.mainTown}?`,
  subheading = "Call now for a clear quote, or send a few details and we'll confirm the next step before any work begins.",
  children,
}: {
  heading?: string;
  subheading?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-dark-surface text-on-dark">
      <div className="band-pad mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <p className="text-step--1 font-bold uppercase tracking-widest text-mark">
                Available in {site.mainTown}
              </p>
            </div>
            <h2 className="display text-step-3 text-on-dark">{heading}</h2>
            <p className="mt-5 max-w-xl text-step-0 leading-relaxed text-on-dark-muted sm:text-base">
              {subheading}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={site.phoneHref}
                className="tabular inline-flex min-h-12 items-center gap-2 bg-accent px-6 text-step--1 font-bold uppercase tracking-[0.12em] text-accent-ink transition-colors hover:bg-accent/90"
              >
                <Phone className="size-4" />
                <span>Call now, {site.phone}</span>
              </a>
              <Link
                to="/contact"
                className="rule-t-on-dark rule-b-on-dark inline-flex min-h-12 items-center px-6 text-step--1 font-bold uppercase tracking-[0.12em] text-on-dark transition-colors hover:bg-on-dark-surface"
              >
                Request a Quote
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-step--1 text-on-dark-faint">
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-mark" /> Clear quote before work
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-mark" /> Guaranteed workmanship
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-mark" /> Fully insured
              </span>
            </div>
            {children}
          </div>

          <Photo
            label={`${site.businessName} van in ${site.mainTown}`}
            ratio="aspect-[4/3] lg:aspect-[5/4]"
            index={2}
          />
        </div>
      </div>
    </section>
  );
}

// JSON-LD <script> helper
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbJsonLd({ trail }: { trail: string[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((name, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
        })),
      }}
    />
  );
}

export { Section, SectionHeading, Eyebrow, CTAPair };
export function LinkBack({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="text-step--1 font-bold uppercase tracking-wider text-primary hover:underline"
    >
      ← {label}
    </Link>
  );
}
