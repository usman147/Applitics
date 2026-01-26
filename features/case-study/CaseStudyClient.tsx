'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import CaseStudySlider from '@/features/case-study/CaseStudySlider';
import CaseStudySummary from '@/features/case-study/CaseStudySummary';
import TimelineConnection from '@/features/case-study/TimelineConnection';
import NeedASeniorClient from '@/components/NeedASeniorClient';
import Section1Introduction from '@/features/case-study/sections/Section1Introduction';
import Section2ImprovingUIUX from '@/features/case-study/sections/Section2ImprovingUIUX';
import Section3StartingPoint from '@/features/case-study/sections/Section3StartingPoint';
import Section4ChallengesFaced from '@/features/case-study/sections/Section4ChallengesFaced';
import Section5AuthenticationSystem from '@/features/case-study/sections/Section5AuthenticationSystem';
import Section6GraphicMockup from '@/features/case-study/sections/Section6GraphicMockup';
import Section7HTMLSkeleton from '@/features/case-study/sections/Section7HTMLSkeleton';
import Section8SASS from '@/features/case-study/sections/Section8SASS';
import Section9Visualizations from '@/features/case-study/sections/Section9Visualizations';
import Section10CustomWidget from '@/features/case-study/sections/Section10CustomWidget';
import ConclusionSection from '@/features/case-study/sections/ConclusionSection';

interface SummaryItem {
  id: string;
  label: string;
  romanNumeral: string;
}

export interface CaseStudyClientProps {
  translations: {
    hero: {
      badge: string;
      title: {
        line1: string;
        line2: string;
      };
      description: string;
      objective: {
        label: string;
        text: string;
      };
    };
    summary: {
      title: string;
      items: {
        section3: string;
        section4: string;
        section5: string;
        section6: string;
        section7: string;
        section8: string;
        section9: string;
        section10: string;
      };
    };
    slider: {
      before: string;
      after: string;
    };
    section1: Record<string, unknown>;
    section2: Record<string, unknown>;
    section3: Record<string, unknown>;
    section4: Record<string, unknown>;
    section5: Record<string, unknown>;
    section6: Record<string, unknown>;
    section7: Record<string, unknown>;
    section8: Record<string, unknown>;
    section9: Record<string, unknown>;
    section10: Record<string, unknown>;
    conclusion: Record<string, unknown>;
  };
}

