// Service Worker WARDIPA LKPD Rubrik Manager
const CACHE_NAME = 'wardipa-rubrik-v16';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './upload.html',
  './manifest.json',
  './css/app.css',
  './css/print.css',
  './js/bundle.js',
  './js/app.js',
  './js/db.js',
  './js/rubrik.js',
  './js/flags.js',
  './js/charts.js',
  './js/export.js',
  './js/ai-scanner.js',
  './js/sample-data.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Cache pre-fetch non-fatal warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Hanya tangani request http/https dari origin yang sama
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Berikan cache terlebih dahulu, lalu coba perbarui di background jika online
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Offline, tidak masalah karena cache sudah dikembalikan
          });
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Fallback jika offline dan request halaman
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
