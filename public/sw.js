const CACHE_NAME = 'outsider-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.webmanifest',
  '/images/Logo.jpg',
  '/images/bottega-interni.jpg',
  '/images/wear-flannel.jpg',
  '/images/helmet-fox.jpg',
  '/images/wear-beanie.jpg',
  '/images/sentieri-beigua.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request).catch(() => caches.match('/')))
  );
});