'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface NowWhatProps {
  translations: {
    caption: string;
    title: {
      parts: string[];
    };
    card: {
      title: {
        parts: Array<
          | string
          | {
              beforeItalic: string;
              italic: string;
            }
        >;
      };
      description: string;
    };
  };
}

export default function NowWhat({ translations }: NowWhatProps) {
  useEffect(() => {
    const elements = document.querySelectorAll('.now-what .reveal-on-scroll');
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
    <section className="now-what w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Caption */}
        <div className="text-center mb-4 reveal-on-scroll">
          <p className="font-ibm-plex-sans-condensed text-base font-medium uppercase leading-[26px] tracking-[0.26em] text-primary">
            {translations.caption}
          </p>
        </div>

        {/* Heading */}
        <div className="text-center mb-12 reveal-on-scroll">
          <h2 className="font-serif text-[34px] md:text-[52px] leading-[36px] md:leading-[60px] font-normal text-primary">
            {translations.title.parts.length === 3 ? (
              <>
                <span>{translations.title.parts[0]}</span>
                <span className="text-primary-light">
                  {translations.title.parts[1]}
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  {translations.title.parts[2].split('critical')[0]}
                  <span className="italic">critical</span>
                  <span className="italic">
                    {translations.title.parts[2].split('critical')[1]}
                  </span>
                  <Image
                    src="/business_critical.svg"
                    alt=""
                    width={320}
                    height={12}
                    className="absolute -translate-x-1/2 h-auto md:w-[410px] md:left-[66%] md:w-[265px] left-[65%]  bottom-[-15px]"
                  />
                </span>
              </>
            ) : (
              <>
                <span className="text-primary-light">
                  {translations.title.parts[0]}
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  {translations.title.parts[1].split('critique')[0]}
                  <span className="italic">critique</span>
                  {translations.title.parts[1].split('critique')[1]}
                  <Image
                    src="/out-of-control-underline.svg"
                    alt=""
                    width={320}
                    height={12}
                    className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 md:w-[320px] w-[265px] h-auto"
                  />
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[24px] px-6 lg:pl-[50px] lg:pr-0 py-12 flex flex-col lg:flex-row items-center gap-10 reveal-on-scroll">
          {/* Left content */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="w-[86px] h-[86px]">
              <Image
                src="/warning-bubble.svg"
                alt="Warning bubble"
                width={86}
                height={86}
                className="w-full h-full"
              />
            </div>
            <h3 className="font-serif text-[32px] font-normal leading-[38px] text-primary">
              {translations.card.title.parts.map((part, index) => (
                <span key={index}>
                  {typeof part === 'string' ? (
                    part
                  ) : (
                    <>
                      {part.beforeItalic}{' '}
                      <span className="italic text-primary-light">
                        {part.italic}
                      </span>
                    </>
                  )}
                  {index < translations.card.title.parts.length - 1 && <br />}
                </span>
              ))}
            </h3>
            <p className="font-sans text-lg font-normal italic leading-[28px] tracking-[-0.004em] text-primary max-w-[560px]">
              {translations.card.description}
            </p>
          </div>

          {/* Right image */}
          <div className="flex-1 w-full flex justify-center">
            <Image
              src="/now-what-animated-image.svg"
              alt="Team rowing illustration"
              width={520}
              height={320}
              className="w-full max-w-[560px] h-auto min-h-[319px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
