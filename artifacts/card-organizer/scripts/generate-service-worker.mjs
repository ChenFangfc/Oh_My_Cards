import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDirectory, "..");
const distRoot = path.resolve(appRoot, "dist/public");
const serviceWorkerPath = path.join(distRoot, "service-worker.js");

const excludedFileNames = new Set([".DS_Store", "service-worker.js"]);

// The shell is everything needed to boot the app offline. Card artwork and the
// full-size app icon are deliberately excluded: 22 MB of images would otherwise
// be force-downloaded on install and again on every redeploy, so they are left
// to the runtime cacheFirst handler.
const coreShellPatterns = [/^index\.html$/, /^assets\/.+\.(?:js|css)$/];
const optionalShellPatterns = [
  /^manifest\.webmanifest$/,
  /^favicon-\d+\.png$/,
  /^icon-(?:192|512|maskable-512)\.png$/,
];

function matchesAny(patterns, urlPath) {
  return patterns.some((pattern) => pattern.test(urlPath));
}

async function collectFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (excludedFileNames.has(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function toUrlPath(filePath) {
  return path.relative(distRoot, filePath).split(path.sep).join("/");
}

async function hashFile(filePath) {
  const content = await fs.readFile(filePath);
  return createHash("sha256").update(content).digest("hex");
}

const files = (await collectFiles(distRoot)).sort((left, right) =>
  toUrlPath(left).localeCompare(toUrlPath(right)),
);

const versionHash = createHash("sha256");
const coreUrls = ["./"];
const optionalUrls = [];

// The version covers the whole published tree, not just the shell, so that any
// deploy produces a byte-different service worker and reaches installed clients.
for (const file of files) {
  const urlPath = toUrlPath(file);
  versionHash.update(urlPath);
  versionHash.update(await hashFile(file));

  if (matchesAny(coreShellPatterns, urlPath)) {
    coreUrls.push(urlPath);
    continue;
  }

  if (matchesAny(optionalShellPatterns, urlPath)) {
    optionalUrls.push(urlPath);
  }
}

if (coreUrls.length === 1) {
  throw new Error(
    `No core shell assets found in ${distRoot}. Run the Vite build first.`,
  );
}

const version = versionHash.digest("hex").slice(0, 16);

const serviceWorker = `const CACHE_PREFIX = "oh-my-cards";
const CACHE_VERSION = "${version}";
const PRECACHE_CACHE = \`\${CACHE_PREFIX}-precache-\${CACHE_VERSION}\`;
const RUNTIME_CACHE = \`\${CACHE_PREFIX}-runtime-\${CACHE_VERSION}\`;
// Card artwork is addressed by a stable filename and never changes between
// deploys, so it lives outside the versioned caches and survives activation.
const MEDIA_CACHE = \`\${CACHE_PREFIX}-media\`;
const RETAINED_CACHES = [PRECACHE_CACHE, RUNTIME_CACHE, MEDIA_CACHE];
const CORE_URLS = ${JSON.stringify(coreUrls, null, 2)};
const OPTIONAL_URLS = ${JSON.stringify(optionalUrls, null, 2)};

function scopedUrl(path) {
  return new URL(path, self.registration.scope).toString();
}

// Hashed build output is immutable, so it can come from the HTTP cache. The
// unhashed shell must bypass it or a redeploy would precache the stale copy.
function precacheRequest(url) {
  return /^assets\\//.test(url)
    ? new Request(scopedUrl(url))
    : new Request(scopedUrl(url), { cache: "reload" });
}

function shouldBypassCache(request) {
  if (request.cache === "no-store") return true;

  const url = new URL(request.url);
  return /card-rules|rules-manifest|rule-set|catalog-update/i.test(url.pathname);
}

async function precacheShell() {
  const cache = await caches.open(PRECACHE_CACHE);

  // Rejects if any core asset fails, which fails install and leaves the
  // previous — working — service worker in control.
  await cache.addAll(CORE_URLS.map(precacheRequest));

  await Promise.allSettled(
    OPTIONAL_URLS.map((url) => cache.add(precacheRequest(url))),
  );
}

function runtimeCacheName(request) {
  return request.destination === "image" || request.destination === "font"
    ? MEDIA_CACHE
    : RUNTIME_CACHE;
}

// Storage quota is finite and card artwork alone exceeds it on some devices, so
// a failed write must never turn a good network response into an error.
async function cacheResponse(request, response) {
  try {
    const cache = await caches.open(runtimeCacheName(request));
    await cache.put(request, response);
  } catch {
    // Best effort only.
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cacheResponse(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;

    if (request.mode === "navigate") {
      const shell = await caches.match(scopedUrl("./"));
      if (shell) return shell;
    }

    throw error;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    await cacheResponse(request, response.clone());
  }
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheShell().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX))
            .filter((key) => !RETAINED_CACHES.includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (shouldBypassCache(event.request)) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(cacheFirst(event.request));
});
`;

await fs.writeFile(serviceWorkerPath, `${serviceWorker}\n`);
console.log(
  `Generated service-worker.js precaching ${coreUrls.length} core and ${optionalUrls.length} optional shell URLs (${version}).`,
);
