self.addEventListener('install', event => { console.log('V1 installing…'); 
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        'index.html',
        'index.css',
        'index.js'
      ]);
    })
  );
});
self.addEventListener('activate', event => { console.log('Service worker activate event!');
  clients.matchAll({includeUncontrolled: true, type: 'window'}).then(function(clientList) { var client = clientList[0], clientId = client.id;
    client.postMessage({typ: 'notification', msg: 'Ready for offline.', exp: 5});
  });
});