// Demo content layer.
//
// The template's copy is written as GoHighLevel merge fields ({{ custom_values.x }})
// and bracketed placeholders ([Town], [First name]). That is correct for a live
// deployment, but it means the site is impossible to design, review or demo —
// every heading renders as literal template syntax.
//
// This layer substitutes realistic demo content for those tokens whenever the
// site is running in demo mode, and leaves them completely untouched otherwise,
// so the production build still ships the merge fields GoHighLevel expects.
//
//   dev server / `vite dev`           → demo content
//   `VITE_DEMO=1 vite build`          → demo content (client preview builds)
//   `vite build`                      → raw merge fields (GHL deployment)

export const DEMO_MODE: boolean =
  import.meta.env.DEV ||
  import.meta.env["VITE_DEMO"] === "1" ||
  import.meta.env["VITE_DEMO"] === "true";

// A believable mid-size roofing firm. Deliberately specific: real-sounding
// numbers and towns expose layout problems that lorem-ipsum hides.
const VALUES: Record<string, string> = {
  business_name: "Marden & Sons Roofing",
  trade: "roofing contractors",
  trade_singular: "roofer",
  main_town: "Sheffield",
  service_area: "South Yorkshire",
  phone: "0114 496 0182",
  email: "office@mardenroofing.co.uk",
  address: "Unit 7, Parkway Works, Sheffield S9 3BL",
  opening_hours: "Mon–Sat, 7am–6pm",

  google_rating: "4.9",
  review_count: "187",
  years_trading: "23",
  primary_accreditation: "NFRC Approved",
  licence_number: "NFRC 41182",
  insurance_statement: "£5m public liability, fully insured",

  lead_endpoint: "",
  hero_image_url: "",
  hero_image_alt: "Marden & Sons roofers replacing slate on a Sheffield terrace",

  town_1_name: "Sheffield",
  town_1_slug: "sheffield",
  town_1_local_note: "Base town — 20 min response",
  town_2_name: "Rotherham",
  town_2_slug: "rotherham",
  town_2_local_note: "8 miles — same-day callouts",
  town_3_name: "Chesterfield",
  town_3_slug: "chesterfield",
  town_3_local_note: "12 miles — daily coverage",
  town_4_name: "Barnsley",
  town_4_slug: "barnsley",
  town_4_local_note: "15 miles — next-day survey",
  town_5_name: "Doncaster",
  town_5_slug: "doncaster",
  town_5_local_note: "18 miles — weekly rounds",
  town_6_name: "Dronfield",
  town_6_slug: "dronfield",
  town_6_local_note: "9 miles — same-day callouts",

  service_1_name: "Roof repairs",
  service_1_slug: "roof-repairs",
  service_1_short_description:
    "Leaks, slipped slates and storm damage traced to the source and fixed properly, not patched.",
  service_1_price_range: "£180–£850",
  service_2_name: "Full re-roofing",
  service_2_slug: "re-roofing",
  service_2_short_description:
    "Strip, re-felt, re-batten and re-cover, with the old roof cleared and disposed of.",
  service_2_price_range: "£6,500–£14,000",
  service_3_name: "Flat roofing",
  service_3_slug: "flat-roofing",
  service_3_short_description:
    "GRP and EPDM flat roofs for extensions, garages and dormers, with a 20-year guarantee.",
  service_3_price_range: "£1,900–£5,400",
  service_4_name: "Guttering & fascias",
  service_4_slug: "guttering-fascias",
  service_4_short_description:
    "Replacement UPVC guttering, soffits and fascias fitted from a scaffold tower, not a ladder.",
  service_4_price_range: "£450–£2,200",
  service_5_name: "Chimney work",
  service_5_slug: "chimney-work",
  service_5_short_description:
    "Repointing, flaunching, lead flashing and removals, carried out by a roofer, not a bricklayer.",
  service_5_price_range: "£320–£1,600",
  service_6_name: "Emergency callouts",
  service_6_slug: "emergency-callouts",
  service_6_short_description:
    "Storm damage made safe and watertight the same day, seven days a week.",
  service_6_price_range: "From £145",
};

