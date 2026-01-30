import Link from 'next/link';

interface HeroMainSectionProps {
  translations: {
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
    subtitle: {
      parts: string[];
    };
    cta: {
      primary: string;
      secondary: string;
    };
  };
}

export default function HeroMainSection({
  translations,
}: HeroMainSectionProps) {
  return (
    <div className="flex flex-col justify-start items-start gap-5 relative z-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-white text-6-5xl md:text-7xl font-normal font-serif leading-[54px] md:leading-[72px]">
          {translations.title.parts.map((part, index) => {
            const text = typeof part === 'string' ? part : part.text;
            const highlight = typeof part === 'object' && part.highlight;
            const breakAfter = typeof part === 'object' && part.breakAfter;
            const isRShiny =
              typeof part === 'object' && part.text === 'R Shiny';

            return (
              <span key={index}>
                {highlight || isRShiny ? (
                  <span
                    className={`${highlight ? 'text-primary-light' : ''} ${
                      isRShiny ? 'italic' : ''
                    }`.trim()}
                  >
                    {text}
                  </span>
                ) : (
                  text
                )}
                {breakAfter && <br />}
              </span>
            );
          })}
        </h1>
        <p className="max-w-[456.65px] text-white text-sm md:text-base font-normal font-sans">
          {translations.subtitle.parts.map((part, index) => (
            <span key={index}>
              {part}
              {index < translations.subtitle.parts.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-5 mt-1 md:mt-6 w-full md:w-auto">
        <Link
          href="/contact"
          className="w-full md:w-auto px-5 py-3 bg-white rounded-[40.06px] text-primary-light text-sm font-semibold font-sans text-center"
        >
          {translations.cta.primary}
        </Link>
        <Link
          href="/#real-world-examples"
          className="w-full md:w-auto px-5 py-3 rounded-[40.06px] border border-white bg-transparent text-white text-sm font-semibold font-sans text-center"
        >
          {translations.cta.secondary}
        </Link>
      </div>
    </div>
  );
}
