import Link from 'next/link';
import TestimonialCard from '@/features/testimonials/TestimonialCard';
import { TESTIMONIALS } from '@/features/testimonials/data';
import type { Metadata } from 'next';
import { getAllLocalizedPaths } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import { type Locale, isValidLocale, DEFAULT_LOCALE } from '@/i18n.config';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : DEFAULT_LOCALE;
  const localizedPaths = getAllLocalizedPaths('/testimonials');

  return {
    title: 'Client Testimonials',
    description:
      'Read testimonials from major pharmaceutical companies and global institutions who have worked with Applitics for their R Shiny development needs.',
    openGraph: {
      title: 'Client Testimonials - Applitics',
      description:
        'Read testimonials from major pharmaceutical companies and global institutions who have worked with Applitics for their R Shiny development needs.',
      url: localizedPaths[locale as keyof typeof localizedPaths],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Client Testimonials - Applitics',
      description:
        'Read testimonials from major pharmaceutical companies and global institutions who have worked with Applitics.',
    },
    alternates: {
      canonical: localizedPaths[locale as keyof typeof localizedPaths],
      languages: localizedPaths,
    },
  };
}

export default async function TestimonialsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : DEFAULT_LOCALE;
  const testimonialTranslations = await getTranslations('testimonials', locale);

  return (
    <div className="w-full max-w-[1138px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[30px] gap-x-[24px]">
        {TESTIMONIALS.map((t) => {
          const translated = testimonialTranslations?.testimonials?.[t.id];
          return (
            <Link
              key={t.id}
              href={`/${locale}/testimonials/${t.id}`}
              className="cursor-pointer"
            >
              <TestimonialCard
                id={t.id}
                image={t.image}
                title={translated?.title || t.title}
                name={translated?.name || t.name}
                role={translated?.role || t.role}
                description={translated?.description || t.description}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
