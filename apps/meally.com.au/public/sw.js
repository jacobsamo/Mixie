if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[n]) return;
    let t = {};
    const o = (e) => a(e, n),
      r = { module: { uri: n }, exports: t, require: o };
    s[n] = Promise.all(c.map((e) => r[e] || o(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-c5ed321c'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/JkJUojvB0d01v2Q6z3Xaa/_buildManifest.js',
          revision: 'be857cf6a153c6d863442de22703ef87',
        },
        {
          url: '/_next/static/JkJUojvB0d01v2Q6z3Xaa/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/701-2c60ff9e50c62b7a.js',
          revision: '2c60ff9e50c62b7a',
        },
        {
          url: '/_next/static/chunks/769-bb825b988dcd753e.js',
          revision: 'bb825b988dcd753e',
        },
        {
          url: '/_next/static/chunks/framework-19f3649580393c10.js',
          revision: '19f3649580393c10',
        },
        {
          url: '/_next/static/chunks/main-388a6654ab8d1fe1.js',
          revision: '388a6654ab8d1fe1',
        },
        {
          url: '/_next/static/chunks/pages/%5Bprofile%5D-0470a13090d2287f.js',
          revision: '0470a13090d2287f',
        },
        {
          url: '/_next/static/chunks/pages/404-252e10382a9e23dd.js',
          revision: '252e10382a9e23dd',
        },
        {
          url: '/_next/static/chunks/pages/_app-d20307356c969d6c.js',
          revision: 'd20307356c969d6c',
        },
        {
          url: '/_next/static/chunks/pages/_error-d11cb7facb2c59a4.js',
          revision: 'd11cb7facb2c59a4',
        },
        {
          url: '/_next/static/chunks/pages/account/Preferences-7a228c224b41f443.js',
          revision: '7a228c224b41f443',
        },
        {
          url: '/_next/static/chunks/pages/account/Profile-7b0c00347709bb06.js',
          revision: '7b0c00347709bb06',
        },
        {
          url: '/_next/static/chunks/pages/account/Settings-7bb9e8990f695159.js',
          revision: '7bb9e8990f695159',
        },
        {
          url: '/_next/static/chunks/pages/admin-2e3a173e0a0fb5c0.js',
          revision: '2e3a173e0a0fb5c0',
        },
        {
          url: '/_next/static/chunks/pages/admin/recipe-form-1ea4f538d44c2567.js',
          revision: '1ea4f538d44c2567',
        },
        {
          url: '/_next/static/chunks/pages/index-aa44133b6b68bf5c.js',
          revision: 'aa44133b6b68bf5c',
        },
        {
          url: '/_next/static/chunks/pages/info/privacy_policy-1d18bd512ccb35f9.js',
          revision: '1d18bd512ccb35f9',
        },
        {
          url: '/_next/static/chunks/pages/info/terms_services-1e1b80fbc5f90e5a.js',
          revision: '1e1b80fbc5f90e5a',
        },
        {
          url: '/_next/static/chunks/pages/recipes-80ffec5ddd88f822.js',
          revision: '80ffec5ddd88f822',
        },
        {
          url: '/_next/static/chunks/pages/recipes/%5Bid%5D-b546cd5eacc6fa8f.js',
          revision: 'b546cd5eacc6fa8f',
        },
        {
          url: '/_next/static/chunks/pages/savoury-f0f753b78a365ef3.js',
          revision: 'f0f753b78a365ef3',
        },
        {
          url: '/_next/static/chunks/pages/sweet-b245c11de37481dd.js',
          revision: 'b245c11de37481dd',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-6ef43a8d4a395f49.js',
          revision: '6ef43a8d4a395f49',
        },
        {
          url: '/_next/static/css/5558d96e0397baa1.css',
          revision: '5558d96e0397baa1',
        },
        {
          url: '/_next/static/css/79d5d7e83039e2fe.css',
          revision: '79d5d7e83039e2fe',
        },
        {
          url: '/_next/static/css/a9986d46d8474916.css',
          revision: 'a9986d46d8474916',
        },
        {
          url: '/_next/static/css/c8794444bd266fe5.css',
          revision: 'c8794444bd266fe5',
        },
        {
          url: '/_next/static/css/e6f0157fd8a1f9c3.css',
          revision: 'e6f0157fd8a1f9c3',
        },
        {
          url: '/_next/static/css/f09da0a580d77a72.css',
          revision: 'f09da0a580d77a72',
        },
        { url: '/favicon.ico', revision: 'fbc1dfa725cb3551f502224c77683043' },
        { url: '/favicon.png', revision: '36bc0a6a0a460542ceb6e3a6dd8c4f87' },
        {
          url: '/icons/Logo-svg.svg',
          revision: '02035da7d0f99c403b6055d9ad07af1d',
        },
        {
          url: '/icons/favicon.ico',
          revision: 'f73836c12feacd6876e2a47153acfa91',
        },
        {
          url: '/icons/maskable_icons/maskable_icon.png',
          revision: 'ff64622796de72a35f89d0b798f137fb',
        },
        {
          url: '/icons/maskable_icons/maskable_icon_x128.png',
          revision: 'e62d95a0e45bee4f63f71fd998ceedb8',
        },
        {
          url: '/icons/maskable_icons/maskable_icon_x192.png',
          revision: '79ab99acdcd8d4a03929a56ae3567e50',
        },
        {
          url: '/icons/maskable_icons/maskable_icon_x384.png',
          revision: 'd1a0c635463e4bb26689dede27376bba',
        },
        {
          url: '/icons/maskable_icons/maskable_icon_x48.png',
          revision: 'edccfe799bf0f914e649407689171a91',
        },
        {
          url: '/icons/maskable_icons/maskable_icon_x512.png',
          revision: 'b09e81d3a9569839fafa686d6382dba6',
        },
        {
          url: '/icons/maskable_icons/maskable_icon_x72.png',
          revision: 'a89069e37d594e80267ca85dd1b1aca7',
        },
        {
          url: '/icons/maskable_icons/maskable_icon_x96.png',
          revision: '23ee3e8e7ad3aa9592ad0a28c942538a',
        },
        {
          url: '/icons/social/FacebookLogo.svg',
          revision: '47e9b3b7e4221b7d396e0a04441800b2',
        },
        {
          url: '/icons/social/GithubLogo.svg',
          revision: '59caee09fef7a4d817dc66c350194121',
        },
        {
          url: '/icons/social/GoogleLogo.svg',
          revision: '3a44b93540c1a65f49720638c70b5c29',
        },
        {
          url: '/icons/social/bbburst.svg',
          revision: '1a9c9ce0ab90d13e43ed96700d4c3b83',
        },
        {
          url: '/icons/svgs/Pie.svg',
          revision: '0345d1642b8602f7b9ee2a39fa097182',
        },
        {
          url: '/images/Recipe.jpg',
          revision: 'eb8b9e0f42ace07b6ab15b956dbbbc43',
        },
        {
          url: '/images/background.jpg',
          revision: '75ab6a29a4abaf2152b0be1276a56dad',
        },
        { url: '/manifest.json', revision: 'ea338d39c15dcd78f0dd5a9c2b296c8e' },
        { url: '/robots.txt', revision: '987497bfb623e1059632e5a607d56454' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
