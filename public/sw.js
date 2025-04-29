// Simple service worker for offline support
const CACHE_NAME = "circuit-dash-v1"

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", "/sounds/correct.mp3", "/sounds/wrong.mp3", "/images/logo.png"])
    }),
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})
