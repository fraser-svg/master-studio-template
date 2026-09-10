import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, Clock, MapPin, Upload } from "lucide-react";
import { site } from "@/lib/site";
import { LeadError, submitLead } from "@/lib/leads";
import {
  Section,
  SectionHeading,
  Eyebrow,
  CallButton,
  PhoneLink,
  EmailLink,
} from "@/components/site";
import { MapPlaceholder, NAPBlock, JsonLd, BreadcrumbJsonLd } from "@/components/sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    title: `Contact ${site.businessName} | ${site.trade} in ${site.mainTown}`,
    meta: [
      {
        name: "description",
        content: `Contact ${site.businessName}. Call ${site.phone} for a clear quote, or send a few details about the job and we'll tell you what happens next.`,
      },
      {
        property: "og:title",
        content: `Contact ${site.businessName}`,
      },
      {
        property: "og:description",
        content: `Call ${site.phone} or send a quote request.`,
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  phone: z.string().min(7, "A contact number helps us reply fast"),
  postcode: z.string().min(4, "Your postcode tells us if you're in our area"),
  need: z.string().min(10, "Tell us a little about what's wrong"),
});

type FormValues = z.infer<typeof schema>;

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await submitLead({ ...data, source: "contact-page" });
      toast.success("Thanks - we'll be in touch shortly.");
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
    <>
      <Section className="border-b border-border bg-background">
        <Eyebrow>Direct contact</Eyebrow>
        <SectionHeading as="h1" scale="hero">
          Contact {site.businessName}
        </SectionHeading>
        <p className="mt-5 max-w-2xl text-step-0 leading-relaxed text-muted-foreground">
          For urgent jobs or fastest assistance, call {site.phone} directly. For booked estimates,
          fill in the short quote form below and we will confirm the next step.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          {/* Left contact details */}
          <div className="space-y-4">
            <a
              href={site.phoneHref}
              className="flex items-center gap-4 rounded-sm border border-border bg-secondary p-5 hover:border-primary/40"
            >
              <div className="flex size-10 items-center justify-center rounded-sm bg-accent text-accent-foreground">
                <Phone className="size-5" />
              </div>
              <div>
                <p className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
                  Direct Line
                </p>
                <p className="mt-0.5 display text-base font-bold uppercase text-foreground">
                  {site.phone}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-sm border border-border bg-card p-5">
              <div className="flex size-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-step--1 font-bold uppercase tracking-wider text-muted-foreground">
                  Email
                </p>
                <EmailLink className="text-step-0 font-semibold" />
              </div>
            </div>

            <div className="rounded-sm border border-border bg-card p-5 text-step-0">
              <div className="flex items-center gap-2 font-bold uppercase text-foreground">
                <Clock className="size-4 text-primary" />
                <span>Operating hours</span>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between">
                    <span>{h.day}</span>
                    <span className="font-medium text-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm border border-border bg-card p-5 text-step-0">
              <div className="flex items-center gap-2 font-bold uppercase text-foreground">
                <MapPin className="size-4 text-primary" />
                <span>Service base</span>
              </div>
              <p className="mt-3 text-muted-foreground">
                Based in {site.mainTown}, covering {site.serviceArea}.
              </p>
            </div>
          </div>

          {/* Right quote request form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-sm border border-border bg-card p-7 sm:p-8"
          >
            <div>
              <p className="text-step--1 font-bold uppercase tracking-widest text-primary">
                Fast Quote
              </p>
              <h2 className="mt-2 display text-xl font-bold uppercase tracking-tight text-foreground">
                Tell us about the job
              </h2>
            </div>

            <Field label="Your name" error={errors.name?.message}>
              <input
                {...register("name")}
                className="w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary"
                placeholder="Full name"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone number" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary"
                  placeholder={site.phone}
                />
              </Field>

              <Field label="Postcode / Town" error={errors.postcode?.message}>
                <input
                  {...register("postcode")}
                  className="w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary"
                  placeholder={site.mainTown}
                />
              </Field>
            </div>

            <Field label="What do you need help with?" error={errors.need?.message}>
              <textarea
                {...register("need")}
                rows={4}
                className="w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-step-0 text-foreground transition-colors focus:border-primary"
                placeholder="Describe the problem, symptom, or job in your own words..."
              />
            </Field>

            <div className="rounded-sm border border-dashed border-border bg-surface-alt-soft p-4 text-step-0 text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-foreground">
                <Upload className="size-4 text-primary" /> Optional photo upload
              </span>
              <p className="mt-1.5 text-step--1">
                Send a photo if it helps us understand the job before we head over.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-sm bg-accent py-3 text-step-0 font-bold uppercase tracking-wider text-accent-foreground transition-all hover:bg-accent/90 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Request a Quote"}
            </button>

            <p className="text-center text-step-0 text-muted-foreground">
              Prefer to speak directly? <PhoneLink className="font-bold" />
            </p>
          </form>
        </div>

        {/* Map & NAP */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <MapPlaceholder height="h-72" />
          <NAPBlock />
        </div>
      </Section>

      <BreadcrumbJsonLd trail={["Home", "Contact"]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${site.businessName}`,
        }}
      />
    </>
  );
}

function Field({
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
