'use client';

import CodeBlock from '../CodeBlock';

interface Section7Translations {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: {
    text: string;
    fluidRow: string;
    text2: string;
    column: string;
    text3: string;
  };
  paragraph4: string;
  paragraph5: string;
  paragraph6: {
    text: string;
    id: string;
    text2: string;
  };
  paragraph7: {
    text: string;
    id: string;
    text2: string;
  };
  paragraph8: string;
  paragraph9: string;
}

interface Section7HTMLSkeletonProps {
  translations: Section7Translations;
}

export default function Section7HTMLSkeleton({
  translations,
}: Section7HTMLSkeletonProps) {
  return (
    <div id="section-7" className="bg-white px-4 py-6 rounded-[20px]">
      <h2 className="font-serif text-[34px] leading-[40px] text-primary mb-4 font-normal">
        {translations.title}
      </h2>

      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph1}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph2}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph3.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-sans font-mono">
            {translations.paragraph3.fluidRow}
          </span>{' '}
          {translations.paragraph3.text2}{' '}
          <span className="bg-[#F1EFEF] px-1 font-sans font-mono">
            {translations.paragraph3.column}
          </span>{' '}
          {translations.paragraph3.text3}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph4}
        </p>

        {/* Code Block */}
        <CodeBlock
          language="r"
          code={`fluidPage(
  fluidRow(
    id = "header",
    # Contenu de l'en-tête
  ),
  fluidRow(
    id = "body_content",
    column(
      id = "sidebar_content",
      width = 3,
      div(
        # Contenu de la barre latérale
      )
    ),
    column(
      id = "main_content",
      width = 9,
      div(
        # Contenu du corps principal
      )
    )
  )
)`}
        />

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph5}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph6.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-sans font-mono">
            {translations.paragraph6.id}
          </span>{' '}
          {translations.paragraph6.text2}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph7.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-sans font-mono">
            {translations.paragraph7.id}
          </span>{' '}
          {translations.paragraph7.text2}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph8}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph9}
        </p>
      </div>
    </div>
  );
}
