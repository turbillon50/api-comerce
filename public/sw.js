/* APICommerce Service Worker — app shell + runtime caches */
const VERSION = "v1";
const SHELL = "apc-shell-" + VERSION;
const RUNTIME = "apc-runtime-" + VERSION;

const PRECACHE = ["/", "/manifest.webmanifest", "/icons/icon-192.svg", "/icons/icon-512.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL).then((cache) => cache.addAll(PRECACHE)).catch(() => null),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== SHELL && k !== RUNTIME)
            .map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for API + Next data
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/data")) {
    event.respondWith(
      fetch(req)
        .then((r) => {
          const copy = r.clone();
          caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => null);
          return r;
        })
        .catch(() => caches.match(req)),
    );
    return;
  }

  // Stale-while-revalidate for everything else
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetcher = fetch(req)
        .then((r) => {
          const copy = r.clone();
          caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => null);
          return r;
        })
        .catch(() => cached);
      return cached || fetcher;
    }),
  );
});
