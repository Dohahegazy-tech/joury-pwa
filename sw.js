const CACHE_NAME = "joury-pwa-shell-v5-push";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-180.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
  }
});

self.addEventListener("push", event => {
  let data = {
    title: "Joury 💕",
    body: "You have a Joury reminder.",
    url: "./"
  };

  try {
    if (event.data) data = Object.assign(data, event.data.json());
  } catch (e) {}

  const options = {
    body: data.body,
    icon: data.icon || "./icons/icon-192.png",
    badge: data.badge || "./icons/icon-192.png",
    tag: data.tag || "joury-reminder",
    data: { url: data.url || "./" },
    requireInteraction: false,
    silent: false
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = event.notification.data && event.notification.data.url ? event.notification.data.url : "./";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if ("focus" in client) {
          client.focus();
          return client;
        }
      }
      return clients.openWindow(target);
    })
  );
});
