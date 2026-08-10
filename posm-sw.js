// Service Worker — posm_cloud 前端缓存控制
// sync_scrap.py 的 bump_sw() 会自动递增 posm-vN 版本号
const CACHE = "posm-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
