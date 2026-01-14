'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Section6Translations {
  title: string;
  paragraph1: string;
  paragraph2: {
    text: string;
    highlightedText: string;
    text2: string;
  };
  uiDefinition: {
    label: string;
    text: string;
  };
  uxDefinition: {
    label: string;
    text: string;
  };
  paragraph3: {
    text: string;
    attractive: string;
    text2: string;
    functional: string;
    text3: string;
  };
  paragraph4: string;
  paragraph5: string;
  paragraph6: string;
  paragraph7: string;
  paragraph8: {
    text: string;
    italicText: string;
  };
  paragraph9: string;
  mockupTitle: string;
  imageAlt: string;
  paragraph10: {
    text: string;
    linkText: string;
    linkUrl: string;
  };
  paragraph11: string;
  paragraph12: string;
  paragraph13: {
    text: string;
    shinydashboard: string;
    text2: string;
  };
  paragraph14: string;
  paragraph15: {
    text: string;
    highlightedText: string;
    text2: string;
  };
  paragraph16: string;
}

interface Section6GraphicMockupProps {
  translations: Section6Translations;
}

export default function Section6GraphicMockup({
  translations,
}: Section6GraphicMockupProps) {
  const mockupImages = [
    '/case-study/case-study-image-3.webp',
    '/case-study/case-study-image-4.webp',
  ];
  const [currentMockupIndex, setCurrentMockupIndex] = useState(0);

  const nextMockupImage = () => {
    setCurrentMockupIndex((prev) => (prev + 1) % mockupImages.length);
  };

  const prevMockupImage = () => {
    setCurrentMockupIndex(
      (prev) => (prev - 1 + mockupImages.length) % mockupImages.length
    );
  };

  if (!translations) {
    return null;
  }

  return (
    <div id="section-6" className="bg-white px-4 py-6 rounded-lg">
      <h2 className="font-serif text-[34px] leading-[40px] text-primary mb-4 font-normal">
        {translations.title}
      </h2>

      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph1}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph2.text}{' '}
          <span className="font-semibold">
            {translations.paragraph2.highlightedText}
          </span>{' '}
          {translations.paragraph2.text2}
        </p>
        <div className="flex flex-col gap-3">
          <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
            <span className="font-semibold">
              {translations.uiDefinition.label}
            </span>{' '}
            {translations.uiDefinition.text}
          </p>
          <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
            <span className="font-semibold">
              {translations.uxDefinition.label}
            </span>{' '}
            {translations.uxDefinition.text}
          </p>
        </div>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph3.text}{' '}
          <span className="font-semibold">
            {translations.paragraph3.attractive}
          </span>{' '}
          {translations.paragraph3.text2}{' '}
          <span className="font-semibold">
            {translations.paragraph3.functional}
          </span>
          . {translations.paragraph3.text3}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph4}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph5}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph6}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph7}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph8.text}{' '}
          <span className="italic">{translations.paragraph8.italicText}</span>
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph9}
        </p>

        <div className="mt-10">
          <h3 className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] font-medium italic mb-4">
            {translations.mockupTitle}
          </h3>
          <div className="relative flex w-full cursor-pointer justify-center overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden shadow-md rounded-lg">
              <div className="relative h-full w-full">
                <Image
                  src={mockupImages[currentMockupIndex]}
                  alt={`${translations.imageAlt} ${currentMockupIndex + 1}`}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="100vw"
                  loading="lazy"
                />
              </div>
              {mockupImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevMockupImage();
                    }}
                    className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white transition-colors duration-200 hover:bg-black/50 focus:outline-none lg:text-2xl"
                    aria-label="Previous image"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextMockupImage();
                    }}
                    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white transition-colors duration-200 hover:bg-black/50 focus:outline-none lg:text-2xl"
                    aria-label="Next image"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                    </svg>
                  </button>
                  <div className="absolute right-0 bottom-2 left-0 flex items-center justify-center gap-2">
                    {mockupImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentMockupIndex(index);
                        }}
                        className={`rounded-full shadow-lg transition-all duration-200 ${
                          currentMockupIndex === index
                            ? 'h-3 w-3 bg-white'
                            : 'h-2.5 w-2.5 bg-white/70'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph10.text}{' '}
          <a
            href={translations.paragraph10.linkUrl}
            className="text-primary-light font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {translations.paragraph10.linkText}
          </a>
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph11}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph12}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph13.text}{' '}
          <span className="bg-[#F1EFEF] px-1">
            {translations.paragraph13.shinydashboard}
          </span>
          {translations.paragraph13.text2}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph14}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph15.text}{' '}
          <span className="font-semibold">
            {translations.paragraph15.highlightedText}
          </span>
          , {translations.paragraph15.text2}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph16}
        </p>
      </div>
    </div>
  );
}
