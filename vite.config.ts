import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      srcDir: 'public',
      filename: 'service-worker.js',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'logo0.png',
        'logo-lil.png',
        'welcompage2.jpg',
        'offline.html',
      ],
      devOptions: {
        enabled: true, // ✅ see service worker working in dev mode
      },
      manifest: {
        name: 'FieldSafe',
        short_name: 'FieldSafe',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0a0e2c',
        icons: [
          {
            src: '/assets/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,png,svg,webmanifest,ico}'],
        additionalManifestEntries: [
          { url: '/volunteer', revision: null },
          { url: '/registervolunteer', revision: null },
          { url: '/activitytabs', revision: null },
          { url: '/addactivity', revision: null },
          { url: '/searchactivity', revision: null },
          { url: '/projects', revision: null },
          { url: '/AddProject', revision: null },
          { url: '/addobjective', revision: null },
          { url: '/addrisk', revision: null },
          { url: '/addhazard', revision: null },
          { url: '/searchproject', revision: null },
          { url: '/report', revision: null },
          { url: '/groupadmin', revision: null },
          { url: '/fieldstaff', revision: null },
          { url: '/teamlead', revision: null },
          { url: '/registerroles', revision: null },
          { url: '/home', revision: null },
          { url: '/login', revision: null },
          { url: '/activitychecklist', revision: null },
          { url: '/activityvolunteers', revision: null },
          { url: '/activityoutcome', revision: null },
          { url: '/activityrisk', revision: null },
          { url: '/activityhazard', revision: null },
          { url: '/activitycomplete', revision: null },
          { url: '/navbar', revision: null },
        ],
        runtimeCaching: [
          {
            urlPattern: /https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts' },
          },
          {
            urlPattern: /\/assets\/icons\/.*\.png$/i,
            handler: 'CacheFirst',
            options: { cacheName: 'app-icons' },
          },
          {
            urlPattern: /\/api\/.*$/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'api-cache' },
          },
        ],
      },
    }),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
