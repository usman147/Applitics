import type { Metadata } from 'next';
import { getAllLocalizedPaths } from '@/lib/i18n';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localizedPaths = getAllLocalizedPaths('/case-study');

  return {
    title: 'Case Studies',
    description:
      'Explore our case studies showcasing successful R Shiny applications built for major pharmaceutical companies and global institutions.',
    openGraph: {
      title: 'Case Studies - Applitics',
      description:
        'Explore our case studies showcasing successful R Shiny applications built for major pharmaceutical companies and global institutions.',
      url: localizedPaths[locale as keyof typeof localizedPaths],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Case Studies - Applitics',
      description:
        'Explore our case studies showcasing successful R Shiny applications built for major pharmaceutical companies and global institutions.',
    },
    alternates: {
      canonical: localizedPaths[locale as keyof typeof localizedPaths],
      languages: localizedPaths,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CaseStudyLayout({ children, params }: Props) {
  await params;
  return <>{children}</>;
}
