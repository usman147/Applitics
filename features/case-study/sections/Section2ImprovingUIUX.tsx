'use client';

import Image from 'next/image';
import VideoPlayer from '../VideoPlayer';

interface Section2Translations {
  title: string;
  paragraph1: string;
  objective: string;
  sector: string;
  client: string;
}

interface Section2ImprovingUIUXProps {
  translations: Section2Translations;
}

export default function Section2ImprovingUIUX({
  translations,
}: Section2ImprovingUIUXProps) {
  return (
    <div id="section-2" className="bg-white px-4 py-6 rounded-[20px]">
      <h2 className="font-serif text-[34px] leading-[40px] text-primary mb-4 font-normal">
        {translations.title}
      </h2>
      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph1}
        </p>
        <div className="flex flex-col md:flex-row gap-6 my-6">
          <div className="flex-[1.3]">
            <VideoPlayer testimonialId="3" />
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-[4px]">
                <Image
                  src="/list-arrow.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              </div>
              <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                {translations.objective}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-[4px]">
                <Image
                  src="/list-arrow.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              </div>
              <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                {translations.sector}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-[4px]">
                <Image
                  src="/list-arrow.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              </div>
              <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                {translations.client}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
