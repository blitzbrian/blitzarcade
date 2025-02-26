// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://blitzarcade.org'),
  title: 'blitzarcade',
  description: 'blitzarcade is an online platform that lets you play classic games from consoles like PSP, DS, NES, and more, offering a nostalgic gaming experience directly in your browser.',
  applicationName: 'blitzarcade',
  authors: [{ name: 'blitzbrian', url: 'https://blitzbrian.is-a.dev' }],
  creator: 'blitzbrian',
  publisher: 'blitzbrian',
  category: 'games',
  openGraph: {
    title: 'blitzarcade',
    description: 'blitzarcade is an online platform that lets you play classic games from consoles like PSP, DS, NES, and more, offering a nostalgic gaming experience directly in your browser.',
    url: 'https://blitzarcade.org',
    type: "website",
    locale: "en_US",
    images: [
      {
        url: 'https://blitzarcade.org/image/image.png',
        width: 759,
        height: 697,
        alt: 'Logo'
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1
    }
  },
  icons: {
    icon: [ { url: '/image/logo.png' } ],
    shortcut: ['/image/logo.png'],
    apple: [
      { url: '/image/logo.png' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript forceColorScheme='dark' />
      </head>
      <body>
        <MantineProvider forceColorScheme="dark">{children}</MantineProvider>
      </body>
    </html>
  );
}