import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The type scale is defined in styles.css as --text-step--1 ... --text-step-4,
// which Tailwind turns into text-step--1 ... text-step-4 utilities. tailwind-merge
// cannot tell a custom `text-*` size from a `text-*` colour, so without this it
// silently drops the size class whenever a colour is merged alongside it - which
// is how every section heading ended up rendering at the browser default.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["step--1", "step-0", "step-1", "step-2", "step-3", "step-4"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
