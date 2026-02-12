'use client';

import Image from 'next/image';

interface Section10Translations {
  title: string;
  paragraph1: string;
  paragraph2: string;
  imageTitle: string;
  imageAlt: string;
  paragraph3: string;
  paragraph4: string;
  method1: {
    label: string;
    text: string;
  };
  method2: {
    label: string;
    text: string;
  };
  paragraph5: {
    text: string;
    quickMethod: string;
    text2: string;
  };
  paragraph6: string;
  paragraph7: string;
  resource1: {
    text: string;
    url: string;
  };
  resource2: {
    text: string;
    url: string;
  };
  resource3: {
    text: string;
    url: string;
  };
  resource4: {
    text: string;
    url: string;
  };
  paragraph8: {
    text: string;
    linkText: string;
    linkUrl: string;
  };
  paragraph9: string;
  paragraph10: string;
  paragraph11: string;
}

interface Section10CustomWidgetProps {
  translations: Section10Translations;
}

export default function Section10CustomWidget({
  translations,
}: Section10CustomWidgetProps) {
  return (
    <div id="section-10" className="bg-white px-4 py-6 rounded-[20px]">
      <h2 className="font-serif text-[34px] leading-[40px] text-primary mb-4 font-normal">
        {translations.title}
      </h2>

      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph1}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph2}
        </p>
        <p className="mt-2 italic font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.imageTitle}
        </p>
        <div className="shadow-md mx-auto w-[240px] lg:w-[340px]">
          <Image
            src="/case-study/comparison-select-input.gif"
            alt={translations.imageAlt}
            width={1000}
            height={600}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph3}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph4}
        </p>
        <div className="mt-2">
          <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
            <span className="font-semibold">{translations.method1.label}</span>{' '}
            {translations.method1.text}
          </p>
          <p className="mt-2 font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
            <span className="font-semibold">{translations.method2.label}</span>{' '}
            {translations.method2.text}
          </p>
        </div>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph5.text}{' '}
          <span className="font-semibold">
            {translations.paragraph5.quickMethod}
          </span>{' '}
          {translations.paragraph5.text2}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph6}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph7}
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              <a
                href={translations.resource1.url}
                className="text-primary-light font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.resource1.text}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              <a
                href={translations.resource2.url}
                className="text-primary-light font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.resource2.text}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              <a
                href={translations.resource3.url}
                className="text-primary-light font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.resource3.text}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              <a
                href={translations.resource4.url}
                className="text-primary-light font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.resource4.text}
              </a>
            </span>
          </li>
        </ul>
        <p className="mt-2 font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph8.text}{' '}
          <a
            href={translations.paragraph8.linkUrl}
            className="text-primary-light font-medium hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {translations.paragraph8.linkText}
          </a>
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph9}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph10}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph11}
        </p>
      </div>
    </div>
  );
}
