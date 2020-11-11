function check_pre_req(){
    if ('serviceWorker' in navigator) {
      
    } else { error_in_pre_req() }
  }

  function reg_sw(){
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js')
        .then(function (registration) {
          console.log('sw sussess reg')
          location.reload();
        }, function (err) {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }

  function error_in_pre_req(){
    alert(`sw not enabled in this browser\nOr in this Private Window 
    \nUpdate browser and come back again.
    `)  
  }
