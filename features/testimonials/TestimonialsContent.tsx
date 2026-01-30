'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getTestimonialById, TESTIMONIALS } from '@/features/testimonials/data';
import { getLocale } from '@/lib/i18n';
import { AudioPlayer } from '@/components/AudioPlayer';

interface TestimonialsContentProps {
  id: string;
}

// Convert YouTube URL to embed format
function getYouTubeEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;

  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return null;
}

export default function TestimonialsContent({ id }: TestimonialsContentProps) {
  const pathname = usePathname();
  const testimonial = getTestimonialById(id) || TESTIMONIALS[0];
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(testimonial.youtubeUrl);
  const [translations, setTranslations] = useState<{
    detail: {
      sections: {
        impact: { title: string };
        conclusion: { title: string };
      };
    };
    testimonials: {
      [key: string]: {
        title: string;
        name: string;
        role: string;
        description: string;
        content: {
          introTitle: string;
          introText: string[];
          impactText: string[];
          conclusionText: string[];
        };
      };
    };
  } | null>(null);

  useEffect(() => {
    const locale = getLocale(pathname);
    import(`@/translations/testimonials/${locale}.json`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch(() => {
        // Fallback to English
        import('@/translations/testimonials/en.json')
          .then((module) => {
            setTranslations(module.default);
          })
          .catch(() => {
            console.error('Failed to load testimonials translations');
          });
      });
  }, [pathname, id]);

  const testimonialData = translations?.testimonials?.[id];
  const content = testimonialData?.content;
  const testimonialTitle = testimonialData?.title || testimonial.title;

  return (
    <div className="grow px-4 md:px-6">
      <div className="max-w-[800px] mx-auto relative z-10 bg-white p-8 md:p-[30px] rounded-[20px] text-grey-text">
        {/* Video Placeholder (Static Image) or Video Player */}
        <div className="w-full aspect-video rounded-[20px] mb-12 relative overflow-hidden">
          {isVideoPlaying && embedUrl ? (
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title={testimonialTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <>
              <Image
                src={testimonial.image}
                alt={`${testimonialTitle} - Testimonial`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1600px"
              />
              {embedUrl && (
                <>
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors z-10 cursor-pointer group"
                  aria-label="Play video"
                >
                  <div className="relative w-[40px] h-[40px] md:w-[100px] md:h-[100px] sm:w-[50px] sm:h-[50px] flex items-center justify-center">
                    <Image
                      src="/play-button.svg"
                      alt="Play video"
                      width={100}
                      height={100}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </div>
                </button>
                <div className="absolute bottom-0 left-0 w-full">
                  <AudioPlayer youtubeVideoDuration={testimonial.youtubeVideoDuration} />
                </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Introduction Section */}
        {content && (
          <>
            <section className="mb-12">
              <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                {content.introTitle}
              </h2>
              <div className="leading-[28px] text-[18px] tracking-[-0.004em] space-y-6">
                {content.introText.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Impact Section */}
            <section className="mb-12">
              <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                {translations?.detail?.sections?.impact?.title ||
                  'Impact & Results'}
              </h2>
              <div className="leading-[28px] text-[18px] tracking-[-0.004em] space-y-6">
                {content.impactText.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Conclusion Section */}
            <section className="mb-12">
              <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                {translations?.detail?.sections?.conclusion?.title ||
                  'Conclusion'}
              </h2>
              <div className="leading-[28px] text-[18px] tracking-[-0.004em] space-y-6">
                {content.conclusionText.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
