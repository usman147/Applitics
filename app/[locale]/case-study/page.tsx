import { getTranslations } from '@/lib/translations';
import { type Locale, isValidLocale, DEFAULT_LOCALE } from '@/i18n.config';
import type { Metadata } from 'next';
import { getAllLocalizedPaths } from '@/lib/i18n';
import CaseStudyClient, {
  type CaseStudyClientProps,
} from '@/features/case-study/CaseStudyClient';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localizedPaths = getAllLocalizedPaths('/case-study');

  return {
    title: 'Case Study - R Shiny Application Transformation',
    description:
      'Learn how APPLITICS transformed an R Shiny application with improved UI/UX, authentication, and user data management.',
    openGraph: {
      title: 'Case Study - R Shiny Application Transformation - Applitics',
      description:
        'Learn how APPLITICS transformed an R Shiny application with improved UI/UX, authentication, and user data management.',
      url: localizedPaths[locale as keyof typeof localizedPaths],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Case Study - R Shiny Application Transformation - Applitics',
      description:
        'Learn how APPLITICS transformed an R Shiny application with improved UI/UX, authentication, and user data management.',
    },
    alternates: {
      canonical: localizedPaths[locale as keyof typeof localizedPaths],
      languages: localizedPaths,
    },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : DEFAULT_LOCALE;

  // Await translations server-side before rendering
  const translations = await getTranslations('case-study', locale);

  return (
    <CaseStudyClient
      translations={translations as CaseStudyClientProps['translations']}
    />
  );
}
