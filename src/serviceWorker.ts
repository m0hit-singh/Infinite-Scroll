// public/service-worker.js
import { HACKER_NEWS_API_NEW_STORIES } from "./utils/api";
// public/service-worker.ts

const CACHE_NAME = "news-cache-v1";
const API_URL = HACKER_NEWS_API_NEW_STORIES; // Replace with your API

self.addEventListener("install", (event: ExtendableEvent) => {
  console.log("install.");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "../index.html",
        "./src/index.tsx"
        // "/static/js/bundle.js", // Add other assets you want to cache
      ]);
    })
  );
});

self.addEventListener("fetch", (event: any) => {
  console.log("fetch.");
  if (event.request.url.includes(API_URL)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => {
            return cache.match(event.request);
          });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  console.log("activated.");
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
