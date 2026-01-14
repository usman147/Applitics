import PageHero from '@/components/PageHero';
import NeedASenior from '@/components/NeedASenior';
import { getTranslations } from '@/lib/translations';
import { type Locale, isValidLocale, DEFAULT_LOCALE } from '@/i18n.config';

export default async function TestimonialsLayout({
  children,
  params,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : DEFAULT_LOCALE;
  const commonTranslations = await getTranslations('common', locale);
  const testimonialTranslations = await getTranslations('testimonials', locale);

  // Build title from parts array
  const heroTitle = testimonialTranslations?.title?.parts
    ? testimonialTranslations.title.parts.map(
        (
          part:
            | string
            | {
                text: string;
                highlight?: boolean;
                breakAfter?: boolean;
              },
          index: number
        ) => {
          const text = typeof part === 'string' ? part : part.text;
          const highlight = typeof part === 'object' && part.highlight;
          const breakAfter = typeof part === 'object' && part.breakAfter;

          return (
            <span key={index}>
              {highlight ? (
                <span className="text-primary-light">{text}</span>
              ) : (
                text
              )}
              {breakAfter && <br />}
            </span>
          );
        }
      )
    : 'Trusted by Major Pharmaceutical and Global Institutions';

  return (
    <main className="bg-grey-light font-sans space-y-8 pb-[37px]">
      <PageHero
        title={heroTitle}
        pillText={testimonialTranslations?.caption || ''}
      />
      {children}
      {commonTranslations.needASenior && (
        <NeedASenior translations={commonTranslations.needASenior} />
      )}
    </main>
  );
}
