'use client';

import CodeBlock from '../CodeBlock';

interface Section8Translations {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  cssTranslationTitle: string;
  paragraph4: string;
  paragraph5: string;
  paragraph6: {
    text: string;
    scss: string;
    text2: string;
  };
  traditionalMethod: {
    text: string;
    sass: string;
    text2: string;
  };
  command: string;
  paragraph7: {
    text: string;
    sassPackage: string;
    text2: string;
  };
  paragraph8: string;
  paragraph9: string;
}

interface Section8SASSProps {
  translations: Section8Translations;
}

export default function Section8SASS({ translations }: Section8SASSProps) {
  return (
    <div id="section-8" className="bg-white px-4 py-6 rounded-[20px]">
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
          {translations.paragraph3}
        </p>

        {/* SASS Code Block */}
        <CodeBlock
          language="scss"
          code={`#main_content {
  padding: 50px 7%;
  .introduction {
    position: relative;
    background-color: white;
    padding: 10px 25px 30px 25px;
    margin-bottom: 20px;
    h3 {
      font-size: 20px;
      color: $red;
      text-transform: uppercase;
    }
  }
}`}
        />

        <h3 className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] font-medium mt-2 mb-2">
          {translations.cssTranslationTitle}
        </h3>

        {/* CSS Code Block */}
        <CodeBlock
          language="css"
          code={`#main_contents {
  padding: 50px 7%;
}

#main_content .introduction {
  position: relative;
  background-color: white;
  padding: 10px 25px 30px 25px;
  margin-bottom: 20px;
}

#main_content .introduction h3 {
  font-size: 20px;
  color: $red;
  text-transform: uppercase;
}`}
        />

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph4}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph5}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph6.text}{' '}
          <span className="font-mono">{translations.paragraph6.scss}</span>{' '}
          {translations.paragraph6.text2}
        </p>
        <div className="mt-2 mb-4">
          <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
            {translations.traditionalMethod.text}{' '}
            <span className="bg-[#F1EFEF] px-1 font-mono">
              {translations.traditionalMethod.sass}
            </span>{' '}
            {translations.traditionalMethod.text2}
          </p>
          <CodeBlock language="bash" code={translations.command} />
        </div>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph7.text}{' '}
          <span className="font-mono">
            {'{'}
            {translations.paragraph7.sassPackage}
            {'}'}
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