export default function CaseStudyClient({
  translations,
}: CaseStudyClientProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set());
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Build summary items from translations
  const summaryItems: SummaryItem[] = useMemo(
    () => [
      {
        id: 'section-3',
        label: translations.summary.items.section3,
        romanNumeral: 'I',
      },
      {
        id: 'section-4',
        label: translations.summary.items.section4,
        romanNumeral: 'II',
      },
      {
        id: 'section-5',
        label: translations.summary.items.section5,
        romanNumeral: 'III',
      },
      {
        id: 'section-6',
        label: translations.summary.items.section6,
        romanNumeral: 'IV',
      },
      {
        id: 'section-7',
        label: translations.summary.items.section7,
        romanNumeral: 'V',
      },
      {
        id: 'section-8',
        label: translations.summary.items.section8,
        romanNumeral: 'VI',
      },
      {
        id: 'section-9',
        label: translations.summary.items.section9,
        romanNumeral: 'VII',
      },
      {
        id: 'section-10',
        label: translations.summary.items.section10,
        romanNumeral: 'VIII',
      },
    ],
    [translations.summary.items]
  );

  useEffect(() => {
    // Track all sections including section-1 and section-2
    const allSectionIds = [
      'section-1',
      'section-2',
      ...summaryItems.map((item) => item.id),
    ];

    if (allSectionIds.length === 0) return;

    // Function to determine which section is currently most visible/active
    const updateActiveSection = () => {
      const viewportTop = window.scrollY + 150; // Offset for header
      let activeId: string | null = null;
      let closestDistance = Infinity;

      allSectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          const distance = Math.abs(elementTop - viewportTop);

          // Check if element is in the active zone (top 200px of viewport)
          if (elementTop <= viewportTop && elementBottom >= viewportTop - 100) {
            if (distance < closestDistance) {
              closestDistance = distance;
              activeId = id;
            }
          }
        }
      });

      if (activeId && activeId !== activeSection) {
        setActiveSection(activeId);
        setViewedSections((prev) => new Set(prev).add(activeId!));
      }
    };

    // Use IntersectionObserver as primary detection method
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the entry with the highest intersection ratio
      let bestEntry: IntersectionObserverEntry | null = null;
      let maxRatio = 0;

      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      }

      if (bestEntry) {
        const target = bestEntry.target;
        if (target && 'id' in target && typeof target.id === 'string') {
          setActiveSection(target.id);
          setViewedSections((prev) => new Set(prev).add(target.id));
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '-150px 0px -50% 0px',
    });

    // Observe all sections
    allSectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Use scroll handler as backup for more accurate tracking
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial update
    updateActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [summaryItems, activeSection]);

  // Calculate timeline progress based on scroll position
  useEffect(() => {
    const calculateProgress = () => {
      if (!timelineContainerRef.current) return;

      const container = timelineContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + window.scrollY;
      const containerBottom = containerTop + container.scrollHeight;
      const scrollY = window.scrollY;

      // Start progress earlier by offsetting the container top (e.g., 800px before it enters viewport)
      const startOffset = 1200;
      const adjustedContainerTop = containerTop - startOffset;

      // Calculate progress based on how much has been scrolled through
      // Use actual container height for progress calculation, not adjusted height
      const scrolledHeight = Math.max(0, scrollY - adjustedContainerTop);
      const actualTotalHeight = containerBottom - containerTop;
      const scrollProgress =
        actualTotalHeight > 0
          ? Math.min(scrolledHeight / actualTotalHeight, 1)
          : 0;

      setTimelineProgress(scrollProgress);
    };

    // Calculate on mount and scroll
    calculateProgress();
    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress);

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset for header
      const headerOffset = 120;
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementTop - headerOffset;

      // Scroll to section
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Immediately update active section for instant feedback
      setActiveSection(sectionId);
      setViewedSections((prev) => new Set(prev).add(sectionId));

      // Verify after scroll animation completes
      setTimeout(() => {
        const finalElement = document.getElementById(sectionId);
        if (finalElement) {
          const rect = finalElement.getBoundingClientRect();
          // Only update if element is actually in view
          if (rect.top <= 200 && rect.bottom >= 0) {
            setActiveSection(sectionId);
          }
        }
      }, 800);
    }
  };

  return (
    <main className="bg-grey-light font-sans pb-[37px]">
      {/* Hero Section with Case Study Content */}
      <section className="relative pt-[157px] pb-[52px] overflow-hidden">
        {/* Hero Background Image */}
        <Image
          src="/hero-image.jpg"
          alt="Hero Background"
          fill
          className="object-fill"
          priority
          sizes="100vw"
        />

        <div className="relative max-w-8xl mx-auto px-4">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-[62px] items-start pb-[65px] pt-8">
            {/* Left Side - Case Study Content */}
            <div className="text-white space-y-4 pt-8">
              <div className="inline-flex px-4 py-1 bg-white rounded-[100px] justify-center items-center">
                <span className="text-primary text-[14px] font-normal font-ibm-plex-sans-condensed uppercase leading-[26px] tracking-[0.05em]">
                  {translations.hero.badge}
                </span>
              </div>
              
              {/* Heading */}
              <h2 className="font-serif lg:text-[52px] lg:leading-[60px] text-[34px] leading-[36px] font-normal">
                {translations.hero.title.line1}
                <br /> {translations.hero.title.line2}
              </h2>

              {/* Description */}
              <p className="font-sans text-[16px] leading-[138%] tracking-[-0.004em] font-normal max-w-[90%]">
                {translations.hero.description}
              </p>

              {/* Objective */}
              <p className="font-sans text-[16px] leading-[138%] tracking-[-0.004em] font-normal max-w-[90%]">
                <span className="font-semibold">
                  {translations.hero.objective.label}
                </span>{' '}
                {translations.hero.objective.text}
              </p>
            </div>

            {/* Right Side - Before/After Slider */}
            <CaseStudySlider translations={translations.slider} />
          </div>
        </div>
      </section>

      {/* Main Content Sections with Summary Sidebar */}
      <section className="py-16">
        <div className="max-w-8xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_428px] lg:gap-12">
            {/* Left Column - Content Sections with Timeline */}
            <div
              ref={timelineContainerRef}
              className="relative order-2 lg:order-1"
            >
              {/* Continuous vertical timeline line - background */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary-lighter opacity-30" />

              {/* Animated progress line */}
              <div
                className="absolute left-0 top-0 w-[2px] bg-primary-lighter transition-all duration-500 ease-out"
                style={{
                  height: `${timelineProgress * 100}%`,
                  transformOrigin: 'top',
                }}
              />

              <div className="space-y-12 pl-[40px]">
                {/* Section 1: Introduction */}
                <Section1Introduction
                  translations={
                    translations.section1 as unknown as Parameters<
                      typeof Section1Introduction
                    >[0]['translations']
                  }
                />

                {/* Connection Point 1 */}
                <TimelineConnection
                  sectionId="section-1"
                  isViewed={viewedSections.has('section-1')}
                />

                {/* Section 2: Improving the UI/UX */}
                <Section2ImprovingUIUX
                  translations={
                    translations.section2 as unknown as Parameters<
                      typeof Section2ImprovingUIUX
                    >[0]['translations']
                  }
                />

                {/* Connection Point 2 */}
                <TimelineConnection
                  sectionId="section-2"
                  isViewed={viewedSections.has('section-2')}
                />

                {/* Section 3: The Starting Point of the Application */}
                <Section3StartingPoint
                  translations={
                    translations.section3 as unknown as Parameters<
                      typeof Section3StartingPoint
                    >[0]['translations']
                  }
                />

                {/* Connection Point 3 */}
                <TimelineConnection
                  sectionId="section-3"
                  isViewed={viewedSections.has('section-3')}
                />

                {/* Section 4: Challenges Faced */}
                <Section4ChallengesFaced
                  translations={
                    translations.section4 as unknown as Parameters<
                      typeof Section4ChallengesFaced
                    >[0]['translations']
                  }
                />

                {/* Connection Point 4 */}
                <TimelineConnection
                  sectionId="section-4"
                  isViewed={viewedSections.has('section-4')}
                />

                {/* Section 5: How to Set Up an Authentication System */}
                <Section5AuthenticationSystem
                  translations={
                    translations.section5 as unknown as Parameters<
                      typeof Section5AuthenticationSystem
                    >[0]['translations']
                  }
                />

                {/* Connection Point 5 */}
                <TimelineConnection
                  sectionId="section-5"
                  isViewed={viewedSections.has('section-5')}
                />

                {/* Section 6: Preparing a Graphic Mockup */}
                <Section6GraphicMockup
                  translations={
                    translations.section6 as unknown as Parameters<
                      typeof Section6GraphicMockup
                    >[0]['translations']
                  }
                />

                {/* Connection Point 6 */}
                <TimelineConnection
                  sectionId="section-6"
                  isViewed={viewedSections.has('section-6')}
                />

                {/* Section 7: Building the HTML Skeleton of a Shiny Application */}
                <Section7HTMLSkeleton
                  translations={
                    translations.section7 as unknown as Parameters<
                      typeof Section7HTMLSkeleton
                    >[0]['translations']
                  }
                />

                {/* Connection Point 7 */}
                <TimelineConnection
                  sectionId="section-7"
                  isViewed={viewedSections.has('section-7')}
                />

                {/* Section 8: Adding Style to an R Shiny App with SASS */}
                <Section8SASS
                  translations={
                    translations.section8 as unknown as Parameters<
                      typeof Section8SASS
                    >[0]['translations']
                  }
                />

                {/* Connection Point 8 */}
                <TimelineConnection
                  sectionId="section-8"
                  isViewed={viewedSections.has('section-8')}
                />

                {/* Section 9: How to create appealing visualizations in Shiny */}
                <Section9Visualizations
                  translations={
                    translations.section9 as unknown as Parameters<
                      typeof Section9Visualizations
                    >[0]['translations']
                  }
                />

                {/* Connection Point 9 */}
                <TimelineConnection
                  sectionId="section-9"
                  isViewed={viewedSections.has('section-9')}
                />

                {/* Section 10: Creating your own widget in Shiny */}
                <Section10CustomWidget
                  translations={
                    translations.section10 as unknown as Parameters<
                      typeof Section10CustomWidget
                    >[0]['translations']
                  }
                />

                {/* Connection Point 10 */}
                <TimelineConnection
                  sectionId="section-10"
                  isViewed={viewedSections.has('section-10')}
                />

                {/* Conclusion Section: Goal Achieved */}
                <ConclusionSection
                  translations={
                    translations.conclusion as unknown as Parameters<
                      typeof ConclusionSection
                    >[0]['translations']
                  }
                />
              </div>
            </div>

            {/* Right Column - Summary Sidebar */}
            <div className="order-1 lg:order-2">
              <CaseStudySummary
                title={translations.summary.title}
                items={summaryItems}
                activeSection={activeSection}
                onItemClick={scrollToSection}
              />
            </div>
          </div>
        </div>
      </section>

      <NeedASeniorClient />
    </main>
  );
}
