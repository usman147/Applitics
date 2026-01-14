'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TESTIMONIALS } from '@/features/testimonials/data';
import { getLocale } from '@/lib/i18n';

interface ContactTestimonialsProps {
  translations: {
    caption: string;
    title: {
      parts: Array<
        | string
        | {
            text: string;
            highlight?: boolean;
            breakAfter?: boolean;
          }
      >;
    };
  };
}

export default function ContactTestimonials({
  translations,
}: ContactTestimonialsProps) {
  const pathname = usePathname();
  const [testimonialTranslations, setTestimonialTranslations] = useState<{
    [key: string]: {
      name: string;
      description: string;
    };
  } | null>(null);

  useEffect(() => {
    const locale = getLocale(pathname);
    import(`@/translations/testimonials/${locale}.json`)
      .then((module) => {
        if (module.default?.testimonials) {
          const translated: {
            [key: string]: { name: string; description: string };
          } = {};
          Object.keys(module.default.testimonials).forEach((id) => {
            const testimonial =
              module.default.testimonials[
                id as keyof typeof module.default.testimonials
              ];
            if (testimonial) {
              translated[id] = {
                name: testimonial.name,
                description: testimonial.description,
              };
            }
          });
          setTestimonialTranslations(translated);
        }
      })
      .catch(() => {
        // Fallback to English
        import('@/translations/testimonials/en.json')
          .then((module) => {
            if (module.default?.testimonials) {
              const translated: {
                [key: string]: { name: string; description: string };
              } = {};
              Object.keys(module.default.testimonials).forEach((id) => {
                const testimonial =
                  module.default.testimonials[
                    id as keyof typeof module.default.testimonials
                  ];
                if (testimonial) {
                  translated[id] = {
                    name: testimonial.name,
                    description: testimonial.description,
                  };
                }
              });
              setTestimonialTranslations(translated);
            }
          })
          .catch(() => {
            console.error('Failed to load testimonial translations');
          });
      });
  }, [pathname]);

  // Display first 6 testimonials
  const displayedTestimonials = TESTIMONIALS.slice(0, 6);

  if (!translations || !translations.caption || !translations.title) {
    console.error('Contact translations failed to load');
    return <div>Error loading translations</div>;
  }

  return (
    <section className="py-16 md:py-24 bg-grey-light">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-ibm-plex-sans-condensed tracking-[0.26em] text-[16px] leading-[26px] font-medium uppercase mb-4">
            {translations.caption}
          </p>
          <h2 className="font-serif text-[34px] md:text-[52px] leading-[36px] md:leading-[60px] text-primary font-normal">
            {translations.title.parts.map((part, index) => {
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
            })}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-[20px] p-6 flex flex-col gap-5"
            >
              {/* Company Logo */}
              <div className="h-12 flex items-center">
                <div className="relative h-full w-full max-w-[120px]">
                  {testimonial.id === '1' && (
                    <Image
                      src="/partners/BPCC-colored.svg"
                      alt="Confidential Big Pharma Client"
                      fill
                      className="object-contain object-left"
                    />
                  )}
                  {testimonial.id === '2' && (
                    <Image
                      src="/partners/mathematic-colored.svg"
                      alt="Mathematica"
                      fill
                      className="object-contain object-left"
                    />
                  )}
                  {testimonial.id === '3' && (
                    <Image
                      src="/partners/digital-fuel-capital-colored.svg"
                      alt="Digital Fuel Capital"
                      fill
                      className="object-contain object-left"
                    />
                  )}
                  {testimonial.id === '4' && (
                    <div className="relative h-12 w-[120px]">
                      <Image
                        src="/partners/cgiar-colored.svg"
                        alt="CGIAR"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  )}
                  {testimonial.id === '5' && (
                    <Image
                      src="/partners/mathematic-colored.svg"
                      alt="Mathematica"
                      fill
                      className="object-contain object-left"
                    />
                  )}
                  {testimonial.id === '6' && (
                    <Image
                      src="/partners/oxford-colored.svg"
                      alt="University of Oxford"
                      fill
                      className="object-contain object-left"
                    />
                  )}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-primary font-sans text-[18px] leading-[24px] tracking-[-0.015em] grow">
                <span className="text-primary-lighter">&ldquo;</span>
                {testimonialTranslations?.[testimonial.id]?.description ||
                  testimonial.description}
                <span className="text-primary-lighter">&rdquo;</span>
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-[#E4E4E4]">
                <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={
                      index % 4 === 0
                        ? '/avatars/Avatar [1.1].svg'
                        : index % 4 === 1
                          ? '/avatars/Avatar [1.1]-1.svg'
                          : index % 4 === 2
                            ? '/avatars/Avatar [1.1]-2.svg'
                            : '/avatars/Avatar [1.1]-3.svg'
                    }
                    alt={
                      testimonialTranslations?.[testimonial.id]?.name ||
                      testimonial.name
                    }
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-primary font-sans text-[16px] leading-[138%] tracking-[-0.004em] font-normal">
                    {testimonialTranslations?.[testimonial.id]?.name ||
                      testimonial.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
