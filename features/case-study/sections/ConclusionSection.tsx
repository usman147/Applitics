'use client';

interface ConclusionTranslations {
  title: string;
  paragraph1: {
    text: string;
    highlightedText: string;
  };
  paragraph2: {
    text: string;
    highlightedText1: string;
    text2: string;
    highlightedText2: string;
    text3: string;
  };
  paragraph3: {
    text: string;
    highlightedText: string;
    text2: string;
  };
}

interface ConclusionSectionProps {
  translations: ConclusionTranslations;
}

export default function ConclusionSection({
  translations,
}: ConclusionSectionProps) {

  return (
    <div className="bg-white px-4 py-6 rounded-lg">
      <h2 className="text-primary-light mb-5 text-center text-lg font-semibold lg:text-2xl">
        {translations.title}
      </h2>
      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
          {translations.paragraph1.text}{' '}
          <span className="font-semibold">
            {translations.paragraph1.highlightedText}
          </span>
          .
        </p>
        <p className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
          {translations.paragraph2.text}{' '}
          <span className="font-semibold">
            {translations.paragraph2.highlightedText1}
          </span>{' '}
          {translations.paragraph2.text2}{' '}
          <span className="font-semibold">
            {translations.paragraph2.highlightedText2}
          </span>{' '}
          {translations.paragraph2.text3}
        </p>
        <p className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
          {translations.paragraph3.text}{' '}
          <span className="font-semibold">
            {translations.paragraph3.highlightedText}
          </span>
          . {translations.paragraph3.text2}
        </p>
      </div>
    </div>
  );
}
