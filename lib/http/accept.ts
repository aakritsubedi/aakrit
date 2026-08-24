/**
 * RFC 9110 §12.5.1 Accept parsing and proactive content negotiation.
 *
 * Deliberately dependency-free and side-effect-free so it can run in the edge
 * runtime (middleware) and be unit-tested directly.
 */

export const HTML_MEDIA_TYPE = "text/html";
export const MARKDOWN_MEDIA_TYPE = "text/markdown";

export type MediaRange = {
  type: string;
  subtype: string;
  /** Quality factor, 0–1. Absent q means q=1. */
  q: number;
  /** `*​/*` = 0, `type/*` = 1, `type/subtype` = 2. */
  specificity: 0 | 1 | 2;
  /** Index of this range within the Accept header, used to break q ties. */
  position: number;
};

/** Splits on commas that are not inside a quoted string. */
function splitMediaRanges(header: string): string[] {
  const parts: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < header.length; i += 1) {
    const char = header[i];

    if (char === '"' && header[i - 1] !== "\\") {
      inQuotes = !inQuotes;
      current += char;
      continue;
    }

    if (char === "," && !inQuotes) {
      parts.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  parts.push(current);
  return parts;
}

function parseQuality(params: string[]): number {
  for (const param of params) {
    const [rawName, ...rawValue] = param.split("=");
    if (rawName.trim().toLowerCase() !== "q") continue;

    const value = Number.parseFloat(rawValue.join("=").trim());
    if (Number.isNaN(value)) return 1;
    // RFC 9110 caps q at three decimal places in [0, 1]; clamp rather than reject.
    return Math.min(1, Math.max(0, value));
  }

  return 1;
}

export function parseAccept(header: string | null | undefined): MediaRange[] {
  const raw = (header ?? "").trim();
  // No Accept header is equivalent to accepting anything (RFC 9110 §12.5.1).
  if (raw === "") {
    return [{ type: "*", subtype: "*", q: 1, specificity: 0, position: 0 }];
  }

  const ranges: MediaRange[] = [];

  splitMediaRanges(raw).forEach((part, index) => {
    const [rawMediaType, ...params] = part.split(";");
    const mediaType = rawMediaType.trim().toLowerCase();
    if (mediaType === "") return;

    const slash = mediaType.indexOf("/");
    if (slash === -1) return;

    const type = mediaType.slice(0, slash);
    const subtype = mediaType.slice(slash + 1);
    if (type === "" || subtype === "") return;
    // "*/json" is not a valid media range.
    if (type === "*" && subtype !== "*") return;

    const specificity: 0 | 1 | 2 =
      type === "*" && subtype === "*" ? 0 : subtype === "*" ? 1 : 2;

    ranges.push({
      type,
      subtype,
      q: parseQuality(params),
      specificity,
      position: index,
    });
  });

  if (ranges.length === 0) {
    return [{ type: "*", subtype: "*", q: 1, specificity: 0, position: 0 }];
  }

  return ranges;
}

function matchRange(range: MediaRange, type: string, subtype: string): boolean {
  if (range.specificity === 0) return true;
  if (range.type !== type) return false;
  return range.specificity === 1 || range.subtype === subtype;
}

export type OfferMatch = {
  mediaType: string;
  q: number;
  specificity: 0 | 1 | 2;
  position: number;
};

/**
 * Resolves the quality the client assigned to a single media type. The most
 * specific matching range wins outright — `text/html;q=0, *​/*` rejects HTML
 * even though the wildcard carries a higher q.
 */
export function matchOffer(
  ranges: MediaRange[],
  offer: string
): OfferMatch | null {
  const normalized = offer.trim().toLowerCase();
  const slash = normalized.indexOf("/");
  if (slash === -1) return null;

  const type = normalized.slice(0, slash);
  const subtype = normalized.slice(slash + 1);

  let best: MediaRange | null = null;

  for (const range of ranges) {
    if (!matchRange(range, type, subtype)) continue;
    if (best === null) {
      best = range;
      continue;
    }
    if (range.specificity > best.specificity) {
      best = range;
      continue;
    }
    if (range.specificity === best.specificity && range.q > best.q) {
      best = range;
    }
  }

  if (best === null) return null;

  return {
    mediaType: normalized,
    q: best.q,
    specificity: best.specificity,
    position: best.position,
  };
}

/**
 * Picks the best of `offers` for the given Accept header.
 *
 * `offers` is in server-preference order and is used as the final tie-break,
 * so callers control what a wildcard client (`Accept: *​/*`) receives.
 *
 * Returns `null` when the client accepts none of the offers, which callers
 * should surface as `406 Not Acceptable`.
 */
export function negotiateMediaType(
  header: string | null | undefined,
  offers: readonly string[]
): string | null {
  const ranges = parseAccept(header);

  let winner: OfferMatch | null = null;

  for (const offer of offers) {
    const match = matchOffer(ranges, offer);
    if (match === null || match.q === 0) continue;

    if (
      winner === null ||
      match.q > winner.q ||
      (match.q === winner.q && match.position < winner.position)
    ) {
      winner = match;
    }
  }

  return winner === null ? null : winner.mediaType;
}
