import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDirectory, "..");
const distRoot = path.resolve(appRoot, "dist/public");
const serviceWorkerPath = path.join(distRoot, "service-worker.js");

const excludedFileNames = new Set([".DS_Store", "service-worker.js"]);

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
const urls = ["./"];

for (const file of files) {
  const urlPath = toUrlPath(file);
  urls.push(urlPath);
  versionHash.update(urlPath);
  versionHash.update(await hashFile(file));
}

const version = versionHash.digest("hex").slice(0, 16);

const serviceWorker = `const CACHE_PREFIX = "oh-my-cards";
const CACHE_VERSION = "${version}";
const PRECACHE_CACHE = \`\${CACHE_PREFIX}-precache-\${CACHE_VERSION}\`;
const RUNTIME_CACHE = \`\${CACHE_PREFIX}-runtime-\${CACHE_VERSION}\`;
const PRECACHE_URLS = ${JSON.stringify(urls, null, 2)};

function scopedUrl(path) {
  return new URL(path, self.registration.scope).toString();
}

function shouldBypassCache(request) {
  if (request.cache === "no-store") return true;

  const url = new URL(request.url);
  return /card-rules|rules-manifest|rule-set|catalog-update/i.test(url.pathname);
}

async function cacheAll(urls) {
  const cache = await caches.open(PRECACHE_CACHE);
  await Promise.allSettled(
    urls.map((url) =>
      cache.add(new Request(scopedUrl(url), { cache: "reload" })),
    ),
  );
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
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
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheAll(PRECACHE_URLS).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX))
            .filter((key) => key !== PRECACHE_CACHE && key !== RUNTIME_CACHE)
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
  `Generated service-worker.js with ${urls.length} precached URLs (${version}).`,
);
