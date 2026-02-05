'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from '../lib/useTranslations';
import { getLocale, getLocalizedPath } from '../lib/i18n';

export default function Footer() {
  const pathname = usePathname();
  const currentLocale = getLocale(pathname);
  const translations = useTranslations<{
    footer: {
      nav: {
        home: string;
        ourTeam: string;
        testimonials: string;
        caseStudy: string;
        articles: string;
      };
      privacyPolicy: string;
      legalPolicy: string;
      copyright: string;
    };
  }>('common');
  return (
    <footer className="bg-grey-light pb-[65px] w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full rounded-[20px] pt-[29px] pb-[36.81px] px-[21px] bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo Area */}
            <div className="flex justify-center md:justify-start">
              <Image
                src="/applitics-logo.png"
                alt="Applitics"
                width={120}
                height={25.45}
                className="h-[25.45px] w-auto"
              />
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-[52px] text-[14px] leading-[20px] font-semibold tracking-[-0.004em] text-primary lg:flex-row md:flex-row flex-col items-center">
              <Link href={getLocalizedPath('/', currentLocale)}>{translations?.footer?.nav?.home || 'Home'}</Link>
              <Link href={`${getLocalizedPath('/', currentLocale)}#our-team`}>{translations?.footer?.nav?.ourTeam || 'Our Team'}</Link>
              <Link href={getLocalizedPath('/testimonials', currentLocale)}>{translations?.footer?.nav?.testimonials || 'Testimonials'}</Link>
              <Link href={getLocalizedPath('/case-study', currentLocale)}>{translations?.footer?.nav?.caseStudy || 'Case Study'}</Link>
              <span className="cursor-not-allowed">{translations?.footer?.nav?.articles || 'Articles'}</span>
            </nav>

            {/* Social/Platform Icons */}
            <div className="flex gap-4">
              <Link
                href="https://linkedin.com/company/applitics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/Icon-linkedin.svg"
                  alt="LinkedIn"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
          </div>

          <div className="mt-[26px] pt-[26px] border-t border-grey-light flex flex-col md:flex-row justify-between items-center gap-4 text-[14px] leading-[20px] tracking-[-0.004em] font-normal text-grey-text">
            <div className="flex gap-[40px]">
              <Link href={getLocalizedPath('/privacy-policy', currentLocale)}>{translations?.footer?.privacyPolicy || 'Privacy Policy'}</Link>
              <Link href={getLocalizedPath('/legal-policy', currentLocale)}>{translations?.footer?.legalPolicy || 'Legal Policy'}</Link>
            </div>
            <div>{translations?.footer?.copyright || '© 2026 Applitics. All rights reserved.'}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
