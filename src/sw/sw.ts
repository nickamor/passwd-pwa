const version = 2.0;
const appCacheKey = `cache@${version}`;

const log = console.log.bind(console, "[Service Worker]");

// App shell URLs to pre-cache
const appShellUrls = [
  "/",
  "/index.html",
  "/app.js",
  "/app/app.css",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/api/options",
];

self.addEventListener("install", (event) => {
  log("installing...");

  event.waitUntil(
    caches.open(appCacheKey).then((cache) => cache.addAll(appShellUrls)),
  );
});

self.addEventListener("activate", (event) => {
  log("activating...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const deleteOldCaches = Promise.all(
        cacheNames
          .filter((cache) => cache !== appCacheKey)
          .map((cacheName) => caches.delete(cacheName)),
      );
      return deleteOldCaches.then(() => self.clients.claim());
    }),
  );
});

const fetchWithCache = (request) =>
  caches.match(request).then((response) => response || fetch(request));

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.origin !== location.origin) return;

  // Cache-first for static assets
  const coldOnes = [
    "/",
    "/index.html",
    "/app.js",
    "/app/app.css",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png",
  ];
  if (coldOnes.includes(url.pathname)) {
    event.respondWith(fetchWithCache(event.request));
    return;
  }

  // Virtual API for /api/options (GET and POST)
  if (url.pathname === "/api/options") {
    if (event.request.method === "GET") {
      event.respondWith(fetchWithCache(event.request));
      return;
    }

    // POST: write to cache
    if (event.request.method === "POST") {
      event.respondWith(
        event.request.json().then((body) => {
          const response = new Response(JSON.stringify(body), {
            status: 200,
            statusText: "OK",
            headers: { "Content-Type": "application/json" },
          });
          return caches.open(appCacheKey).then((cache) => {
            cache.put(url.href, response.clone());
            return response;
          });
        }),
      );
    }
  }
});
