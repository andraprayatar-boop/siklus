/* Siklus offline cache. Bump CACHE_NAME when shipping an incompatible release. */
const CACHE_NAME = 'siklus-static-v2';
const CORE_FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png'];
const scopeUrl = self.registration.scope;
const resolve = (path) => new URL(path, scopeUrl).toString();

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_FILES.map(resolve));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith('siklus-static-') && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || request.url.startsWith('chrome-extension:')) return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(scopeUrl)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(resolve('./index.html'), response.clone()).catch(() => {});
        }
        return response;
      } catch (error) {
        return (await caches.match(request)) || (await caches.match(resolve('./index.html')));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    const refresh = fetch(request).then(async (response) => {
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    }).catch(() => null);
    if (cached) {
      event.waitUntil(refresh);
      return cached;
    }
    return (await refresh) || Response.error();
  })());
});
