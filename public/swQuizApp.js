   

   
   var cacheName = 'quiz-app'

   var cacheAssets = [
    '/static/js/bundle.js',
    '/static/js/0.chunk.js',
    '/static/css/2.11829350.chunk.css',
    '/static/js/main.chunk.js',
    '/main.fdd55bff2343a3656490.hot-update.js',    
    '/static/css/main.8ee7fde6.chunk.css',
    '/manifest.json',
    '/logo192.png',
    "index.html",    
    '/static/media/photo-1.c11f97a3.jpg',    
    '/favicon.ico',
    '/',
    
    'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

   ]

   self.addEventListener("install", (e) => {
    console.log("Service Worker: Installed");
  
    e.waitUntil(
      caches
        .open(cacheName)
        .then((cache) => {
          console.log("Service Worker: Caching Files");
          cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
  });
  
  self.addEventListener("fetch", (event) => {
    console.log("Fetch event for ", event.request.url);
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          if (response) {
            console.log("Found ", event.request.url, " in cache");
            return response;
          }
          console.log("Network request for ", event.request.url);
          return fetch(event.request)
            .then((response) => {
              return caches.open(cacheName).then((cache) => {
                if (response.type === "basic") {
                  cache.put(event.request.url, response.clone());
                }
                return response;
              });
            })
            .catch(() => {
              return caches.match("./").then((response) => {
                if (response) {
                  console.log("Found ", event.request.url, " in cache");
                  console.log(response);
                  return response;
                }
              });
            });
        })
        .catch((error) => {
          console.log("error in loading pages", error);
        })
    );
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Activating new service worker...");
  
    const cacheAllowlist = [cacheName];
  
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheAllowlist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

//    this.addEventListener('install', (event) => {

//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => {
//                 console.log('Opened Cache')
//                 return (
//                     cache.addAll(urlsToCache)
                    
//                 )

//             })
//     )

// })



// const options = {
//     ignoreSearch: true,
//     ignoreMethod: true,
//     ignoreVary: true
//   };


// this.addEventListener('fetch', (event) => {
//     if (!navigator.onLine) {
//         event.respondWith(
//             caches.match(event.request, options)
//                 .then((response) => {
//                     if (response) {
//                         console.log(response)
//                         return (response)
//                     } else {
//                         return fetch(event.request).then((response) => {
//                             if (!response || response.status !== 200 || response.type !== 'basic') {
//                                 console.log(response)
//                                 return response;
//                             }
//                             var responseToCache = response.clone();

//                             caches.open(CACHE_NAME).then((cache) => {
//                                 cache.put(event.request, responseToCache)
//                             })
//                             console.log(response)
//                             return response;

//                         }).catch((err) => {
//                             console.log('err', err)
//                         })

//                     }

//                 }).catch((err) => {
//                     console.log('err', err)

//                 })
//         )
//     }

// })