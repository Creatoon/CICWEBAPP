/* eslint-disable */

const staticCacheName = 'site-statics';
const assets = [
  '/',
  'https://intense-scrubland-66382.herokuapp.com/',
  'https://intense-scrubland-66382.herokuapp.com/music',
  'https://intense-scrubland-66382.herokuapp.com/blogs',
  'https://intense-scrubland-66382.herokuapp.com/directors',
  'https://intense-scrubland-66382.herokuapp.com/refund-policy',
  'https://intense-scrubland-66382.herokuapp.com/privacy-policy',
  'https://intense-scrubland-66382.herokuapp.com/contact-us',
  'https://intense-scrubland-66382.herokuapp.com/careers',
  'https://intense-scrubland-66382.herokuapp.com/terms',
  'https://intense-scrubland-66382.herokuapp.com/js/production/bundle.js',
  'https://intense-scrubland-66382.herokuapp.com/js/overview.js',
  'https://intense-scrubland-66382.herokuapp.com/css/ask.css',
  'https://intense-scrubland-66382.herokuapp.com/css/blog.css',
  'https://intense-scrubland-66382.herokuapp.com/css/blogOverview.css',
  'https://intense-scrubland-66382.herokuapp.com/css/error.css',
  'https://intense-scrubland-66382.herokuapp.com/css/location.css',
  'https://intense-scrubland-66382.herokuapp.com/css/login.css',
  'https://intense-scrubland-66382.herokuapp.com/css/music.css',
  'https://intense-scrubland-66382.herokuapp.com/css/overview.css',
  'https://intense-scrubland-66382.herokuapp.com/css/policy.css',
  'https://intense-scrubland-66382.herokuapp.com/css/signup.css',
  'https://intense-scrubland-66382.herokuapp.com/img/logos/CIC PICTURES_R.png',
  'https://intense-scrubland-66382.herokuapp.com/img/logos/CIC PICTURES_W_R.png',
  'https://intense-scrubland-66382.herokuapp.com/img/author/default.jpg',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/Banner website.jpg',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/Banner-Website-1x2x.png',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/hero-directors.png',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/hero-join.png',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/hero-location.png',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/hero-query.png',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/hero-directors-1x2x.png',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/hero-join-1x2x.png',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/hero-location-1x2x.png',
  'https://intense-scrubland-66382.herokuapp.com/img/hero-image/hero-query-1x2x.png',
  'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900',
  'https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/hind/v11/5aU19_a8oxmIfMJaER2SjRhc9V11uQ.woff2',
  'https://fonts.gstatic.com/s/lato/v17/S6u8w4BMUTPHh30AUi-qNiXg7eU0.woff2',
  'https://unpkg.com/aos@next/dist/aos.css',
  'https://unpkg.com/aos@next/dist/aos.js',
  'https://intense-scrubland-66382.herokuapp.com/vendors/css/ionicons.min.css',
  'https://intense-scrubland-66382.herokuapp.com/vendors/css/ionicons.min.css',
  'https://intense-scrubland-66382.herokuapp.com/vendors/fonts/ionicons.eot',
  'https://intense-scrubland-66382.herokuapp.com/vendors/fonts/ionicons.svg',
  'https://intense-scrubland-66382.herokuapp.com/vendors/fonts/ionicons.ttf',
  'https://intense-scrubland-66382.herokuapp.com/vendors/fonts/ionicons.woff'
];

// service worker install
self.addEventListener('install', (evt) => {
  // evt.waitUntil(
  //   caches
  //     .open(staticCacheName)
  //     .then((cache) => {
  //       cache.addAll(assets);
  //     })
  //     .catch((err) => console.log('error occured in catching', err))
  // );
  console.log('it installs');
});

// service worker activate
self.addEventListener('activate', (evt) => {
  console.log('service worker has been activated');
});

// fetch events
self.addEventListener('fetch', (evt) => {
  console.log('it installs');
  // evt.respondWith(
  //   caches.match(evt.request).then((cacheRes) => {
  //     return cacheRes || fetch(evt.request);
  //   })
  // );
});
