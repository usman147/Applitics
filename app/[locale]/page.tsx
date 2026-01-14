import HeroSection from '@/features/home/HeroSection';
import BreakingPoint from '@/features/home/BreakingPoint';
import NowWhat from '@/features/home/NowWhat';
import DeepDown from '@/features/home/DeepDown';
import Shiny from '@/features/home/Shiny';
import OurRole from '@/features/home/OurRole';
import RealWorldExamples from '@/features/home/RealWorldExamples';
import OurClients from '@/features/home/OurClients';
import OurTeam from '@/features/home/OurTeam';
import '@/features/home/home.css';
import Image from 'next/image';
import NeedASenior from '@/components/NeedASenior';
import type { Metadata } from 'next';
import { getAllLocalizedPaths } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import { type Locale, isValidLocale, DEFAULT_LOCALE } from '@/i18n.config';
// import { getOrganizationStructuredData } from '@/app/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localizedPaths = getAllLocalizedPaths('/');

  return {
    description:
      'Team of R Shiny experts at your side. Turn your homemade Shiny app into a real data product: Fast, elegant, and built for impact. Work with our R Shiny experts to unlock its full potential.',
    openGraph: {
      title: 'Applitics - R Shiny Experts',
      description:
        'Team of R Shiny experts at your side. Turn your homemade Shiny app into a real data product: Fast, elegant, and built for impact.',
      url: localizedPaths[locale as keyof typeof localizedPaths],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Applitics - R Shiny Experts',
      description:
        'Team of R Shiny experts at your side. Turn your homemade Shiny app into a real data product.',
    },
    alternates: {
      canonical: localizedPaths[locale as keyof typeof localizedPaths],
      languages: localizedPaths,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : DEFAULT_LOCALE;
  const translations = await getTranslations('home', locale);
  const commonTranslations = await getTranslations('common', locale);

  return (
    <div className="space-y-[90px] bg-grey-light pb-[37px]">
      <HeroSection translations={translations.hero} />

      <BreakingPoint translations={translations.breakingPoint} />

      <NowWhat translations={translations.nowWhat} />

      <div className="relative">
        {/* Ellipse Separator - Behind both sections */}
        <div className="ellipse-separator"></div>

        {/* Bottom arrow */}
        <DeepDown translations={translations.deepDown} />
        <div className="h-[90px] flex justify-center relative z-2">
          <Image
            src="/circular-arrow.svg"
            alt=""
            width={120}
            height={120}
            className="absolute top-[-40px] w-[120px] h-[120px]"
            loading="lazy"
          />
        </div>

        <Shiny translations={translations.shiny} />
      </div>

      <OurRole translations={translations.ourRole} />

      <RealWorldExamples translations={translations.realWorldExamples} />

      <OurClients translations={translations.ourClients} />

      <OurTeam translations={translations.ourTeam} />
      {commonTranslations.needASenior && (
        <NeedASenior translations={commonTranslations.needASenior} />
      )}
    </div>
  );
}
