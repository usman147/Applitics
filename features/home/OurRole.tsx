'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Checkmark icon component
const CheckmarkIcon = () => (
  <div className="shrink-0 w-6 h-6 rounded-full bg-primary-lighter flex items-center justify-center mt-0.5">
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// Helper function to render text with parts (for bold text support)
const renderText = (
  content: string | { parts: Array<string | { text: string; bold: boolean }> }
): React.ReactNode => {
  if (typeof content === 'string') {
    return content;
  }
  if (content && 'parts' in content && Array.isArray(content.parts)) {
    return (
      <>
        {content.parts.map(
          (part: string | { text: string; bold: boolean }, idx: number) =>
            typeof part === 'string' ? (
              <span key={idx}>{part}</span>
            ) : (
              <span key={idx} className="font-bold">
                {part.text}
              </span>
            )
        )}
      </>
    );
  }
  return null;
};

// Helper function to render step content from translations
const renderStepContent = (stepData: {
  title: string;
  intro?: string[];
  beforeCode?:
    | string
    | { parts: Array<string | { text: string; bold: boolean }> };
  description?: string;
  whenSlips?: string;
  howWeTakeOver?: string;
  uiux?: string | { parts: Array<string | { text: string; bold: boolean }> };
  items?: Array<
    string | { parts: Array<string | { text: string; bold: boolean }> }
  >;
}) => {
  return (
    <>
      <h3 className="font-serif text-[32px] font-normal leading-[38px] pb-6">
        {stepData.title}
      </h3>
      {stepData.intro && (
        <div className="space-y-4 pb-6">
          {stepData.intro.map((text: string, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <CheckmarkIcon />
              <p className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
                {text}
              </p>
            </div>
          ))}
        </div>
      )}
      {stepData.beforeCode && (
        <div className="pb-6">
          <p className="font-sans text-lg leading-[28px] tracking-[-0.004em] pb-2">
            {renderText(stepData.beforeCode)}
          </p>
          {stepData.description && (
            <p className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
              {stepData.description}
            </p>
          )}
        </div>
      )}
      {stepData.whenSlips && (
        <div className="pb-6">
          <p className="font-sans text-lg leading-[28px] tracking-[-0.004em] pb-2">
            {stepData.whenSlips}
          </p>
          {stepData.howWeTakeOver && (
            <p className="font-sans text-lg leading-[28px] tracking-[-0.004em] font-bold">
              {stepData.howWeTakeOver}
            </p>
          )}
        </div>
      )}
      {stepData.uiux && (
        <div className="pb-6">
          <p className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
            {renderText(stepData.uiux)}
          </p>
        </div>
      )}
      {stepData.description &&
        !stepData.beforeCode &&
        !stepData.whenSlips &&
        !stepData.uiux && (
          <div className="pb-6">
            <p className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
              {stepData.description}
            </p>
          </div>
        )}
      {stepData.items && (
        <div className="space-y-4">
          {stepData.items.map(
            (
              item:
                | string
                | { parts: Array<string | { text: string; bold: boolean }> },
              index: number
            ) => {
              // If item is a string, render it directly
              if (typeof item === 'string') {
                return (
                  <div key={index} className="flex items-start gap-3">
                    <CheckmarkIcon />
                    <p className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
                      {item}
                    </p>
                  </div>
                );
              }
              // If item has parts array, render with bold support
              return (
                <div key={index} className="flex items-start gap-3">
                  <CheckmarkIcon />
                  <p className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
                    {renderText(item)}
                  </p>
                </div>
              );
            }
          )}
        </div>
      )}
    </>
  );
};

const TIMER_DURATION = 5000; // 5 seconds

// Left Side Component - Step Cards
interface LeftSideProps {
  steps: Array<{ number: string; title: string }>;
  currentStep: number;
  timerProgress: number;
  hasUserInteracted: boolean;
  onStepClick: (index: number) => void;
  circumference: number;
  radius: number;
}

const LeftSide = ({
  steps,
  currentStep,
  timerProgress,
  hasUserInteracted,
  onStepClick,
  circumference,
  radius,
}: LeftSideProps) => {
  return (
    <div className="flex flex-col justify-between gap-6 flex-1">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const stepProgress = isActive
          ? timerProgress
          : index < currentStep
            ? 100
            : 0;
        const stepOffset = circumference - (stepProgress / 100) * circumference;

        return (
          <div
            key={index}
            className={`relative bg-white rounded-[24px] p-4 cursor-pointer transition-all duration-300 ${
              isActive ? 'ring-2 ring-primary-lighter' : ''
            }`}
            onClick={() => onStepClick(index)}
          >
            <div className="flex items-center gap-6">
              {/* Step Number */}
              <div className="shrink-0">
                <span
                  className={`font-serif text-[52px] font-normal leading-[60px] ${
                    isActive
                      ? 'text-primary-lighter'
                      : 'text-primary-lighter/50'
                  }`}
                >
                  {step.number}.
                </span>
              </div>

              {/* Separator */}
              <div className="shrink-0 w-px h-[83px] bg-grey-dark"></div>

              {/* Step Title */}
              <div className="flex-1">
                <p
                  className={`font-serif text-[28px] md:max-w-[320px] leading-[28px] tracking-[-0.004em] ${
                    isActive ? 'text-primary font-semibold' : 'text-primary'
                  }`}
                >
                  {step.title}
                </p>
              </div>

              {/* Arrow with Timer Circle */}
              {/* Change container to 74px */}
              <div className="shrink-0 relative w-[74px] h-[74px]">
                {/* Circular Timer */}
                {isActive && !hasUserInteracted && (
                  <svg
                    className="absolute inset-0 transform -rotate-90 w-[74px] h-[74px]"
                    width="74"
                    height="74"
                    viewBox="0 0 74 74" 
                  >
                    {/* Background circle */}
                    <circle
                      cx="37" // Center point (74 / 2)
                      cy="37"
                      r={radius}
                      fill="none"
                      stroke="#D9DFEB"
                      strokeWidth="1" // Reduced to 1px
                    />
                    {/* Progress circle */}
                    <circle
                      cx="37"
                      cy="37"
                      r={radius}
                      fill="none"
                      stroke="#3EAAFF"
                      strokeWidth="1" // Reduced to 1px
                      strokeDasharray={circumference}
                      strokeDashoffset={stepOffset}
                      strokeLinecap="round"
                      className="transition-all duration-75 ease-linear"
                    />
                  </svg>
                )}

                {/* Arrow Icon */}
                {isActive && !hasUserInteracted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/right-arrow.svg"
                      alt="Arrow"
                      width={34} // Matches arrowSize
                      height={34}
                      className="w-[34px] h-[34px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Right Side Component - Dynamic Content
interface RightSideProps {
  stepContent: Array<{ content: React.ReactNode }>;
  currentStep: number;
  isContentExpanded: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
  onReadMore: () => void;
  readMore: string;
}

const RightSide = ({
  stepContent,
  currentStep,
  isContentExpanded,
  contentRef,
  onReadMore,
  readMore,
}: RightSideProps) => {
  return (
    <div className="max-h-[536px] bg-primary rounded-[24px] p-[44px] overflow-hidden text-white flex flex-col relative flex-1 h-full transition-all duration-500 ease-in-out">
      <div
        ref={contentRef}
        key={currentStep}
        className={`animate-fade-in relative flex-1 transition-all duration-500 ease-in-out ${
          isContentExpanded
            ? 'overflow-y-auto custom-scrollbar'
            : 'overflow-hidden'
        }`}
      >
        {typeof stepContent[currentStep].content === 'string' ? (
          <p>{stepContent[currentStep].content}</p>
        ) : (
          stepContent[currentStep].content
        )}
      </div>

      {/* Gradient fade overlay - only show when not expanded */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-90 pointer-events-none z-10 transition-opacity duration-500 ease-in-out ${
          isContentExpanded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background:
            'linear-gradient(to top, rgba(3, 82, 163, 1) 0%, rgba(3, 82, 163, 1) 31.25%, rgba(3, 82, 163, 0.9) 35%, rgba(3, 82, 163, 0.5) 55%, rgba(3, 82, 163, 0) 100%)',
        }}
      />

      {/* Read More Button */}
      {!isContentExpanded && (
        <div className="absolute bottom-[25px] left-0 right-0 flex justify-center z-20">
          <button
            onClick={onReadMore}
            className="px-8 py-3 rounded-full border-2 border-white text-white font-sans text-base leading-[24px] tracking-[-0.004em] hover:bg-white hover:text-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          >
            {readMore}
          </button>
        </div>
      )}
    </div>
  );
};

interface OurRoleProps {
  translations: {
    caption: string;
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
    steps: Array<{
      number: string;
      title: string;
    }>;
    stepContent: Array<{
      title: string;
      intro?: string[];
      beforeCode?:
        | string
        | { parts: Array<string | { text: string; bold: boolean }> };
      description?: string;
      whenSlips?: string;
      howWeTakeOver?: string;
      uiux?:
        | string
        | { parts: Array<string | { text: string; bold: boolean }> };
      items?: Array<
        string | { parts: Array<string | { text: string; bold: boolean }> }
      >;
    }>;
    readMore: string;
  };
}

export default function OurRole({ translations }: OurRoleProps) {
  const STEPS = translations.steps;
  const STEP_CONTENT = translations.stepContent.map((stepData) => ({
    content: renderStepContent(stepData),
  }));
  const [currentStep, setCurrentStep] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Observe section visibility - timer only starts when section is visible
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.our-role-section .reveal-on-scroll'
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-advance timer - only starts when section is visible
  useEffect(() => {
    // Stop auto-advancing if user has interacted or section is not visible
    if (hasUserInteracted || !isVisible) {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    // Progress animation (updates every 16ms for smooth animation)
    progressIntervalRef.current = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 100 / (TIMER_DURATION / 16);
      });
    }, 16);

    // Step advancement timer
    intervalRef.current = setTimeout(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % translations.steps.length;
        // Reset progress when step changes
        setTimerProgress(0);
        return nextStep;
      });
    }, TIMER_DURATION);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentStep, hasUserInteracted, isVisible, translations.steps.length]);

  const handleStepClick = (index: number) => {
    setHasUserInteracted(true);
    setCurrentStep(index);
    setTimerProgress(0);
    setIsContentExpanded(false);
  };

  const handleReadMore = () => {
    setHasUserInteracted(true);
    setIsContentExpanded(true);
  };

  // Calculate circle circumference for SVG timer
  // Circle should fit around the padded arrow container
