'use client';

import Image from 'next/image';
import CodeBlock from '../CodeBlock';

interface Section5Translations {
  title: string;
  intro: string;
  technology1: {
    name: string;
    text: string;
    rPackageLink: string;
    rPackageUrl: string;
    text2: string;
    datastormLink: string;
    datastormUrl: string;
    text3: string;
    trackLink: string;
    trackUrl: string;
    text4: string;
  };
  technology2: {
    name: string;
    text: string;
    rPackageLink: string;
    rPackageUrl: string;
    text2: string;
  };
  technology3: {
    name: string;
    text: string;
    solutionLink: string;
    solutionUrl: string;
    text2: string;
  };
  paragraph1: string;
  paragraph2: string;
  paragraph3: {
    text: string;
    cursoLink: string;
    cursoUrl: string;
    text2: string;
  };
  paragraph4: {
    text: string;
    auth0Package: string;
    text2: string;
    sessionVar: string;
    text3: string;
  };
  paragraph5: string;
  paragraph6: {
    text: string;
    userDataVar: string;
    text2: string;
  };
  paragraph7: string;
  paragraph8: {
    text: string;
    auth0Package: string;
    text2: string;
  };
  auth0UITitle: string;
  imageAlt: string;
  paragraph9: string;
  paragraph10: {
    text: string;
    auth0Package: string;
    text2: string;
    branding: string;
    text3: string;
    universalLogin: string;
    text4: string;
    advancedOptions: string;
    text5: string;
  };
  paragraph11: string;
}

interface Section5AuthenticationSystemProps {
  translations: Section5Translations;
}

export default function Section5AuthenticationSystem({
  translations,
}: Section5AuthenticationSystemProps) {
  return (
    <div id="section-5" className="bg-white px-4 py-6 rounded-[20px]">
      <h2 className="font-serif text-[34px] leading-[40px] text-primary mb-4 font-normal">
        {translations.title}
      </h2>

      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.intro}
        </p>

        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              <span className="font-semibold">
                {translations.technology1.name}
              </span>{' '}
              {translations.technology1.text}{' '}
              <a
                href={translations.technology1.rPackageUrl}
                className="text-primary-light font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.technology1.rPackageLink}
              </a>{' '}
              {translations.technology1.text2}{' '}
              <a
                href={translations.technology1.datastormUrl}
                className="text-primary-light font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.technology1.datastormLink}
              </a>
              . {translations.technology1.text3}{' '}
              <a
                href={translations.technology1.trackUrl}
                className="text-primary-light font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.technology1.trackLink}
              </a>{' '}
              {translations.technology1.text4}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              <span className="font-semibold">
                {translations.technology2.name}
              </span>{' '}
              {translations.technology2.text}{' '}
              <a
                href={translations.technology2.rPackageUrl}
                className="text-primary-light font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.technology2.rPackageLink}
              </a>{' '}
              {translations.technology2.text2}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              <span className="font-semibold">
                {translations.technology3.name}
              </span>{' '}
              {translations.technology3.text}{' '}
              <a
                href={translations.technology3.solutionUrl}
                className="text-primary-light font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.technology3.solutionLink}
              </a>
              . {translations.technology3.text2}
            </span>
          </li>
        </ul>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph1}
        </p>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph2}
        </p>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph3.text}{' '}
          <a
            href={translations.paragraph3.cursoUrl}
            className="text-primary-light font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {translations.paragraph3.cursoLink}
          </a>{' '}
          {translations.paragraph3.text2}
        </p>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph4.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-mono">
            {translations.paragraph4.auth0Package}
          </span>{' '}
          {translations.paragraph4.text2}{' '}
          <span className="bg-[#F1EFEF] px-1 font-mono">
            {translations.paragraph4.sessionVar}
          </span>{' '}
          {translations.paragraph4.text3}
        </p>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph5}
        </p>

        {/* Code Block */}
        <CodeBlock
          language="r"
          code={`library(shiny)

ui <- fluidPage()

server <- function(input, output, session) {
  # Initialize user-specific reactive data
  user_data <- reactiveValues()
  
  # Retrieve the user name from the session variable
  # session$userData$auth0_info
  observe({
    auth_info <- session$userData$auth0_info
    if (!is.null(auth_info)) {
      user_data$username <- auth_info$nickname
      # Define the user's data folder
      user_data$data_folder <- file.path("data", user_data$username)
    }
    print(user_data$folder) # displays "data/username_1"
  })
}

auth0::shinyAppAuth0(ui, server)`}
        />

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph6.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-mono">
            {translations.paragraph6.userDataVar}
          </span>{' '}
          {translations.paragraph6.text2}
        </p>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph7}
        </p>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph8.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-mono">
            {translations.paragraph8.auth0Package}
          </span>{' '}
          {translations.paragraph8.text2}
        </p>

        <h3 className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] font-medium italic mt-4">
          {translations.auth0UITitle}
        </h3>

        <div className="my-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src="/case-study/case-study-auth0.webp"
              alt={translations.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1600px"
              loading="lazy"
            />
          </div>
        </div>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph9}
        </p>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph10.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-mono">
            {translations.paragraph10.auth0Package}
          </span>{' '}
          {translations.paragraph10.text2}{' '}
          <span className="font-semibold">
            {translations.paragraph10.branding}
          </span>
          , {translations.paragraph10.text3}{' '}
          <span className="font-semibold">
            {translations.paragraph10.universalLogin}
          </span>
          . {translations.paragraph10.text4}{' '}
          <span className="font-semibold">
            {translations.paragraph10.advancedOptions}
          </span>
          , {translations.paragraph10.text5}
        </p>

        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph11}
        </p>
      </div>
    </div>
  );
}
