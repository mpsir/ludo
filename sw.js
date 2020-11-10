//var this_url = 'http://localhost:8080'
var this_url = 'https://mpsir.github.io/ludo'

var cacheName = 'ludo';
var filesToCache = [
  './manifest.json',
  './favicon.ico',
  './css/style.css',
  './images/hello-icon-152.png',
  './images/hello-icon-144.png',
  './js/main.js',
  './sw.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('fetch', function (e) {
  console.log('url is : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (response) {
      //console.log(e.request.url)
      if (response) { return response; }

      var r_url = e.request.url;
      if (
        r_url == this_url + '/index.html' ||
        r_url == this_url + '/' 
      ) {
        return new Response("<h1>Hello!</h1>", {
          headers: {'Content-Type': 'text/html'}
        })
      }


      return fetch(e.request);
    })
  );
});
