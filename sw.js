var dataCacheName = "appShell";
var filesToCache = [
    '/',
    '/index.html',
    '/script.js',
    '/Bootstrap-scripts/javascript-min.js',
    '/Bootstrap-scripts/jquery-min.js',
    '/Bootstrap-scripts/popper-min.js',
    '/bootstrap.css',
    '/loader.svg'
];
self.addEventListener('install', (e) => {
    console.log('[serviceWorker] install');
    e.waitUntill(
        caches.open(dataCacheName).then(cache => {
            console.log('[serviceWorker] Cachig app shell');
            return cache.addAll(filesToCache);
        })
    )
});
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        }
        )
    )
});
self.addEventListener('activate',(e)=>{
    e.waitUntill(
        caches.keys().then((keyList)=>{
            return Promise.all(
                keyList.map(key=>{
                    if(key!==dataCacheName){
                       return caches.delete(key);
                    }
                })
            )
        })
    )
})