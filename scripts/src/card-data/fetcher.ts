import { createHash } from "node:crypto";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

/** Issuer sites rate-limit aggressively; stay under one request per host at a time. */
const PER_HOST_DELAY_MS = 1_500;
const REQUEST_TIMEOUT_MS = 25_000;
const MAX_ATTEMPTS = 3;

export interface FetchResult {
  status: number | "ERR";
  error?: string;
  finalUrl?: string;
  etag?: string | null;
  lastModified?: string | null;
  body?: string;
}

const lastRequestByHost = new Map<string, number>();

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHostSlot(host: string): Promise<void> {
  const last = lastRequestByHost.get(host) ?? 0;
  const wait = last + PER_HOST_DELAY_MS - Date.now();
  if (wait > 0) await sleep(wait);
  lastRequestByHost.set(host, Date.now());
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export async function fetchPage(url: string): Promise<FetchResult> {
  const host = new URL(url).host;
  let lastError = "unknown";

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    await waitForHostSlot(host);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": USER_AGENT,
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
        },
      });

      const body = await response.text();

      // 429/5xx are transient; back off and retry rather than reporting link rot.
      if (
        (response.status === 429 || response.status >= 500) &&
        attempt < MAX_ATTEMPTS
      ) {
        lastError = `HTTP ${response.status}`;
        await sleep(attempt * 4_000);
        continue;
      }

      return {
        status: response.status,
        finalUrl: response.url,
        etag: response.headers.get("etag"),
        lastModified: response.headers.get("last-modified"),
        body,
      };
    } catch (error) {
      lastError =
        error instanceof Error ? `${error.name}: ${error.message}` : String(error);
      if (attempt < MAX_ATTEMPTS) await sleep(attempt * 4_000);
    } finally {
      clearTimeout(timer);
    }
  }

  return { status: "ERR", error: lastError };
}

/** Runs `task` over `items` with a bounded number of in-flight requests. */
export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  task: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        results[index] = await task(items[index]!, index);
      }
    }),
  );

  return results;
}
