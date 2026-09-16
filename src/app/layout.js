import './globals.css'

export const viewport = {
  themeColor: '#0F766E',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  title: 'Dakwah Berkala — Arsip Ilmu Islam',
  description: 'Dakwah Berkala adalah arsip ilmu Islam yang terstruktur, ringkas, dan dapat dipercaya. Belajar agama pelan-pelan tapi rutin.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.png',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Dakwah Berkala',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dakwah Berkala" />
      </head>
      <body>{children}</body>
    </html>
  )
}
