'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AudioPlayer } from '@/components/AudioPlayer';

interface TestimonialCardProps {
  id: string;
  image: string;
  title: string;
  name: string;
  role: string;
  description: string;
  showPlayButton?: boolean;
  youtubeUrl?: string;
  youtubeVideoDuration?: string;
  onPlayClick?: (id: string) => void;
  playOnCardClick?: boolean;
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

export default function TestimonialCard({
  id,
  image,
  title,
  name,
  role,
  description,
  showPlayButton = false,
  youtubeUrl,
  youtubeVideoDuration,
  onPlayClick,
  playOnCardClick = false,
}: TestimonialCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const embedUrl = youtubeUrl ? getYouTubeEmbedUrl(youtubeUrl) : null;
  const hasVideo = showPlayButton && !!embedUrl;  

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlayClick) {
      onPlayClick(id);
    } else {
      setIsVideoPlaying(true);
    }
  };

  const handleCardClick = () => {
    if (hasVideo) {
      setIsVideoPlaying(true);
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className={`bg-white rounded-[20px] p-6 flex flex-col gap-[20px] w-full h-full hover:shadow-lg group transition-shadow ${playOnCardClick && hasVideo ? 'cursor-pointer' : ''}`}
      onClick={playOnCardClick ? handleCardClick : undefined}
      onKeyDown={playOnCardClick ? handleCardKeyDown : undefined}
      role={playOnCardClick && hasVideo ? 'button' : undefined}
      tabIndex={playOnCardClick && hasVideo ? 0 : undefined}
      aria-label={playOnCardClick && hasVideo ? `Play ${title} video` : undefined}
    >
      {/* Thumbnail */}
      <div className="block w-full aspect-[16/9] md:h-[292px] md:aspect-auto rounded-[10px] relative overflow-hidden">
        {isVideoPlaying && embedUrl ? (
          <iframe
            src={`${embedUrl}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <>
            <Image
              src={image}
              alt={title}
              height={292}
              width={292}
              className="object-cover w-full h-full"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {hasVideo && (
              <>
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group rounded-[10px] z-10"
                aria-label="Play video"
                type="button"
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
              <div className='absolute bottom-0  w-full'>
                <AudioPlayer youtubeVideoDuration={youtubeVideoDuration} />
              </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[12px] min-h-[112px]">
        <h4 className="font-serif text-[28px] leading-[34px] tracking-[-0.01em] text-primary font-normal">
          {title}
        </h4>
        <div className="text-[14px] leading-[20px] text-grey-text">
          <p className="text-[16px] leading-[138%] tracking-[-0.004em] font-semibold font-sans">
            {name} – {role}
          </p>
          <p className="italic text-grey-text/80 text-[16px] leading-[138%] tracking-[-0.004em] font-sans">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