const arrowSize = 34;        // Slightly larger to fill the space
const arrowPadding = 4;      
const radius = 34;           // Diameter of 68px
const circumference = 2 * Math.PI * radius;

  return (
    <section ref={sectionRef} className="w-full our-role-section hidden md:block">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 reveal-on-scroll">
          <p className="font-ibm-plex-sans-condensed text-base font-medium uppercase leading-[26px] tracking-[0.26em] text-primary mb-4">
            {translations.caption}
          </p>
          <h2 className="font-serif text-[34px] md:text-[52px] leading-[36px] md:leading-[60px] font-normal text-primary">
            {translations.title.parts.map((part, index) => {
              const text = typeof part === 'string' ? part : part.text;
              const highlight = typeof part === 'object' && part.highlight;
              const breakAfter = typeof part === 'object' && part.breakAfter;

              return (
                <span key={index}>
                  {highlight ? (
                    <span className="text-primary-light">{text}</span>
                  ) : (
                    text
                  )}
                  {breakAfter && <br />}
                </span>
              );
            })}
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-[25px] lg:grid-cols-[minmax(0,585px)_minmax(0,545px)]">
          <LeftSide
            steps={STEPS}
            currentStep={currentStep}
            timerProgress={timerProgress}
            hasUserInteracted={hasUserInteracted}
            onStepClick={handleStepClick}
            circumference={circumference}
            radius={radius}
          />
          <RightSide
            stepContent={STEP_CONTENT}
            currentStep={currentStep}
            isContentExpanded={isContentExpanded}
            contentRef={contentRef}
            onReadMore={handleReadMore}
            readMore={translations.readMore}
          />
        </div>
      </div>
    </section>
  );
}
