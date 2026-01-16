import type { Metadata, Viewport } from 'next';
import './globals.css';
import { headers } from 'next/headers';
import Script from 'next/script';
import {
  Inter,
  Instrument_Serif,
  Instrument_Sans,
  IBM_Plex_Sans_Condensed,
} from 'next/font/google';
import { DEFAULT_LOCALE, isValidLocale, type Locale } from '@/i18n.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Safely get the base URL
function getMetadataBase(): URL {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      return new URL(siteUrl);
    } catch {
      // If URL is invalid, fall back to default
    }
  }
  return new URL('https://applitics.com');
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'Applitics',
    template: '%s | Applitics',
  },
  description:
    'Team of R Shiny experts at your side. Turn your homemade Shiny app into a real data product: Fast, elegant, and built for impact.',
  keywords: [
    'R Shiny',
    'Shiny development',
    'data visualization',
    'web applications',
    'R programming',
    'data products',
    'business intelligence',
  ],
  authors: [{ name: 'Applitics' }],
  creator: 'Applitics',
  publisher: 'Applitics',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Applitics',
    title: 'Applitics - R Shiny Experts',
    description:
      'Team of R Shiny experts at your side. Turn your homemade Shiny app into a real data product: Fast, elegant, and built for impact.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Applitics - R Shiny Experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Applitics - R Shiny Experts',
    description:
      'Team of R Shiny experts at your side. Turn your homemade Shiny app into a real data product.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-ibm-plex-sans-condensed',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeHeader = headersList.get('x-locale');
  const locale: Locale =
    localeHeader && isValidLocale(localeHeader) ? localeHeader : DEFAULT_LOCALE;

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${instrumentSans.variable} ${ibmPlexSansCondensed.variable} antialiase`}
      >
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
