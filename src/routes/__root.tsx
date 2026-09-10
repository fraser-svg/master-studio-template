import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import appCss from "../styles.css?url";
import { reportVibeError } from "../lib/vibe-error-reporting";
import { site, siteStyle, type SiteStyle } from "../lib/site";
import { PhoneLink, EmailLink } from "../components/site";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "../components/sections";
import { demoText } from "../lib/demo";

function NotFoundComponent() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="display text-7xl font-bold uppercase tracking-tight text-primary">404</h1>
      <h2 className="mt-2 text-xl font-bold uppercase text-foreground">Page not found</h2>
      <p className="mt-2 text-step-0 text-muted-foreground">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-sm bg-accent px-4 py-2.5 text-step--1 font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
      >
        Back to Home
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportVibeError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="display text-2xl font-bold uppercase tracking-tight text-foreground">
        This page didn't load
      </h1>
      <p className="mt-2 text-step-0 text-muted-foreground">
        Something went wrong. Refresh or head back to the homepage.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rounded-sm bg-accent px-4 py-2 text-step--1 font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent/90"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-sm border border-border bg-card px-4 py-2 text-step--1 font-bold uppercase tracking-wider text-foreground hover:bg-muted"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Areas", to: "/areas" },
  { label: "Recent Work", to: "/projects" },
  { label: "Reviews", to: "/reviews" },
  { label: "About", to: "/about" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header-surface rule-heavy-b sticky top-0 z-40 w-full">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <span aria-hidden="true" className="size-7 bg-accent lg:size-8" />
          <span className="display text-step-0 whitespace-nowrap xl:text-step-1">
            {site.businessName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:ml-6 lg:flex xl:ml-12 xl:gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "font-bold" }}
              className="header-ink-muted relative whitespace-nowrap text-step--1 font-medium transition-opacity hover:opacity-100 xl:text-step-0"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Small CTA Button (inspired by green pill button in ref) */}
        <div className="ml-auto flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="tabular hidden min-h-12 items-center gap-2 whitespace-nowrap bg-accent px-5 text-step--1 font-bold uppercase tracking-[0.12em] text-accent-ink transition-colors hover:bg-accent/90 sm:inline-flex"
          >
            <span>Call {site.phone}</span>
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="-mr-2 flex size-11 items-center justify-center lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <nav className="header-surface rule-t px-4 py-5 lg:hidden">
          <div className="grid gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center px-3 text-step--1 font-bold uppercase tracking-[0.12em]"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="tabular mt-3 flex min-h-11 items-center justify-center gap-2 bg-accent text-step--1 font-bold uppercase tracking-[0.12em] text-accent-ink"
            >
              <Phone className="size-4" />
              Call Now · {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-dark-surface text-on-dark">
      <div className="band-pad mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
          <div>
            <p className="display text-step-2 text-on-dark">{site.businessName}</p>
            <p className="mt-3 max-w-xs text-step--1 leading-relaxed text-on-dark-faint">
              {site.trade} serving {site.mainTown} and nearby areas. Honest quotes, realistic
              arrival windows, and guaranteed workmanship.
            </p>
            <div className="mt-5 space-y-2 text-step--1 text-on-dark-muted">
              <p>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-1.5 font-bold text-mark hover:underline"
                >
                  <Phone className="size-3.5" />
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
              </p>
              <p className="text-on-dark-faint">{site.hoursShort}</p>
              <p className="text-on-dark-faint">Service area business based in {site.mainTown}</p>
            </div>
          </div>

          <FooterCol
            title="Navigation"
            links={[
              { label: "Services", to: "/services" },
              { label: "Areas Covered", to: "/areas" },
              { label: "Recent Work", to: "/projects" },
              { label: "Reviews", to: "/reviews" },
              { label: "About", to: "/about" },
              { label: "FAQs", to: "/faqs" },
              { label: "Contact", to: "/contact" },
            ]}
          />

          <FooterCol
            title="Core Services"
            links={[
              {
                label: demoText("{{ custom_values.service_1_name }}"),
                to: demoText("/services/{{ custom_values.service_1_slug }}"),
              },
              {
                label: demoText("{{ custom_values.service_2_name }}"),
                to: demoText("/services/{{ custom_values.service_2_slug }}"),
              },
              {
                label: demoText("{{ custom_values.service_3_name }}"),
                to: demoText("/services/{{ custom_values.service_3_slug }}"),
              },
              {
                label: demoText("{{ custom_values.service_4_name }}"),
                to: demoText("/services/{{ custom_values.service_4_slug }}"),
              },
              { label: "All services →", to: "/services" },
            ]}
          />

          <FooterCol
            title="Areas"
            links={[
              { label: "All areas", to: "/areas" },
              {
                label: demoText("{{ custom_values.town_1_name }}"),
                to: demoText("/areas/{{ custom_values.town_1_slug }}"),
              },
              {
                label: demoText("{{ custom_values.town_2_name }}"),
                to: demoText("/areas/{{ custom_values.town_2_slug }}"),
              },
              {
                label: demoText("{{ custom_values.town_3_name }}"),
                to: demoText("/areas/{{ custom_values.town_3_slug }}"),
              },
              {
                label: demoText("{{ custom_values.town_4_name }}"),
                to: demoText("/areas/{{ custom_values.town_4_slug }}"),
              },
            ]}
          />
        </div>

        {/* Small CTA strip in footer */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-y border-on-dark-border py-6 sm:flex-row sm:items-center">
          <div>
            <p className="display text-step-0 font-bold uppercase tracking-tight text-on-dark">
              Need a {site.tradeSingular} in {site.mainTown}?
            </p>
            <p className="mt-1.5 text-step--1 text-on-dark-faint">
              Clear quotes before work begins. No callout surprises.
            </p>
          </div>
          <div className="flex gap-2.5">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-1.5 rounded-sm bg-accent px-5 py-2.5 text-step--1 font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <Phone className="size-3.5" />
              Call Now
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-sm border border-on-dark-border bg-on-dark-surface px-5 py-2.5 text-step--1 font-bold uppercase tracking-wider text-on-dark transition-colors hover:bg-on-dark-surface"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-step--1 text-on-dark-faint sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.businessName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="transition-colors hover:text-on-dark">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-on-dark">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="display text-step--1 font-bold uppercase tracking-wider text-on-dark">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-step--1">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-on-dark-faint transition-colors hover:text-on-dark">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-dark bg-brand p-2 lg:hidden"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-2">
        <a
          href={site.phoneHref}
          className="flex min-h-11 flex-[1.4] items-center justify-center gap-2 rounded-sm bg-accent text-step--1 font-bold uppercase tracking-wider text-accent-foreground"
        >
          <Phone className="size-4" />
          Call {site.phone}
        </a>
        <Link
          to="/contact"
          className="flex min-h-11 flex-1 items-center justify-center rounded-sm border border-on-dark-border bg-on-dark-surface text-step--1 font-bold uppercase tracking-wider text-on-dark"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}

// Google Fonts pairing per style. Only the active style's families are
// requested, so a client site never downloads three superfamilies.
const STYLE_FONT_HREF: Record<SiteStyle, string> = {
  steel:
    "https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&display=swap",
  ink: "https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap",
  board:
    "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&display=swap",
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.trade} in ${site.mainTown} | ${site.businessName}` },
      {
        name: "description",
        content: `Reliable ${site.trade} in ${site.mainTown}. Call ${site.businessName} for honest quotes, fully insured work, and same-day emergency help across ${site.serviceArea}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: STYLE_FONT_HREF[siteStyle] },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    // The style is a Custom Value: "steel" (default), "ink" or "board".
    // Every difference between them is a token under :root[data-style] in
    // src/styles.css - see .impeccable.md.
    <html lang="en" data-style={siteStyle}>
      <head>
        <HeadContent />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: site.businessName,
            telephone: site.phone,
            email: site.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address,
            },
            areaServed: site.serviceArea,
            priceRange: "££",
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased pb-callbar lg:pb-0">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
        {/* Every quote form reports through sonner. Without this mounted the
            forms fail and succeed in total silence. */}
        <Toaster position="top-center" richColors closeButton />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
