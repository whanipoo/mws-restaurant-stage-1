//Array of cache file names
const cacheFiles = [
'/',
'/index.html',
'/restaurant.html',
'/css/styles.css',
'/js/dbhelper.js',
'/js/main.js',
'/js/restaurant_info.js',
'/data/restaurants.json',
'/img/1.jpg',
'/img/2.jpg',
'/img/3.jpg',
'/img/4.jpg',
'/img/5.jpg',
'/img/6.jpg',
'/img/7.jpg',
'/img/8.jpg',
'/img/9.jpg',
'/img/10.jpg'
];



//Let us know if the service worker is registered
console.log('Service Worker: Registered');

//Listen to an installation event
self.addEventListener('install', function(e) {
  //Wait untill the installation is complete then add files to cache
  e.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

//Listen to fetch events
self.addEventListener('fetch', function(e){
  e.respondWith(
    //Check if the request url already exists within the cache, then add the then method to receive a promise
    caches.match(e.request).then(function(response){
      //If the request already exists, it will be returned
      if (response) {
        //console.log('Found',e.request,'in cache');
        return response;
      }
      //If not, it will be fetched and paired with a response
      else {
        //console.log('Did not find',e.request,'in cache. Now fetching');
        return fetch(e.request)
        .then(function(response) {
          const clone = response.clone();
          caches.open('v1').then(function(cache) {
            cache.put(e.request, clone);
          })
          return response;
        })
        //catch potential errors
        .catch(function(err){
          console.error(err);
        });
      }
    })
  );
});
