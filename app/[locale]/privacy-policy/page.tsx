import PageHero from '@/components/PageHero';
import LegalContent from '@/features/legal-policy/LegalContent';
import NeedASenior from '@/components/NeedASenior';
import type { Metadata } from 'next';
import { getAllLocalizedPaths } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import { type Locale, isValidLocale, DEFAULT_LOCALE } from '@/i18n.config';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localizedPaths = getAllLocalizedPaths('/privacy-policy');

  return {
    title: 'Privacy Policy',
    description: 'Privacy policy for Applitics',
    openGraph: {
      title: 'Privacy Policy - Applitics',
      description: 'Privacy policy for Applitics',
      url: localizedPaths[locale as keyof typeof localizedPaths],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Privacy Policy - Applitics',
      description: 'Privacy policy for Applitics',
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

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : DEFAULT_LOCALE;
  const commonTranslations = await getTranslations('common', locale);
  const legalTranslations = await getTranslations('legal-policy', locale);

  return (
    <main className="bg-grey-light font-sans space-y-8 pb-[90px]">
      <PageHero
        title={legalTranslations.privacy?.page?.title || 'Privacy Policy'}
        pillText={legalTranslations.privacy?.page?.pillText || 'PRIVACY'}
      />
      {/* must use proper privacy policy content later */}
      {legalTranslations.legal?.sections && (
        <LegalContent translations={legalTranslations.legal} />
      )}
      {commonTranslations.needASenior && (
        <NeedASenior translations={commonTranslations.needASenior} />
      )}
    </main>
  );
}
