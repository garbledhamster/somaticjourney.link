const CACHE_NAME = 'somatic-journey-cache-v1';
const urlsToCache = [
  'https://somaticjourney.link/', // Home page
  'https://somaticjourney.link/index.html', // Main HTML file
  'https://cdn.tailwindcss.com', // External CSS
  'https://github.com/garbledhamster/somaticjourney.link/blob/main/images/favicon.png?raw=true', // Favicon
  'https://raw.githubusercontent.com/garbledhamster/somaticjourney.link/main/cards.json', // JSON data
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
