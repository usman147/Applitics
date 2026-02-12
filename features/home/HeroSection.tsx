import HeroMainSection from './HeroMainSection';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import AnimatedDnaSvg from './AnimatedDnaSvg';
import HAnimatedDnaSvg from './HAnimatedDnaSvg';
import { PartnerTicker } from '@/components/PartnerLogoTicker';

// Partner logos array - add more logos here as you get them
const partnerLogos = [
  '/partners/oxford.svg',
  '/partners/faao.svg',
  '/partners/sanofi.svg',
  '/partners/the-world-bank.svg',
  '/partners/mathematic.svg',
  '/partners/digital-fuel-capital.svg',
  '/partners/mercator-ocean.svg',
  '/partners/gates-foundation.svg',
  '/partners/cgiar.svg',
];

interface HeroSectionProps {
  translations: {
    title: {
      parts: string[];
      italicIndex: number;
    };
    subtitle: {
      parts: string[];
    };
    cta: {
      primary: string;
      secondary: string;
    };
    trustBadge: string;
    partnering: {
      parts: string[];
    };
  };
}

export default function HeroSection({ translations }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[903px] md:min-h-[772px] flex flex-col justify-between pt-[150px] md:pt-[224px]">
      {/* Hero Background Image - Optimized */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <Image
          src="/hero-image.jpg"
          alt="hero background image"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={100}
        />
      </div>
      <div className="absolute inset-0 z-0 block lg:hidden">
        <Image
          src="/hero-image-moble.svg"
          alt="hero background image"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={100}
        />
      </div>
      {/* middle section */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 lg:px-0 w-full h-full flex flex-col md:flex-row justify-between md:items-center">
        {/* Text Section */}
        <HeroMainSection translations={translations} />
        {/* Stars Section */}
        <div className="relative flex-1 h-full flex flex-col items-center justify-center gap-4 min-h-[60vw] md:min-h-0">
          {/* DNA Animation SVG - Background Layer Desktop */}
          <div className="hidden md:flex absolute h-full inset-0 z-1 items-center justify-center lg:translate-x-[7.5%] md:translate-x-[-40%] translate-y-[-3px]">
            <AnimatedDnaSvg />
          </div>
          {/* DNA Animation SVG - Background Layer Mobile */}
          <div className="flex md:hidden absolute h-full inset-0 right-[-50%] left-[-50%] z-1 items-center justify-center lg:mt-0 mt-11">
            <HAnimatedDnaSvg />
          </div>
          <div className="relative z-10 flex items-center justify-center gap-2 lg:mt-4 sm:mt-10 lg:translate-x-[68px] mt-16">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src="/star-icon.svg"
                alt=""
                width={15}
                height={15}
                className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5"
                loading="lazy"
              />
            ))}
          </div>
          <div className="max-w-[45vw] sm:max-w-[40vw] md:max-w-[300px] text-[18px] sm:text-[18px] md:text-lg relative 
          z-10 flex flex-col text-center text-white font-ibm-plex-sans-condensed  font-medium italic uppercase leading-[118%] tracking-[-0.01em] lg:translate-x-[68px]">
            {translations.trustBadge}
          </div>
        </div>
      </div>
      {/* Partners section */}
      <div className="absolute bottom-0 left-0 right-0 w-full partners-container pb-[45px] z-10 pt-100">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center gap-6 lg:px-0 md:px-4">
          <p className="text-white font-sans font-semibold text-base shrink-0 flex flex-col uppercase ">
            {translations.partnering.parts.map((part, index) => (
              <span key={index}>
                {part}
                {index < translations.partnering.parts.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="flex-1 overflow-hidden partners-fade">
            {/* <Marquee speed={50}>
              {partnerLogos.map((logo, index) => (
                <div key={index} className="shrink-0 h-[50px] mx-10">
                  <Image
                    key={index}
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    width={200}
                    height={50}
                    className="w-auto h-full object-fill"
                    loading="lazy"
                  />
                </div>
              ))}
            </Marquee> */}
            
            <PartnerTicker partnerLogos={partnerLogos} />
          </div>
        </div>
      </div>
    </section>
  );
}
