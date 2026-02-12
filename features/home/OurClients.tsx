'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TestimonialCard from '@/features/testimonials/TestimonialCard';
import { TESTIMONIALS } from '@/features/testimonials/data';

interface OurClientsProps {
  translations: {
    caption: string;
    title: {
      lines: Array<{
        parts: Array<
          | string
          | {
              text: string;
              highlight?: boolean; // optional is fine if you only sometimes set it
            }
        >;
      }>;
    };
    seeAllTestimonials: string;
  };
}

export default function OurClients({ translations }: OurClientsProps) {
  // Filter for the 4 specific testimonials
  const selectedTestimonials = TESTIMONIALS.filter(
    (t) => t.id === '1' || t.id === '2' || t.id === '4' || t.id === '6'
  );

  // Reveal on scroll
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.our-clients-section .reveal-on-scroll'
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
    <section className="w-full our-clients-section">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 reveal-on-scroll">
          <p className="font-ibm-plex-sans-condensed text-base font-medium uppercase leading-[26px] tracking-[0.26em] text-primary mb-4">
            {translations.caption}
          </p>
          <h2 className="font-serif text-[34px] md:text-[52px] leading-[36px] md:leading-[60px] font-normal text-primary">
            {translations.title.lines.map((line, lineIndex) => (
              <div key={lineIndex}>
                {line.parts.map((part, partIndex) =>
                  typeof part === "string" ? (
                    part
                  ) : (
                    <span key={partIndex} className="text-primary-light">
                      {part.text}
                    </span>
                  )
                )}
              </div>
            ))}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="reveal-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[30px] gap-x-[24px] max-w-[1138px] mx-auto justify-items-center md:justify-items-start">
            {selectedTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                id={testimonial.id}
                image={testimonial.image}
                title={testimonial.title}
                name={testimonial.name}
                role={testimonial.role}
                description={testimonial.description}
                showPlayButton
                youtubeUrl={testimonial.youtubeUrl}
                youtubeVideoDuration={testimonial.youtubeVideoDuration}
                playOnCardClick
              />
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10 reveal-on-scroll">
          <Link
            href="/testimonials"
            scroll
            className="flex items-center gap-2 px-5 py-3 bg-primary-light text-white rounded-[40.06px] text-sm font-semibold font-sans hover:bg-primary transition-all duration-300 w-full lg:w-auto justify-center"
          >
            {translations.seeAllTestimonials}
            <Image
              src="/icon-arrow-top-right.svg"
              alt="Arrow"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
