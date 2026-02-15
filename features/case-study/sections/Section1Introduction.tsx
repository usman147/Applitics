'use client';

import Image from 'next/image';

interface Section1Translations {
  title: string;
  paragraph1: {
    companyName: string;
    text: string;
  };
  paragraph2: string;
  paragraph3: {
    text: string;
    highlightedText: string;
  };
  paragraph4: {
    text: string;
    highlightedText: string;
  };
  objective1: string;
  objective2: string;
}

interface Section1IntroductionProps {
  translations: Section1Translations;
}

export default function Section1Introduction({
  translations,
}: Section1IntroductionProps) {
  return (
    <div id="section-1" className="bg-white px-4 py-6 rounded-[20px]">
      <h2 className="font-serif text-[34px] leading-[40px] text-primary mb-4 font-normal">
        {translations.title}
      </h2>
      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          <span className="italic">{translations.paragraph1.companyName}</span>,{' '}
          {translations.paragraph1.text}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph2}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph3.text}{' '}
          <span className="font-semibold">
            {translations.paragraph3.highlightedText}
          </span>
          .
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph4.text}{' '}
          <span className="font-semibold">
            {translations.paragraph4.highlightedText}
          </span>
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-center gap-3">
            <div className="shrink-0">
              <Image
                src="/list-arrow.svg"
                alt="arrow"
                width={20}
                height={20}
                className="shrink-0"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.objective1}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <div className="shrink-0">
              <Image
                src="/list-arrow.svg"
                alt="arrow"
                width={20}
                height={20}
                className="shrink-0"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.objective2}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
