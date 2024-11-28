const CACHE_NAME = 'somatic-journey-cache-v1';
const urlsToCache = [
  '/',
  '/index.html', // your main HTML file
  'https://cdn.tailwindcss.com',
  'https://github.com/garbledhamster/somaticjourney.link/blob/main/images/favicon.png?raw=true',
  'https://raw.githubusercontent.com/garbledhamster/somaticjourney.link/main/cards.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhiteList = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
