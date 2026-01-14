import type { Metadata } from 'next';
import { getAllLocalizedPaths } from '@/lib/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localizedPaths = getAllLocalizedPaths('/our-team');

  return {
    title: 'Our Team',
    description:
      'Meet the team of R Shiny experts at Applitics. We bring together a full stack of expertise to turn your idea into a real web application.',
    openGraph: {
      title: 'Our Team - Applitics',
      description:
        'Meet the team of R Shiny experts at Applitics. We bring together a full stack of expertise to turn your idea into a real web application.',
      url: localizedPaths[locale as keyof typeof localizedPaths],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Our Team - Applitics',
      description: 'Meet the team of R Shiny experts at Applitics.',
    },
    alternates: {
      canonical: localizedPaths[locale as keyof typeof localizedPaths],
      languages: localizedPaths,
    },
    robots: {
      index: false, // Set to true when team page is ready
      follow: true,
    },
  };
}

export default async function OurTeam({ params }: Props) {
  await params;
  
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Team</h1>
        <p className="text-lg text-gray-600">
          Content for Our Team page will be added here.
        </p>
      </div>
    </div>
  );
}