// Bracketed placeholders used for page-specific proof copy.
const BRACKETS: Record<string, string[]> = {
  "[First name]": ["Dawn", "Michael", "Priya", "Tom", "Eleanor", "Raj"],
  "[Town]": ["Sheffield", "Rotherham", "Chesterfield", "Barnsley", "Doncaster", "Dronfield"],
  "[Service]": [
    "Roof repairs",
    "Full re-roofing",
    "Flat roofing",
    "Guttering & fascias",
    "Chimney work",
    "Emergency callouts",
  ],
  "[Job Type]": [
    "Slipped slates & leak trace",
    "Full re-roof, 3-bed semi",
    "Garage flat roof replacement",
    "Chimney repoint & flashing",
    "Storm damage make-safe",
    "Guttering replacement",
  ],
  "[Property Type]": [
    "1930s semi-detached",
    "Victorian terrace",
    "1970s detached",
    "Stone cottage",
    "New-build detached",
    "End terrace",
  ],
  "[Review date]": [
    "March 2026",
    "January 2026",
    "November 2025",
    "October 2025",
    "August 2025",
    "June 2025",
  ],
  "[Time taken]": ["Half a day", "4 days", "2 days", "1 day", "3 hours", "1.5 days"],
  "[Rough cost bracket]": ["£380", "£9,400", "£2,750", "£640", "£145", "£1,180"],
};

// Sentences the template ships as instructions to whoever fills the site in.
// In demo mode they become plausible copy so layouts can be judged honestly.
const SENTENCES: Record<string, string> = {
  "Replace with a one-line summary of the problem and the result for this real job.":
    "Water was tracking down the chimney breast after every downpour; we traced it to failed lead flashing and had it watertight the same afternoon.",
  "Describe the problem the customer called about.":
    "The customer called after a brown stain appeared on the bedroom ceiling following a week of heavy rain.",
  "Describe what you found when you assessed it.":
    "The lead soakers around the chimney had lifted and the mortar fillet above them had cracked right through.",
  "Describe what you did to fix it.":
    "We stripped the old fillet, dressed new code 4 lead into a chased joint and repointed the stack in lime mortar.",
  "Replace with a real customer comment from this job.":
    "They found the actual leak in twenty minutes after two other firms had guessed at it. No mess left behind either.",
};

function demoFor(key: string): string | undefined {
  if (key in VALUES) return VALUES[key];
  return undefined;
}

/**
 * Replaces merge fields and placeholders with demo content. Outside demo mode
 * this is an identity function, so the production bundle is byte-identical to
 * the hand-written template.
 */
export function demoText(input: string, index = 0): string {
  if (!DEMO_MODE) return input;

  let out = input.replace(/\{\{\s*custom_values\.([a-z0-9_]+)\s*\}\}/gi, (match, key: string) => {
    const value = demoFor(key);
    return value === undefined ? match : value;
  });

  for (const [token, options] of Object.entries(BRACKETS)) {
    if (out.includes(token)) {
      out = out.split(token).join(options[index % options.length] ?? options[0]!);
    }
  }

  if (SENTENCES[out]) out = SENTENCES[out]!;

  // Review and project copy ships as "Replace with a real review. <sample>" —
  // in demo mode the instruction prefix goes, the sample sentence stays.
  out = out.replace(/^Replace with a real (?:review|customer comment)\.\s*/i, "");

  return out;
}

/** Walks any data structure, applying demoText to every string it contains. */
export function withDemoContent<T>(value: T, index = 0): T {
  if (!DEMO_MODE) return value;

  if (typeof value === "string") return demoText(value, index) as T;

  if (Array.isArray(value)) {
    // The array index seeds placeholder rotation, so three project cards read
    // as three different jobs rather than the same one repeated.
    return value.map((item, i) => withDemoContent(item, i)) as T;
  }

  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = withDemoContent(v, index);
    }
    return out as T;
  }

  return value;
}

// Demo photography. Only ever used in demo mode — a GoHighLevel build renders
// the neutral placeholder surface instead, and clients supply their own work.
const DEMO_PHOTOS = [
  // Trade work and real properties only — no lifestyle interiors, no laptops.
  // Verified to load; used exclusively in demo mode.
  "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1200&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=1200&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=1200&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?w=1200&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=70&auto=format&fit=crop",
];

/**
 * A demo photograph. Pass `index` when rendering a list — it guarantees
 * neighbouring cards get different photos, which hashing alone cannot.
 */
export function demoPhoto(seed: string, index?: number): string | undefined {
  if (!DEMO_MODE) return undefined;
  if (typeof index === "number") return DEMO_PHOTOS[index % DEMO_PHOTOS.length]!;
  // FNV-1a: spreads similar captions ("Chimney work job" / "Emergency callouts
  // job") across different photos instead of colliding on the same one.
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return DEMO_PHOTOS[hash % DEMO_PHOTOS.length]!;
}
