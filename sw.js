const CACHE_NAME = "sj-resources-cache-v1";
const OFFLINE_URLS = [
  "/",
  "/index.html",
  "images/favicon.png",
  "images/android-chrome-192x192.png",
  "images/android-chrome-512x512.png",
  "images/apple-touch-icon.png",
  "images/favicon-32x32.png",
  "images/favicon-16x16.png",
  "images/favicon.ico",
  "images/site.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
