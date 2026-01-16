'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface BreakingPointProps {
  translations: {
    caption: string;
    title: {
      parts: Array<{
        beforeQuote?: string;
        quote?: string;
        beforeControl?: string;
        outOf?: string;
        control?: string;
      }>;
    };
    firstBlock: {
      title: string;
      items: string[];
    };
    secondBlock: {
      title: string;
      items: string[];
    };
  };
}

export default function BreakingPoint({ translations }: BreakingPointProps) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.breaking-point .reveal-on-scroll'
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="breaking-point w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Caption Large Title */}
        <div className="text-center mb-6 reveal-on-scroll">
          <h2 className="font-ibm-plex-sans-condensed text-base font-medium uppercase leading-[26px] tracking-[0.26em] text-primary">
            {translations.caption}
          </h2>
        </div>

        {/* Heading 2 with italic mix */}
        <div className="text-center mb-12 reveal-on-scroll">
          <h2 className="font-serif text-[34px] md:text-[52px] leading-[36px] md:leading-[60px] font-normal text-primary">
            {translations.title.parts.map((part, index) => (
              <span key={index}>
                {part.beforeQuote && (
                  <>
                    {part.beforeQuote}{' '}
                    <span className="italic text-primary-light">
                     <span className='italic text-primary'>&ldquo;</span>{part.quote}<span className='italic text-primary'>&rdquo;</span>
                    </span>
                  </>
                )}
                {part.beforeControl && (
                  <span className="relative inline-block">
                    {part.beforeControl}{' '}
                    <span className="relative inline-block">
                      {part.outOf}{' '}
                      <span className="italic">{part.control}</span>
                      <Image
                        src="/out-of-control-underline.svg"
                        alt=""
                        width={271}
                        height={11}
                        className="absolute bottom-0 left-[-20px] md:w-[275px] w-[185px] max-w-none h-auto"
                        style={{ transform: 'translateY(100%)' }}
                      />
                    </span>
                  </span>
                )}
                {index < translations.title.parts.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* Main Content: Image on left, Text on right */}
        <div className="flex flex-col-reverse lg:flex-row bg-white py-[34px] px-6 lg:pl-[50px] lg:pr-0 items-center rounded-[24px]">
          {/* Image Section */}
          <div className="flex-1 reveal-on-scroll">
            <Image
              src="/breaking-point-animated-image.svg"
              alt="Breaking point illustration"
              width={400}
              height={400}
              className="w-full min-h-[319px]"
            />
          </div>

          {/* Text Section */}
          <div className="flex-1 flex flex-col gap-8 reveal-on-scroll">
            {/* First Text Block */}
            <div>
              <h4 className="font-serif text-[28px] font-normal leading-[34px] text-primary mb-4">
                {translations.firstBlock.title}
              </h4>
              <ul className="space-y-3">
                {translations.firstBlock.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Image
                      src="/list-arrow.svg"
                      alt="arrow"
                      width={20}
                      height={20}
                      className="mt-1 shrink-0"
                    />
                    <span className="font-sans text-lg font-normal italic leading-[28px] tracking-[-0.004em] text-primary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second Text Block */}
            <div>
              <h4 className="font-serif text-[28px] font-normal leading-[34px] text-primary mb-4">
                {translations.secondBlock.title}
              </h4>
              <ul className="space-y-3">
                {translations.secondBlock.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Image
                      src="/list-arrow.svg"
                      alt="arrow"
                      width={20}
                      height={20}
                      className="mt-1 shrink-0"
                    />
                    <span className="font-sans text-lg font-normal italic leading-[28px] tracking-[-0.004em] text-primary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
