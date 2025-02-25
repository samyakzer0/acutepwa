self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("acute-cache").then((cache) => {
        return cache.addAll(["/", "/index.html", "/offline.html"]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/offline.html"))
    );
  });