var cacheName = 'pc';
var filesToCache = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './favicon.ico',
  './images/hello-icon-152.png',
  './images/hello-icon-144.png',
  './js/main.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log(e.request)
      if (response) { return response; }
      return fetch(e.request);
    })
  );
});
