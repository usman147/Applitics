'use client';

import Image from 'next/image';

interface Section4Translations {
  title: string;
  intro: {
    text: string;
    highlightedText: string;
  };
  challenge1: {
    title: string;
    point1: {
      text: string;
      dataFolder: string;
      text2: string;
      highlightedText: string;
      text3: string;
    };
    point2: {
      text: string;
      highlightedText: string;
    };
    point3: {
      text: string;
      highlightedText: string;
    };
  };
  challenge2: {
    title: string;
    point1: string;
    point2: {
      text: string;
      companyName: string;
    };
    point3: string;
  };
}

interface Section4ChallengesFacedProps {
  translations: Section4Translations;
}

export default function Section4ChallengesFaced({
  translations,
}: Section4ChallengesFacedProps) {
  return (
    <div id="section-4" className="bg-white px-4 py-6 rounded-[20px]">
      <h2 className="font-serif text-[34px] leading-[40px] text-primary mb-4 font-normal">
        {translations.title}
      </h2>

      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.intro.text}{' '}
          <span className="font-semibold">
            {translations.intro.highlightedText}
          </span>
          :
        </p>

        <div className="flex flex-col gap-5 mt-2">
          {/* Challenge 1 */}
          <div>
            <h3 className="text-primary text-lg font-semibold mb-2">
              {translations.challenge1.title}
            </h3>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <Image
                    src="/check-icon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                  {translations.challenge1.point1.text}{' '}
                  <span className="bg-[#F1EFEF] px-1 font-mono">
                    {translations.challenge1.point1.dataFolder}
                  </span>{' '}
                  {translations.challenge1.point1.text2}{' '}
                  <span className="font-semibold">
                    {translations.challenge1.point1.highlightedText}
                  </span>{' '}
                  {translations.challenge1.point1.text3}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <Image
                    src="/check-icon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                  {translations.challenge1.point2.text}{' '}
                  <span className="font-semibold">
                    {translations.challenge1.point2.highlightedText}
                  </span>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <Image
                    src="/check-icon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                  {translations.challenge1.point3.text}{' '}
                  <span className="font-semibold">
                    {translations.challenge1.point3.highlightedText}
                  </span>
                  .
                </span>
              </li>
            </ul>
          </div>

          {/* Challenge 2 */}
          <div>
            <h3 className="text-primary text-lg font-semibold mb-2">
              {translations.challenge2.title}
            </h3>
            <ul className="space-y-3 ml-4 mt-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <Image
                    src="/check-icon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                  {translations.challenge2.point1}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <Image
                    src="/check-icon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                  {translations.challenge2.point2.text}{' '}
                  <span className="italic">
                    {translations.challenge2.point2.companyName}
                  </span>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <Image
                    src="/check-icon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                  {translations.challenge2.point3}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
