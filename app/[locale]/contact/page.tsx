import { Metadata } from 'next';
import Image from 'next/image';
import ContactPageForm from '@/features/contact/ContactPageForm';
import ContactTestimonials from '@/features/contact/ContactTestimonials';
import Marquee from 'react-fast-marquee';
import { getAllLocalizedPaths } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import { type Locale, isValidLocale, DEFAULT_LOCALE } from '@/i18n.config';

const partnerLogos = [
  '/partners/oxford.svg',
  '/partners/faao.svg',
  '/partners/sanofi.svg',
  '/partners/the-world-bank.svg',
  '/partners/mathematic.svg',
  '/partners/digital-fuel-capital.svg',
  '/partners/mercator-ocean.svg',
  '/partners/gates-foundation.svg',
  '/partners/cgiar.svg',
];

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localizedPaths = getAllLocalizedPaths('/contact');

  return {
    title: 'Contact Us',
    description:
      'Get in touch with our team of R Shiny experts. Consult with our experts for custom solutions. We will contact you within 24 hours!',
    openGraph: {
      title: 'Contact Us - Applitics',
      description:
        'Get in touch with our team of R Shiny experts. Consult with our experts for custom solutions.',
      url: localizedPaths[locale as keyof typeof localizedPaths],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Contact Us - Applitics',
      description:
        'Get in touch with our team of R Shiny experts. Consult with our experts for custom solutions.',
    },
    alternates: {
      canonical: localizedPaths[locale as keyof typeof localizedPaths],
      languages: localizedPaths,
    },
  };
}

export default async function Contact({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : DEFAULT_LOCALE;
  const translations = await getTranslations('contact', locale);

  // Ensure translations object has required structure
  if (!translations || typeof translations !== 'object') {
    console.error('Contact translations failed to load');
    return <div>Error loading translations</div>;
  }

  return (
    <main className="bg-grey-light font-sans ">
      {/* Hero Section with Form */}
      <section className="relative pt-[157px] pb-[52px] overflow-hidden">
        {/* Hero Background Image */}
        <Image
          src="/hero-image.jpg"
          alt="Hero Background"
          fill
          className="object-fill"
          priority
        />

        <div className="relative max-w-8xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-[62px] items-start">
            {/* Left Side - Hero Content */}
            <div className="text-white pt-8">
              <div className="inline-flex px-6 py-2 bg-white rounded-[100px] justify-center items-center mb-[22px]">
                <span className="text-primary text-[14px] font-normal font-ibm-plex-sans-condensed uppercase leading-[26px] tracking-[0.05em]">
                  {translations.page.badge}
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-serif text-[34px] leading-[36px] lg:text-[52px] lg:leading-[60px] mb-8 font-normal">
                {translations.page.title.parts.map(
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
                      {index < translations.page.title.parts.length - 1 &&
                        typeof translations.page.title.parts[index + 1] !==
                          'string' &&
                        !translations.page.title.parts[index + 1].lineBreak && (
                          <br />
                        )}
                    </span>
                  )
                )}
              </h1>

              {/* Avatar Badges */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                      src="/avatar-left.png"
                      alt="Expert Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                      src="/avatar-right.png"
                      alt="Expert Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="font-sans text-[16px] leading-[138%] tracking-[-0.004em] font-normal">
                  {translations.page.getInTouch.parts.map(
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
                          translations.page.getInTouch.parts.length - 1 &&
                          typeof translations.page.getInTouch.parts[
                            index + 1
                          ] !== 'string' &&
                          !translations.page.getInTouch.parts[index + 1]
                            .lineBreak && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>

              {/* Message */}
              <p className="font-sans text-[16px] leading-[138%] tracking-[-0.004em] font-normal mb-[25px]">
                {translations.page.message}
              </p>

              {/* Partner Logos */}

              <div className="w-full h-full max-w-[100vw] overflow-hidden partners-fade">
                <Marquee
                  speed={50}
                  style={{ maxWidth: 'calc(100vw - 2.5rem)' }}
                >
                  {partnerLogos.map((logo, index) => (
                    <div key={index} className="h-[50px] mx-10">
                      <Image
                        key={index}
                        src={logo}
                        alt={`Partner ${index + 1}`}
                        width={150}
                        height={50}
                        className="h-full object-fill"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>

            {/* Right Side - Form Card */}

            <ContactPageForm translations={translations.form} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {translations && <ContactTestimonials translations={translations} />}
    </main>
  );
}
