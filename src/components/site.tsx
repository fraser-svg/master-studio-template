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
        "inline-flex min-h-12 items-center justify-center gap-2 bg-accent px-6 text-step--1 font-bold uppercase tracking-[0.12em] text-accent-ink transition-colors hover:bg-accent/90",
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
        "rule-heavy-t rule-heavy-b inline-flex min-h-12 items-center justify-center gap-2 border-x-0 bg-transparent px-6 text-step--1 font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-surface-alt",
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
        "rule-t rule-b inline-flex items-center gap-1.5 bg-card px-2.5 py-1 text-step--1 font-medium text-foreground/80",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Band: the page's structural unit.
//
// A band is a full-bleed solid surface with a contained inner column. The
// homepage is a SEQUENCE of bands, and the sequence is the design: light,
// alt and dark alternating, with the vertical size varying so the page
// compresses and expands instead of repeating one padding nine times.
//
// `tone` never takes an opacity. The old code used bg-secondary/40 against
// bg-background - 0.955 vs 0.915 lightness, a difference you cannot see -
// which is why the whole page read as one flat field.
// ---------------------------------------------------------------------------

export type BandTone = "light" | "alt" | "deep" | "dark";
export type BandSize = "tight" | "normal" | "tall";

const BAND_TONE: Record<BandTone, string> = {
  light: "bg-background text-foreground",
  alt: "bg-surface-alt text-foreground",
  deep: "bg-surface-deep text-foreground",
  dark: "bg-dark-surface text-on-dark",
};

const BAND_SIZE: Record<BandSize, string> = {
  tight: "band-pad-tight",
  normal: "band-pad",
  tall: "band-pad-tall",
};

export function Band({
  children,
  tone = "light",
  size = "normal",
  className,
  innerClassName,
  id,
  as: As = "section",
  full = false,
}: {
  children: React.ReactNode;
  tone?: BandTone;
  size?: BandSize;
  className?: string;
  innerClassName?: string;
  id?: string;
  as?: "section" | "div";
  /** Edge-to-edge content with no inner column - for full-bleed imagery. */
  full?: boolean;
}) {
  return (
    <As id={id} className={cn(BAND_TONE[tone], full ? "" : BAND_SIZE[size], className)}>
      {full ? (
        children
      ) : (
        <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6", innerClassName)}>
          {children}
        </div>
      )}
    </As>
  );
}

// Section furniture: a rule that runs across the column with the heading
// sitting on it, and an optional link at the far end. This is what gives the
// page its ledger feel, and it is one component so the rhythm cannot drift
// section to section.
export function BandHead({
  children,
  aside,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        onDark ? "rule-t-on-dark" : "rule-t",
        "flex flex-col justify-between gap-3 pt-4 sm:flex-row sm:items-baseline sm:gap-8",
        className,
      )}
    >
      {children}
      {aside}
    </div>
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
    <section id={id} className={cn("band-pad mx-auto w-full max-w-6xl px-5 sm:px-6", className)}>
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
      <span aria-hidden="true" className="h-[var(--rule-weight-heavy)] w-8 bg-accent" />
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
  scale = "section",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /**
   * "section" is every heading on the page. "hero" is the single loudest
   * moment, and there must be exactly ONE per page - see .impeccable.md.
   */
  scale?: "section" | "hero";
}) {
  return (
    <As className={cn("display", scale === "hero" ? "text-step-4" : "text-step-3", className)}>
      {children}
    </As>
  );
}

// Small horizontal row of trust markers (from reference "logoipsum" / proof strip)
export function TrustStrip({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  // Four facts, set as type on a divided rail. Deliberately no icons: a row of
  // 14px lucide glyphs separated by middle dots is a generated-page signature,
  // and none of them carry information the words do not.
  const facts = [
    { lead: site.rating, rest: `Google rating, ${site.reviewCount}+ reviews` },
    { lead: site.yearsExperience, rest: "years trading" },
    { lead: site.accreditation, rest: `Licence ${site.licenceNumber}` },
    { lead: "Insured", rest: "Certificate on request" },
  ];

  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4",
        onDark ? "text-on-dark" : "text-foreground",
        className,
      )}
    >
      {facts.map((f) => (
        <div key={f.rest} className="flex items-baseline gap-2">
          <dt className="tabular text-step--1 font-bold uppercase tracking-[0.08em]">{f.lead}</dt>
          <dd
            className={cn(
              "text-step--1 uppercase tracking-[0.08em]",
              onDark ? "text-on-dark-muted" : "text-muted-foreground",
            )}
          >
            {f.rest}
          </dd>
        </div>
      ))}
    </dl>
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
