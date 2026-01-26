'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { TEAM_MEMBERS, TeamMember } from './teamMembers';

// Checkmark icon component
const CheckmarkIcon = () => (
  <div className="shrink-0 mt-0.5">
    <Image
      src="/team/dark-check-icon.svg"
      alt="Check"
      width={24}
      height={24}
      className="w-6 h-6"
    />
  </div>
);

interface OurTeamProps {
  translations: {
    quote: string;
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
    expertise: {
      title: {
        parts: Array<
          | string
          | {
              text: string;
              highlight: boolean;
            }
        >;
      };
      description: string[];
      items: Array<{
        parts: Array<
          | string
          | {
              text: string;
              bold: boolean;
            }
        >;
      }>;
    };
  };
}

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

export default function OurTeam({ translations }: OurTeamProps) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.our-team-section .reveal-on-scroll'
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

  // Handle scroll to section when hash is present
  useEffect(() => {
    if (window.location.hash === '#our-team') {
      const element = document.getElementById('our-team');
      if (element) {
        // Small delay to ensure page is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <section id="our-team" className="our-team-section w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Quote */}
        <div className="text-center mb-6 reveal-on-scroll">
          <p className="font-ibm-plex-sans-condensed text-[18px] font-medium italic uppercase leading-[118%] tracking-[-0.01em] text-primary">
            {translations.quote}
          </p>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12 reveal-on-scroll">
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

        {/* Team Members Grid */}
        <div className="reveal-on-scroll">
          <div className="flex flex-wrap justify-center items-start gap-4">
            {/* Small/Medium: 2-2-1, Large: 3-2 */}
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="w-full sm:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.67rem)] max-w-[373px]"
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mt-16 reveal-on-scroll">
          {/* Left Section */}
          <div className="flex-1">
            <h2 className="font-serif text-[34px] md:text-[34px] leading-[36px] md:leading-[34px] font-normal text-primary max-w-[400px]">
              {translations.expertise.title.parts.map((part, index) => (
                <span key={index}>
                  {typeof part === 'string' ? (
                    part
                  ) : (
                    <span className="text-primary-light">{part.text}</span>
                  )}
                </span>
              ))}
            </h2>
            <p className="font-sans text-lg leading-[28px] tracking-[-0.004em] text-grey-text my-4 max-w-[455px]">
              {translations.expertise.description[0]}
            </p>
            <p className="font-sans text-lg leading-[28px] tracking-[-0.004em] text-grey-text max-w-[400px]">
              {translations.expertise.description[1]}
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex flex-col gap-5">
            {translations.expertise.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckmarkIcon />
                <div>
                  <p className="font-sans text-lg leading-[28px] tracking-[-0.004em] text-primary">
                    {renderText(item)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TeamMemberCardProps {
  member: TeamMember;
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="group relative sm:max-w-[373px] cursor-pointer">
      <div className="relative w-full h-[250px]">
        <div className="absolute bottom-0 left-0 w-full rounded-md overflow-hidden h-[187px] ">
          <Image
            src="/team/team-member-background.svg"
            alt=""
            width={187}
            height={187}
            className="object-cover w-full h-[187px] absolute z-1 bottom-0 left-0"
          />

          <div className="absolute inset-0 w-full h-full z-2 opacity-40 -translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            <TeamMemberGlow />
          </div>
        </div>
        <Image
          src={member.image}
          alt={member.name}
          width={250}
          height={400}
          className="w-auto h-[250px] object-cover relative z-3"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 746px"
        />
      </div>

      {/* Name and Role - Centered below */}
      <div className="text-center bg-white p-4 rounded-b-md">
        <h3 className="font-serif text-[28px] font-normal leading-[34px] text-primary mb-1">
          {member.name}
        </h3>
        <p className="font-sans text-[14px] font-normal leading-[20px] tracking-[-0.004em] text-primary-lighter">
          {member.role}
        </p>
      </div>
    </div>
  );
}

const TeamMemberGlow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={373}
      height={187}
      fill="none"
      className="blur-[15px]"
    >
      <g
        filter="url(#a)"
        style={{
          mixBlendMode: 'plus-lighter',
        }}
      >
        <path
          fill="#fff"
          d="m61.254 187.575 95.05-299.287 81.933-5.64L61.254 187.575Z"
        />
      </g>
      <g
        filter="url(#b)"
        style={{
          mixBlendMode: 'plus-lighter',
        }}
      >
        <path
          fill="#fff"
          d="m316.406 177.168-95.05-299.287-81.933-5.64 176.983 304.927Z"
        />
      </g>
      <g
        filter="url(#c)"
        style={{
          mixBlendMode: 'plus-lighter',
        }}
      >
        <path
          fill="#fff"
          d="m200.37 252.29-59.413-402.668 92.237-53.146L200.37 252.29Z"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={267.178}
          height={395.121}
          x={16.157}
          y={-162.449}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_2121_1436"
            stdDeviation={22.548}
          />
        </filter>
        <filter
          id="b"
          width={267.178}
          height={395.121}
          x={94.325}
          y={-172.856}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_2121_1436"
            stdDeviation={22.548}
          />
        </filter>
        <filter
          id="c"
          width={182.43}
          height={546.008}
          x={95.86}
          y={-248.621}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_2121_1436"
            stdDeviation={22.548}
          />
        </filter>
      </defs>
    </svg>
  );
};
