import { site, services, towns, type Region } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  Clock,
  MapPin,
  Mail,
  Star,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Compact CTA buttons inspired by the reference design (small radius, solid green accent)
export function CallButton({
  className,
  label = "Call Now",
  icon = true,
}: {
  className?: string;
  label?: string;
  icon?: boolean;
}) {
  return (
    <a
      href={site.phoneHref}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm bg-accent px-5 text-step--1 font-bold uppercase tracking-wider text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.98] motion-reduce:active:scale-100",
        className,
      )}
    >
      {icon && <Phone className="size-3.5" />}
      <span>{label}</span>
    </a>
  );
}

export function QuoteButton({
  className,
  label = "Request a Quote",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Link
      to="/contact"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm border border-border bg-card px-5 text-step--1 font-bold uppercase tracking-wider text-foreground transition-all hover:bg-secondary hover:text-primary active:scale-[0.98] motion-reduce:active:scale-100",
        className,
      )}
    >
      <span>{label}</span>
      <ArrowUpRight className="size-3.5 text-muted-foreground" />
    </Link>
  );
}

export function CTAPair({
  className,
  quoteLabel = "Request a Quote",
  callLabel = "Call Now",
}: {
  className?: string;
  quoteLabel?: string;
  callLabel?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      <CallButton label={callLabel} />
      <QuoteButton label={quoteLabel} />
    </div>
  );
}

// Compact pill / tag
export function TrustPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-2.5 py-1 text-step--1 font-medium text-foreground/80",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Container with editorial max-width and clean, consistent padding.
// Vertical rhythm: py-14 (mobile) / sm:py-20 (desktop) - generous but calm.
export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-20", className)}
    >
      {children}
    </section>
  );
}

// Bold condensed uppercase eyebrow tag with bright green dot (from reference style)
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-center gap-3", className)}>
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      <p className="text-step--1 font-bold uppercase tracking-widest text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

// Bold condensed uppercase H2/H3 headings
export function SectionHeading({
  children,
  className,
  as: As = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <As
      className={cn(
        "font-display text-step-3 font-bold uppercase tracking-tight text-foreground",
        className,
      )}
    >
      {children}
    </As>
  );
}

// Small horizontal row of trust markers (from reference "logoipsum" / proof strip)
export function TrustStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-2 text-step--1 font-medium text-foreground/80",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
        <Star className="size-3.5 fill-star text-star" />
        {site.rating} Google rating ({site.reviewCount}+ reviews)
      </span>
      <span className="text-border">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3.5 text-primary" />
        {site.yearsExperience}+ years trading
      </span>
      <span className="text-border">·</span>
      <span className="inline-flex items-center gap-1">
        <ShieldCheck className="size-3.5 text-primary" />
        Fully insured
      </span>
      <span className="text-border">·</span>
      <span className="inline-flex items-center gap-1">
        <CheckCircle2 className="size-3.5 text-primary" />
        {site.accreditation}
      </span>
      {site.sameDay && (
        <>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
            <Clock className="size-3.5 text-primary" />
            Same-day availability
          </span>
        </>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-step--1 text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.to ? (
              <Link to={item.to} className="uppercase tracking-wider hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold uppercase tracking-wider text-foreground">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <span className="text-border">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Directional cue for a card that is itself a link. Deliberately not a filled
// circular badge - that reads as decoration bolted onto a card, not as a link.
export function CardArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-step--1 font-bold uppercase tracking-wider text-primary transition-transform group-hover:translate-x-0.5",
        className,
      )}
    >
      See details
      <ArrowUpRight className="size-3.5" />
    </span>
  );
}

// Neutral clean service icon with small green dot
export function ServiceIcon({ name }: { name?: string }) {
  return (
    <div className="flex size-8 items-center justify-center rounded-sm bg-primary/10 text-primary">
      <ShieldCheck className="size-4" />
    </div>
  );
}

export function AddressLine({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <MapPin className="size-3.5 shrink-0 text-primary" />
      {site.address}
    </span>
  );
}

export function PhoneLink({ className }: { className?: string }) {
  return (
    <a
      href={site.phoneHref}
      className={cn(
        "inline-flex items-center gap-1.5 font-bold text-primary hover:underline",
        className,
      )}
    >
      <Phone className="size-3.5" />
      {site.phone}
    </a>
  );
}

export function EmailLink({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${site.email}`}
      className={cn("inline-flex items-center gap-1.5 hover:underline", className)}
    >
      <Mail className="size-3.5" />
      {site.email}
    </a>
  );
}

// Helper lookups
export function getTown(slug: string) {
  return towns.find((t) => t.slug === slug);
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function nearbyTowns(slug: string, n = 3) {
  const idx = towns.findIndex((t) => t.slug === slug);
  if (idx === -1) return [];
  return towns.filter((_, i) => i !== idx).slice(0, n);
}

export function getRegionOf(slug: string): Region | undefined {
  return site.regions.find(
    (r) =>
      r.towns.some((t) => t.toLowerCase().replace(/\s/g, "-") === slug) ||
      r.towns.some((t) => t.toLowerCase() === slug),
  );
}
