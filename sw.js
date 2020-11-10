//var this_url = 'http://localhost:8080'
var this_url = 'https://mpsir.github.io/ludo'
var no = 1;
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
      
      if (response) { return response; }

      var r_url = e.request.url;
      if (
        r_url == this_url + '/index.html' ||
        r_url == this_url + '/' 
      ) {
        console.log(no)
      no++
      console.log(no)
        return new Response(
          `
          <!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Ludo</title>
  <link rel="manifest" href="manifest.json">
  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="images/hello-icon-152.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="white" />
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="PC">
  <meta name="msapplication-TileImage" content="images/hello-icon-144.png">
  <meta name="msapplication-TileColor" content="#FFFFFF">
</head>

<body>
<div style="text-align: center;">
  <h3>
    Yes ${no}
  </h3>  

  <button onclick="location.reload();">Reload</button>
</div>
  <script>

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js')
          .then(function (registration) {
            console.log('sw sussess reg')
            //location.reload(); 
          }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }

  </script>

</body>

</html>
          `
        , {
          headers: {'Content-Type': 'text/html'}
        })
      }
      return fetch(e.request);
    })
  );
});
