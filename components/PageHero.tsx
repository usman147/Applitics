import Image from 'next/image';
import { ReactNode } from 'react';

interface PageHeroProps {
  title: string | ReactNode;
  pillText: string;
}

export default function PageHero({ title, pillText }: PageHeroProps) {
  return (
    <section className="relative w-full min-h-[411px] flex flex-col items-center justify-center text-white overflow-hidden pt-24 pb-12">
      <Image
        src="/hero-image.jpg"
        alt="hero background image"
        fill
        priority
        className="object-fill object-center"
        sizes="100vw"
      />
      <div className="z-10 text-center flex flex-col items-center gap-[22px] max-w-4xl px-4 my-14">
        {/* Pill */}
        <div className="inline-flex px-6 py-2 bg-white rounded-[100px] justify-center items-center">
          <span className="text-primary text-[14px] font-normal font-ibm-plex-sans-condensed uppercase leading-[26px] tracking-[0.05em]">
            {pillText}
          </span>
        </div>
        {/* Main Title */}
        <h1 className="font-serif text-[52px] leading-[60px] tracking-normal text-center font-normal">
          {title}
        </h1>
      </div>
    </section>
  );
}
