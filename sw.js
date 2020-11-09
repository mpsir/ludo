var cacheName = 'pc';
var filesToCache = [
  './manifest.json',
  './css/style.css',
  './favicon.ico',
  './images/hello-icon-152.png',
  './images/hello-icon-144.png',
  './js/main.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      console.log(e.request)
      if (response) { return response; }

      var r_url = e.request.url;
      if (
        r_url == '/' ||
        r_url == './index.html' ||
        r_url == 'index.html'
      ) {
        console.log(888)
      }


      return fetch(e.request);
    })
  );
});
