// Lead submission — the single path every quote form on the site uses.
//
// The endpoint is a GoHighLevel Custom Value so each deployment posts to its
// own workflow/webhook without a code change. If it is unset (or still the raw
// merge field), we fail loudly rather than telling the customer their enquiry
// was sent when it was not — a silently dropped lead is the worst outcome this
// template can produce.

import { site } from "./site";

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string | undefined;
  postcode?: string | undefined;
  need: string;
  source: string;
};

export class LeadError extends Error {}

function endpoint(): string | null {
  const url = site.leadEndpoint;
  if (!url || url.includes("{{") || !/^https?:\/\//.test(url)) return null;
  return url;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const url = endpoint();

  if (!url) {
    if (import.meta.env.DEV) {
      console.warn("[leads] No lead_endpoint Custom Value set — payload:", payload);
      throw new LeadError(
        "No lead endpoint configured. Set the lead_endpoint Custom Value before going live.",
      );
    }
    throw new LeadError("We couldn't send that. Please call us and we'll take the details.");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
  });

  if (!res.ok) {
    throw new LeadError("We couldn't send that. Please call us and we'll take the details.");
  }
}
