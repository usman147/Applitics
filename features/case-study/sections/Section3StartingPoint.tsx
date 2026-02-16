'use client';

import Image from 'next/image';
import ImageGallery from '../ImageGallery';

interface Section3Translations {
  title: string;
  paragraph1: {
    text: string;
    shinydashboard: string;
    text2: string;
  };
  feature1: string;
  feature2: string;
  feature3: string;
  paragraph2: {
    text: string;
    shinydashboard: string;
    text2: string;
  };
  paragraph3: string;
  imageAlt: string;
}

interface Section3StartingPointProps {
  translations: Section3Translations;
}

export default function Section3StartingPoint({
  translations,
}: Section3StartingPointProps) {
  const startingPointImages = [
    '/case-study/case-study-image-1.webp',
    '/case-study/case-study-image-2.webp',
  ];

  return (
    <div id="section-3" className="bg-white px-4 py-6 rounded-[20px]">
      <h2 className="font-serif text-[34px] leading-[40px] text-primary mb-4 font-normal">
        {translations.title}
      </h2>

      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph1.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-sans">
            {translations.paragraph1.shinydashboard}
          </span>{' '}
          {translations.paragraph1.text2}
        </p>

        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="mt-[4px] shrink-0">
              <Image
                src="/list-arrow.svg"
                alt="arrow"
                width={20}
                height={20}
                className="shrink-0"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.feature1}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-[4px] shrink-0">
              <Image
                src="/list-arrow.svg"
                alt="arrow"
                width={20}
                height={20}
                className="shrink-0"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.feature2}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-[4px] shrink-0">
              <Image
                src="/list-arrow.svg"
                alt="arrow"
                width={20}
                height={20}
                className="shrink-0"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.feature3}
            </span>
          </li>
        </ul>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph2.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-sans">
            {translations.paragraph2.shinydashboard}
          </span>{' '}
          {translations.paragraph2.text2}
        </p>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph3}
        </p>

        <ImageGallery
          images={startingPointImages}
          alt={translations.imageAlt}
        />
      </div>
    </div>
  );
}
