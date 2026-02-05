'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Animated Number Component
function AnimatedNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Parse the value to extract the number
    const parseValue = (val: string): { number: number; suffix: string } => {
      // Handle percentages (90%)
      if (val.includes('%')) {
        const num = parseFloat(val.replace('%', ''));
        return { number: num, suffix: '%' };
      }
      // Handle fractions (5/5)
      if (val.includes('/')) {
        const [num, den] = val.split('/').map(Number);
        return { number: num, suffix: `/${den}` };
      }
      // Handle numbers with + (20+, 5+)
      if (val.includes('+')) {
        const num = parseFloat(val.replace('+', ''));
        return { number: num, suffix: '+' };
      }
      // Regular number
      const num = parseFloat(val);
      return { number: num, suffix: '' };
    };

    const { number: targetNumber, suffix } = parseValue(value);

    // Calculate duration based on number value - smaller numbers animate faster
    // Formula: base duration (600ms) + (number * 30ms)
    // This makes 5 animate in ~750ms, 20 in ~1200ms, 90 in ~3300ms
    const duration = 600 + targetNumber * 30;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (targetNumber - startValue) * easeOut;

      // Format the number based on suffix type
      let formattedValue: string;
      if (suffix === '%') {
        formattedValue = `${Math.round(currentValue)}${suffix}`;
      } else if (suffix.includes('/')) {
        formattedValue = `${Math.round(currentValue)}${suffix}`;
      } else {
        formattedValue = `${Math.round(currentValue)}${suffix}`;
      }

      setDisplayValue(formattedValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure final value is exact
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
}

interface ShinyProps {
  translations: {
    caption: string;
    title: {
      parts: Array<
        | string
        | {
            beforeFoundation: string;
            foundation: string;
            afterFoundation: string;
          }
      >;
    };
    points: {
      x: {
        parts: string[];
      };
      check: string;
    };
    stats: {
      prototypes: {
        value: string;
        label: {
          parts: string[];
        };
      };
      satisfaction: {
        value: string;
        label: {
          parts: string[];
        };
      };
      organizations: {
        value: string;
        label: {
          parts: string[];
        };
      };
      projects: {
        value: string;
        label: {
          parts: string[];
        };
      };
    };
    cta: string;
  };
}

