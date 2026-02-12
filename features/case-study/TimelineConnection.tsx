'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface TimelineConnectionProps {
  sectionId?: string;
  isViewed?: boolean;
  index?: number;
  showStar?: boolean;
}

function toRoman(num: number): string {
  const map: Array<[number, string]> = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];

  let value = num;
  let result = '';
  for (const [n, sym] of map) {
    while (value >= n) {
      result += sym;
      value -= n;
    }
  }
  return result;
}

export default function TimelineConnection({
  index,
  showStar = false,
}: TimelineConnectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const connectionRef = useRef<HTMLDivElement>(null);
  const roman = index ? toRoman(index) : '';

  useEffect(() => {
    if (!connectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px',
      }
    );

    observer.observe(connectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Trigger animation when section is viewed
  // No need for this effect; handle isVisible solely via IntersectionObserver or refactor logic.
  return (
    <div
      ref={connectionRef}
      className="relative h-16 flex items-center z-10"
      style={{ marginLeft: '-48px', marginTop: '-24px', marginBottom: '-70px' }}
    >
      {/* White gradient fade above icon - overlays the timeline line */}
      <div
        className="absolute top-[50%] left-[48px] w-[2px] h-[80%] z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0))',
        }}
      />

      {/* Circle-star icon attached to left of timeline line */}
      <div className="relative z-30 flex items-center">
        <div
          className={`relative w-[35px] h-[35px] transition-all duration-700 ease-out ${
            isVisible
              ? 'opacity-100 scale-100 translate-x-0'
              : 'opacity-0 scale-75 -translate-x-4'
          }`}
          style={{ left: '-10px' }}
        >
          {showStar ? (
            <Image
              src="/team/circle-star-icon.svg"
              alt="Timeline connection"
              width={35}
              height={35}
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full rounded-full border border-primary-lighter flex items-center justify-center text-primary text-[12px] font-semibold font-serif tracking-[0.04em] bg-primary-lighter text-white">
              {roman}
            </div>
          )}
        </div>
      </div>

      {/* White gradient fade below icon - overlays the timeline line */}
      <div
        className="absolute bottom-[50%] left-[48px] w-[2px] h-[80%] z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0))',
        }}
      />
    </div>
  );
}
