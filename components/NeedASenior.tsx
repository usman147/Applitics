import Link from 'next/link';
import Image from 'next/image';

interface NeedASeniorProps {
  translations: {
    caption: string;
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

export default function NeedASenior({ translations }: NeedASeniorProps) {
  if (!translations || !translations.caption) {
    console.error('Contact translations failed to load');
    return <div>Error loading translations</div>;
  }

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="min-h-[408px] flex items-center justify-center rounded-[20px] overflow-hidden text-center relative bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/contact-us-image.svg')" }}
        >
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-white/80 font-ibm-plex-sans-condensed tracking-[0.26em] text-[16px] leading-[26px] font-medium uppercase mb-4">
              {translations.caption}
            </span>
            <h2 className="font-serif text-[52px] leading-[60px] text-white mb-2 font-normal">
              {translations.title}
            </h2>
            <h2 className="font-serif text-[52px] leading-[60px] text-white italic mb-10 font-normal">
              {translations.subtitle}
            </h2>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary-light px-8 py-4 rounded-full font-instrument-sans font-semibold text-[18px] leading-[142%] tracking-normal"
            >
              {translations.buttonText}
              <Image
                src="/icon-arrow-blue.svg"
                alt="Arrow"
                width={16}
                height={16}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