export default function Shiny({ translations }: ShinyProps) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.shiny-section .reveal-on-scroll'
    );
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
    <section className="w-full shiny-section mt-[36px]">
      <div className="max-w-7-5xl mx-auto px-4 relative z-2">
        {/* Top Section - Two Columns */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 mb-32 reveal-on-scroll">
          {/* Left Side */}
          <div className="flex-1">
            {/* Quote/Caption */}
            <p className="font-ibm-plex-sans-condensed text-base font-medium uppercase leading-[26px] tracking-[0.26em] text-primary mb-4 text-center md:text-left">
              {translations.caption}
            </p>

            {/* Heading */}
            <h2 className="font-normal font-serif leading-[36px] max-w-[360px] md:max-w-[initial] md:leading-[60px] md:text-[52px] mx-auto text-[34px] text-primary">
              {translations.title.parts.map((part, index) => (
                <span key={index}>
                  {typeof part === 'string' ? (
                    part
                  ) : (
                    <>
                      {part.beforeFoundation}{' '}
                      <span className="text-primary-light">
                        {part.foundation}
                      </span>{' '}
                      {part.afterFoundation}
                    </>
                  )}
                  {index < translations.title.parts.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>

          {/* Right Side - Points */}
          <div className="flex flex-1 flex-col flex-wrap gap-4 content-end pr-[23px]">
            {/* X Point */}
            <div className="flex gap-4 items-start md:items-center lg:items-center">
              <Image
                src="/x-icon.svg"
                alt="X"
                width={32}
                height={32}
                className="shrink-0"
              />
              <p className="font-sans text-lg leading-[28px] tracking-[-0.004em] text-primary">
                {translations.points.x.parts.map((part, index) => (
                  <span key={index}>
                    {part}
                    {index < translations.points.x.parts.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>

            {/* Check Point */}
            <div className="flex gap-4 items-start md:items-center lg:items-center">
              <Image
                src="/check-icon.svg"
                alt="Check"
                width={32}
                height={32}
                className="shrink-0"
              />
              <p className="font-sans text-lg leading-[28px] tracking-[-0.004em] text-primary">
                {translations.points.check}
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Illustration with Stats */}
        <div className="relative reveal-on-scroll">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-center gap-6">
            {/* Left Section */}
            <div className="min-w-[240px] max-w-[240px] flex-1 flex flex-col gap-[106px] items-end">
              <div className="w-full flex flex-col items-center text-center bg-white rounded-2xl px-4 py-6 shadow-sm">
                <AnimatedNumber
                  value={translations.stats.prototypes.value}
                  className="font-serif text-[52px] font-normal leading-[60px] text-primary-light"
                />
                <p className="font-sans text-[16px] font-semibold leading-[22px] text-primary">
                  {translations.stats.prototypes.label.parts.map(
                    (part, index) => (
                      <span key={index}>
                        {part}
                        {index <
                          translations.stats.prototypes.label.parts.length -
                            1 && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>

              <div className="w-full flex flex-col items-center text-center bg-white rounded-2xl px-4 py-6 shadow-sm">
                <AnimatedNumber
                  value={translations.stats.satisfaction.value}
                  className="font-serif text-[52px] font-normal leading-[60px] text-primary-light"
                />
                <p className="font-sans text-[16px] font-semibold leading-[22px] text-primary">
                  {translations.stats.satisfaction.label.parts.map(
                    (part, index) => (
                      <span key={index}>
                        {part}
                        {index <
                          translations.stats.satisfaction.label.parts.length -
                            1 && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>
            </div>

            {/* Middle Section - Image */}
            <div className="flex-1 flex flex-col items-center justify-between self-stretch">
              <Image
                src="/shiny-people.svg"
                alt="Shiny People Illustration"
                width={540}
                height={320}
                className="w-full max-w-[540px] h-auto"
              />

              {/* CTA Button */}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-primary-light text-white font-sans text-lg font-semibold px-10 py-4 rounded-full w-full max-w-[378px] transition-colors hover:bg-primary"
              >
                {translations.cta}
                <Image
                  src="/icon-arrow.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </Link>
            </div>

            {/* Right Section */}
            <div className="min-w-[240px] max-w-[240px] flex-1 flex flex-col gap-[106px] items-start">
              <div className="w-full flex flex-col items-center text-center bg-white rounded-2xl px-4 py-6 shadow-sm">
                <AnimatedNumber
                  value={translations.stats.organizations.value}
                  className="font-serif text-[52px] font-normal leading-[60px] text-primary-light"
                />
                <p className="font-sans text-[16px] font-semibold leading-[22px] text-primary">
                  {translations.stats.organizations.label.parts.map(
                    (part, index) => (
                      <span key={index}>
                        {part}
                        {index <
                          translations.stats.organizations.label.parts.length -
                            1 && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>

              <div className="w-full flex flex-col items-center text-center bg-white rounded-2xl px-4 py-6 shadow-sm">
                <AnimatedNumber
                  value={translations.stats.projects.value}
                  className="font-serif text-[52px] font-normal leading-[60px] text-primary-light"
                />
                <p className="font-sans text-[16px] font-semibold leading-[22px] text-primary">
                  {translations.stats.projects.label.parts.map(
                    (part, index) => (
                      <span key={index}>
                        {part}
                        {index <
                          translations.stats.projects.label.parts.length -
                            1 && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Center Illustration */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/shiny-people.svg"
                alt="Shiny People Illustration"
                width={540}
                height={320}
                className="w-full max-w-[400px] h-auto"
              />

            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 max-w-[373px] m-auto">
              <div className="flex flex-row justify-center items-center text-center gap-4 bg-white rounded-2xl p-8 shadow-sm">
                <AnimatedNumber
                  value={translations.stats.prototypes.value}
                  className="font-serif text-[52px] font-normal leading-[48px] text-primary-light"
                />
                <p className="font-sans text-md font-semibold leading-[18px] text-primary">
                  {translations.stats.prototypes.label.parts.map(
                    (part, index) => (
                      <span key={index}>
                        {part}
                        {index <
                          translations.stats.prototypes.label.parts.length -
                            1 && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>

              <div className="flex flex-row justify-center items-center text-center gap-4 bg-white rounded-2xl p-8 shadow-sm">
                <AnimatedNumber
                  value={translations.stats.organizations.value}
                  className="font-serif text-[52px] font-normal leading-[48px] text-primary-light"
                />
                <p className="font-sans text-md font-semibold leading-[18px] text-primary">
                  {translations.stats.organizations.label.parts.map(
                    (part, index) => (
                      <span key={index}>
                        {part}
                        {index <
                          translations.stats.organizations.label.parts.length -
                            1 && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>

              <div className="flex flex-row justify-center items-center text-center gap-4 bg-white rounded-2xl p-8 shadow-sm">
                <AnimatedNumber
                  value={translations.stats.satisfaction.value}
                  className="font-serif text-[52px] font-normal leading-[48px] text-primary-light"
                />
                <p className="font-sans text-md font-semibold leading-[18px] text-primary">
                  {translations.stats.satisfaction.label.parts.map(
                    (part, index) => (
                      <span key={index}>
                        {part}
                        {index <
                          translations.stats.satisfaction.label.parts.length -
                            1 && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>

              <div className="flex flex-row justify-center items-center text-center gap-4 bg-white rounded-2xl p-8 shadow-sm">
                <AnimatedNumber
                  value={translations.stats.projects.value}
                  className="font-serif text-[52px] font-normal leading-[48px] text-primary-light"
                />
                <p className="font-sans text-md font-semibold leading-[18px] text-primary">
                  {translations.stats.projects.label.parts.map(
                    (part, index) => (
                      <span key={index}>
                        {part}
                        {index <
                          translations.stats.projects.label.parts.length -
                            1 && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>
            </div>

              {/* CTA Button */}
              <div className='max-w-[373px] m-auto'>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary-light text-white font-sans text-lg font-semibold px-10 py-4 rounded-full hover:bg-primary-light transition-colors my-8 w-full max-w-[390px] justify-center m-auto"
                >
                  {translations.cta}
                  <Image
                    src="/icon-arrow.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
