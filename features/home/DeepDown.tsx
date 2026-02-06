'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface DeepDownProps {
  translations: {
    caption: string;
    title: {
      parts: Array<
        | string
        | {
            beforeGamble: string;
            gamble: string;
          }
      >;
    };
    card: {
      title: string;
      items: Array<
        | string
        | {
            question: string;
            answers: string[];
          }
      >;
    };
  };
}

export default function DeepDown({ translations }: DeepDownProps) {
  useEffect(() => {
    const elements = document.querySelectorAll('.deep-down .reveal-on-scroll');
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
    <section className="deep-down w-full relative z-2">
      <div className="max-w-7-5xl mx-auto px-4">
        {/* Caption */}
        <div className="text-center mb-3 reveal-on-scroll">
          <p className="font-ibm-plex-sans-condensed text-base font-medium uppercase leading-[26px] tracking-[0.26em] text-primary">
            {translations.caption}
          </p>
        </div>

        {/* Heading */}
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="font-serif text-[34px] md:text-[52px] leading-[36px] md:leading-[60px] font-normal text-primary">
            {translations.title.parts.map((part, index) => (
              <span key={index}>
                {typeof part === 'string' ? (
                  part
                ) : (
                  <span className="relative inline-block">
                    {part.beforeGamble} <span className='italic'>{part.gamble}</span>
                    <Image
                      src="/Isolation_Mode.svg"
                      alt=""
                      width={220}
                      height={12}
                      className="absolute md:left-[67px] bottom-[-15px] md:w-[145px] w-[120px] left-[32px] h-auto"
                    />
                  </span>
                )}
                {index < translations.title.parts.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[24px] lg:pl-[15px] lg:pr-[45px] lg:pt-[45px] lg:pb-[40px] flex flex-col-reverse lg:flex-row items-start gap-10 reveal-on-scroll">
          {/* Left illustration */}
          <div className="flex-1 w-full flex justify-center lg:px-[15px] pb-[40px] lg:p-0 reveal-on-scroll">
            <Image
              src="/deep-down-animated-image.svg"
              alt="Warning illustration"
              width={520}
              height={320}
              className="w-full max-w-[560px] h-auto"
            />
          </div>

          {/* Right text */}
          <div className="flex-1 flex flex-col gap-5 px-[15px] pt-[45px] lg:pb-[40px] lg:p-0 reveal-on-scroll">
            <h3 className="font-serif text-[32px] font-normal leading-[38px] text-primary">
              {translations.card.title}
            </h3>
            <ul className="space-y-5 text-primary">
              {translations.card.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Image
                    src="/list-arrow.svg"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="mt-1 shrink-0"
                  />
                  {typeof item === 'string' ? (
                    <span className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
                      {item}
                    </span>
                  ) : (
                    <div className="font-sans text-lg leading-[28px] tracking-[-0.004em] space-y-2">
                      <p className="font-semibold reveal-on-scroll">
                        {item.question}
                      </p>
                      <ul className="space-y-5">
                        {item.answers.map((answer, answerIndex) => (
                          <li key={answerIndex} className="flex items-start gap-3 reveal-on-scroll">
                            <Image
                              src="/list-arrow.svg"
                              alt="arrow"
                              width={20}
                              height={20}
                              className="mt-1 shrink-0"
                            />
                            {answer}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
