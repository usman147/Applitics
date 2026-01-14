'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ReactCompareSlider } from 'react-compare-slider';

interface SliderTranslations {
  before: string;
  after: string;
}

interface CaseStudySliderProps {
  translations: SliderTranslations;
}

export default function CaseStudySlider({
  translations,
}: CaseStudySliderProps) {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className="relative w-full lg:sticky lg:top-24 self-start">
      <div className="w-full max-h-[340px] h-[340px] rounded-[8px] overflow-hidden shadow-2xl border-3 border-white">
        <ReactCompareSlider
          itemOne={
            <div className="relative w-full h-full">
              <Image
                src="/real-word-examples/case-study-first-slide.jpg"
                alt="Before - Original R Shiny Dashboard"
                fill
                className="object-fill"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute h-[30px] bottom-4 left-4 bg-primary-lighter px-4 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {translations.before}
                </span>
              </div>
            </div>
          }
          itemTwo={
            <div className="relative w-full h-full">
              <Image
                src="/real-word-examples/case-study-second-slide.jpg"
                alt="After - Transformed R Shiny Dashboard"
                fill
                className="object-fill"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute h-[30px] bottom-4 right-4 bg-primary-lighter px-4 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {translations.after}
                </span>
              </div>
            </div>
          }
          handle={
            <div
              className={`relative flex items-center justify-center h-full cursor-grab active:cursor-grabbing ${isInteracting ? 'cursor-grabbing' : ''}`}
              onPointerDown={() => setIsInteracting(true)}
              onPointerUp={() => setIsInteracting(false)}
              onPointerLeave={() => setIsInteracting(false)}
            >
              {/* Blue divider line */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-primary-lighter"></div>
              {/* Handle icon - centered on the line */}
              <div className="relative z-10 rounded-full p-2">
                <Image
                  src="/divider-slider.svg"
                  alt="Slider handle"
                  width={29}
                  height={40}
                  className="w-[29px] h-10"
                />
              </div>
              {/* Animated mouse indicator - absolutely positioned to the right */}
              <div
                className={`absolute z-10 left-1/2 translate-x-[10px] w-[50px] ${!isInteracting ? 'animate-slide-mouse' : ''}`}
              >
                <Image
                  src="/moving-mouse.svg"
                  alt="Drag to slide"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          }
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
}
