'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ReactCompareSlider } from 'react-compare-slider';
import 'swiper/css';
import 'swiper/css/navigation';

// Slide image paths and IDs (not translatable)
const SLIDE_IMAGES = [
  {
    id: 1,
    image: '/real-word-examples/capacity-planing.jpg',
    testimonialId: '1',
  },
  {
    id: 2,
    image: '/real-word-examples/case-study-first-slide.jpg',
    imageRight: '/real-word-examples/case-study-second-slide.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=placeholder',
  },
  {
    id: 3,
    image: '/real-word-examples/icleaned.jpg',
    testimonialId: '4',
  },
  {
    id: 4,
    image: '/real-word-examples/agra-dahsboard.jpg',
    testimonialId: '2',
  },
];

// SwiperSlideImage Component
interface SwiperSlideImageProps {
  image: string;
  imageRight?: string;
  title: string;
}

function SwiperSlideImage({ image, imageRight, title }: SwiperSlideImageProps) {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className="w-full mx-auto overflow-hidden rounded-lg shrink-0 aspect-5/3">
      {imageRight ? (
        <div className="w-full h-full rounded-[8px] overflow-hidden shadow-2xl border-3 border-white compare-slider-container">
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
              </div>
            }
            handle={
              <div
                className={`relative flex items-center justify-center h-full cursor-grab ${isInteracting ? 'cursor-grabbing' : ''}`}
                onPointerDown={() => setIsInteracting(true)}
                onPointerUp={() => setIsInteracting(false)}
                onPointerLeave={() => setIsInteracting(false)}
              >
                {/* Blue divider line */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-primary-lighter"></div>
                {/* Handle icon - centered on the line */}
                <div className="relative z-10">
                  <Image
                    src="/divider-slider.svg"
                    alt="Slider"
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
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            }
            style={{
              width: '100%',
              height: '100%',
            }}
            className="rounded-lg"
          />
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover border-2 border-grey-light rounded-lg"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1660px"
          />
        </div>
      )}
    </div>
  );
}

// SwiperSlideButton Component
interface SwiperSlideButtonProps {
  youtubeUrl?: string;
  testimonialId?: string;
  buttonText: string;
}

function SwiperSlideButton({
  youtubeUrl,
  testimonialId,
  buttonText,
}: SwiperSlideButtonProps) {
  if (youtubeUrl) {
    return (
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 h-[44px] rounded-full bg-primary-light text-white hover:bg-primary-light/90 transition-all inline-flex items-center gap-2 w-full md:w-auto justify-center text-sm"
      >
        {buttonText}
        <Image
          src="/icon-arrow-top-right.svg"
          alt="Arrow"
          width={20}
          height={20}
        />
      </a>
    );
  }

  if (testimonialId) {
    return (
      <Link
        href={`/testimonials/${testimonialId}`}
        className="px-8 h-[44px] rounded-full bg-primary-light text-white hover:bg-primary-light/90 transition-all inline-flex items-center gap-2 w-full md:w-auto justify-center text-sm"
      >
        {buttonText}
        <Image
          src="/icon-arrow-top-right.svg"
          alt="Arrow"
          width={20}
          height={20}
        />
      </Link>
    );
  }

  return null;
}

interface RealWorldExamplesProps {
  translations: {
    caption: string;
    title: {
      parts: Array<
        | string
        | {
            text: string;
            highlight?: boolean;
            breakAfter?: boolean;
          }
      >;
    };
    slides: Array<{
      title: string;
      description: string;
      buttonText: string;
    }>;
  };
}

export default function RealWorldExamples({
  translations,
}: RealWorldExamplesProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  // Reveal on scroll
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.real-world-examples-section .reveal-on-scroll'
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
    <section
      id="real-world-examples"
      className="w-full real-world-examples-section scroll-mt-[110px]"
    >
      {/* Header */}
      <div className="text-center mb-12 reveal-on-scroll max-w-7xl mx-auto px-4">
        <p className="font-ibm-plex-sans-condensed text-base font-medium uppercase leading-[26px] tracking-[0.26em] text-primary mb-4">
          {translations.caption}
        </p>
        <h2 className="font-serif text-[34px] md:text-[52px] leading-[36px] md:leading-[60px] font-normal text-primary">
          {translations.title.parts.map((part, index) => {
            const text = typeof part === 'string' ? part : part.text;
            const highlight = typeof part === 'object' && part.highlight;
            const breakAfter = typeof part === 'object' && part.breakAfter;

            return (
              <span key={index}>
                {highlight ? (
                  <span className="text-primary-light">{text}</span>
                ) : (
                  text
                )}
                {breakAfter && <br />}
              </span>
            );
          })}
        </h2>
      </div>

      {/* Carousel */}
      <div className="reveal-on-scroll w-full h-full relative">
        {/* left fade */}         
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 lg:w-25 z-10 [background-image:linear-gradient(to_right,white,transparent)]"></div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1.7}
          centeredSlides={true}          
          initialSlide={1}
          autoHeight={true}
          allowTouchMove={true}
          noSwipingClass="compare-slider-container"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
            },
            768: {
              slidesPerView: 1.4,
            },
            1280: {
              slidesPerView: 1.7,
            },
            1440: {
              slidesPerView: 1.8,
            },
            1460: {
              slidesPerView: 1.9,
            },
            1920: {
              slidesPerView: 2.2,
            },
            2048: {
              slidesPerView: 2.5,
            },
            2560: {
              slidesPerView: 3,
            },
            3840: {
              slidesPerView: 3.5,
            },
            4096: {
              slidesPerView: 4,
            },
            4380: {
              slidesPerView: 4.5,
            },
            4800: {
              slidesPerView: 5,
            },
            5120: {
              slidesPerView: 5.5,
            },
            5440: {
              slidesPerView: 6,
            },
          }}
        >
          {translations.slides.map((slide, index) => {
            const slideImage = SLIDE_IMAGES[index];
            return (
              <SwiperSlide key={index + 1} className="w-full h-auto">
                <div className="max-w-[880px] mx-auto w-full flex justify-center rounded-2xl p-5 flex-col bg-white space-y-5 min-h-0 lg:min-h-[660px]">
                  <SwiperSlideImage
                    image={slideImage.image}
                    imageRight={slideImage.imageRight}
                    title={slide.title}
                  />

                  <div className="flex flex-col md:flex-row gap-5 justify-between items-center md:items-stretch">
                    <div className="flex flex-col gap-[10px] lg:gap-[13px] flex-1">
                      <h3 className="font-serif text-[34px] line-height-[36px] text-primary">
                        {slide.title}
                      </h3>
                      <p className="text-sm leading-5 font-sans text-grey-text overflow-hidden">
                        {slide.description}
                      </p>
                    </div>

                    <div className="flex items-center w-full md:w-auto">
                      <SwiperSlideButton
                        youtubeUrl={slideImage.youtubeUrl}
                        testimonialId={slideImage.testimonialId}
                        buttonText={slide.buttonText}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 lg:w-25 z-10 [background-image:linear-gradient(to_left,white,transparent)]"></div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-[30px]">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-4 border-2 border-gray-200 rounded-full hover:bg-grey-light hover:shadow-lg transition-all cursor-pointer"
            aria-label="Previous"
          >
            <Image
              src="/right-arrow.svg"
              alt=""
              width={24}
              height={24}
              className="rotate-180"
            />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-4 border-2 border-gray-200 rounded-full hover:bg-grey-light hover:shadow-lg transition-all cursor-pointer"
            aria-label="Next"
          >
            <Image src="/right-arrow.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
