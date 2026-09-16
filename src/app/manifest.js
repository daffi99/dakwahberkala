export default function manifest() {
  return {
    name: 'Dakwah Berkala',
    short_name: 'Dakwah Berkala',
    description: 'Catatan fiqih dan arsip ilmu Islam pribadi yang terstruktur dan terpercaya.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF9F5',
    theme_color: '#0F766E',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
