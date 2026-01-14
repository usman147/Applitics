import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getLocalizedPath } from '@/lib/i18n';
import { getLocale } from '@/lib/i18n';
import { headers } from 'next/headers';
import { getTranslations } from '@/lib/translations';
import { type Locale, isValidLocale, DEFAULT_LOCALE } from '@/i18n.config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  const locale = getLocale(pathname);
  const homePath = getLocalizedPath('/', locale);

  return {
    title: '404 - Page Not Found',
    description:
      'The page you are looking for does not exist or has been moved.',
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: homePath,
    },
  };
}

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  const localeParam = getLocale(pathname);
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : DEFAULT_LOCALE;
  const homePath = getLocalizedPath('/', locale);
  const translations = await getTranslations('common', locale);

  return (
    <div className="min-h-screen bg-grey-light flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center">
          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="font-serif text-[120px] md:text-[180px] font-normal leading-none text-primary-lighter/30">
              404
            </h1>
          </div>

          {/* Label */}
          <div className="mb-4">
            <p className="font-ibm-plex-sans-condensed text-base font-medium uppercase leading-[26px] tracking-[0.26em] text-primary">
              {translations.notFound?.label || 'Page Not Found'}
            </p>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="font-serif text-[32px] md:text-[52px] font-normal leading-[38px] md:leading-[60px] text-primary">
              {translations.notFound?.title ? (
                translations.notFound.title.parts.map(
                  (
                    part: string | { lineBreak: boolean; text: string },
                    index: number
                  ) => (
                    <span key={index}>
                      {typeof part === 'string' ? (
                        part
                      ) : (
                        <>
                          {part.lineBreak && <br />}
                          <span className="text-primary-light">{part.text}</span>
                        </>
                      )}
                      {index < translations.notFound.title.parts.length - 1 &&
                        typeof translations.notFound.title.parts[index + 1] !==
                          'string' &&
                        !translations.notFound.title.parts[index + 1]
                          .lineBreak && <br />}
                    </span>
                  )
                )
              ) : (
                <>
                  Looks like you&apos;ve wandered
                  <br />
                  <span className="text-primary-light">off the beaten path</span>
                </>
              )}
            </h2>
          </div>

          {/* Description */}
          <div className="mb-10 max-w-2xl mx-auto">
            <p className="font-sans text-lg leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.notFound?.description ? (
                translations.notFound.description.parts.map(
                  (
                    part: string | { lineBreak: boolean; text: string },
                    index: number
                  ) => (
                    <span key={index}>
                      {typeof part === 'string' ? (
                        part
                      ) : (
                        <>
                          {part.lineBreak && <br />}
                          {part.text}
                        </>
                      )}
                      {index <
                        translations.notFound.description.parts.length - 1 &&
                        typeof translations.notFound.description.parts[
                          index + 1
                        ] !== 'string' &&
                        !translations.notFound.description.parts[index + 1]
                          .lineBreak && <br />}
                    </span>
                  )
                )
              ) : (
                <>
                  The page you&apos;re looking for doesn&apos;t exist or has been
                  moved.
                  <br />
                  Let&apos;s get you back on track.
                </>
              )}
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link
              href={homePath}
              className="inline-flex items-center gap-2 h-[38px] rounded-[40.06px] bg-primary-light py-[9px] px-[18px] font-sans text-sm font-semibold leading-[1.44] tracking-normal text-white shadow-md transition-colors hover:bg-primary"
            >
              {translations.notFound?.button || 'Go back home'}
              <Image
                src="/icon-arrow.svg"
                alt=""
                width={14}
                height={14}
                className="w-[14px] h-[14px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
