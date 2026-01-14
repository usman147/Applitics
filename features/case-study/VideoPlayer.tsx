'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getTestimonialById } from '@/features/testimonials/data';

interface VideoPlayerProps {
  testimonialId: string;
}

export default function VideoPlayer({ testimonialId }: VideoPlayerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const testimonial = getTestimonialById(testimonialId);
  const embedUrl = testimonial ? testimonial.youtubeUrl : null;

  if (!testimonial) return null;

  return (
    <div className="w-full aspect-video rounded-md relative overflow-hidden">
      {isVideoPlaying && embedUrl ? (
        <iframe
          src={`${embedUrl}?autoplay=1`}
          title={testimonial.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <>
          <Image
            src={testimonial.image}
            alt={`${testimonial.title} - Testimonial`}
            fill
            className="object-fill"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1600px"
          />
          {embedUrl && (
            <button
              onClick={() => setIsVideoPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group"
              aria-label="Play video"
            >
              <div className="relative w-[40px] h-[40px] md:w-[100px] md:h-[100px]  sm:w-[50px] sm:h-[50px] flex items-center justify-center">
                <Image
                  src="/play-button.svg"
                  alt="Play video"
                  width={100}
                  height={100}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
            </button>
          )}
        </>
      )}
    </div>
  );
}
