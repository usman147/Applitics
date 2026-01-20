'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { getLocale, getLocalizedPath, switchLocale } from '../lib/i18n';
import { localeCodes, type Locale } from '../i18n.config';
import { useTranslations } from '../lib/useTranslations';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(false);
  const [isHuggingSides, setIsHuggingSides] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileLanguageDropdownOpen, setIsMobileLanguageDropdownOpen] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = getLocale(pathname);
  const translations = useTranslations<{
    header: {
      nav: {
        home: string;
        ourTeam: string;
        testimonials: string;
        caseStudy: string;
        articles: string;
      };
      getInTouch: string;
    };
  }>('common');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          // First stage: move to top (at 50px scroll)
          setIsAtTop(scrollPosition > 50);
          // Second stage: hug the sides (at 150px scroll)
          setIsHuggingSides(scrollPosition > 150);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSwitch = (targetLocale: Locale) => {
    if (targetLocale === currentLocale) {
      setIsLanguageDropdownOpen(false);
      setIsMobileLanguageDropdownOpen(false);
      return;
    }

    const newPath = switchLocale(pathname, targetLocale);
    router.push(newPath);
    setIsLanguageDropdownOpen(false);
    setIsMobileLanguageDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { href: '/', label: translations?.header?.nav?.home || 'Home' },
    {
      href: '/our-team',
      label: translations?.header?.nav?.ourTeam || 'Our Team',
      isScroll: true,
    },
    {
      href: '/testimonials',
      label: translations?.header?.nav?.testimonials || 'Testimonials',
    },
    {
      href: '/case-study',
      label: translations?.header?.nav?.caseStudy || 'Case Study',
    },
    {
      href: '/articles',
      label: translations?.header?.nav?.articles || 'Articles',
    },
  ];

  return (
    <div
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isAtTop
          ? isHuggingSides
            ? 'top-0 px-0'
            : 'top-0 max-w-8xl mx-auto'
          : 'top-[40px] max-w-8xl mx-auto px-4 lg:px-0'
      }`}
    >
    <header
        className={`h-[62px] flex items-center px-6 bg-white transition-all duration-500 ease-in-out
          ${
            isHuggingSides
              ? 'rounded-none px-6 shadow-md'
              : isMobileMenuOpen
              ? 'rounded-t-4xl rounded-b-none px-4 shadow-none lg:rounded-full'
              : 'rounded-full px-4 shadow-none'
          }
        `}
      >
        {/* Logo */}
        <Link
          href={getLocalizedPath('/', currentLocale)}
          className="flex items-center"
        >
          <Image
            src="/applitics-logo.png"
            alt="Applitics"
            width={120}
            height={33.19}
            className="w-[120px] h-[33px] pointer-events-none"
            priority
          />
        </Link>

        {/* Menu Container (Navigation Links) */}
        <div className="hidden lg:flex items-center justify-center flex-1 h-[46px] p-2 xl:gap-[30px] gap-[10px]">
          {navigationItems.map((item) => {
            const localizedHref = getLocalizedPath(item.href, currentLocale);
            const isActive =
              pathname === localizedHref ||
              (item.href === '/' &&
                pathname === getLocalizedPath('/', currentLocale));
            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (item.isScroll) {
                e.preventDefault();
                const homePath = getLocalizedPath('/', currentLocale);
                if (pathname === homePath || pathname === '/') {
                  // Already on home page, scroll to section
                  const element = document.getElementById('our-team');
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                } else {
                  // Navigate to home, then scroll
                  router.push(`${homePath}#our-team`);
                }
              }
            };
            if (item.href === '/articles') {
              return (
                <span
                  key={item.href}
                  className="flex items-center justify-center rounded-full px-4 py-2 font-sans text-sm font-semibold leading-[1.44] tracking-normal cursor-not-allowed"
                >
                  {item.label}
                </span>
              );
            }
            return (
              <Link
                key={item.href}
                href={localizedHref}
                onClick={handleClick}
                className={`flex items-center justify-center rounded-full px-4 py-2 font-sans text-sm font-semibold leading-[1.44] tracking-normal transition-colors ${
                  isActive
                    ? 'bg-light-blue-extra text-primary-light'
                    : 'text-primary hover:text-primary-light'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side Container (Language Selector + CTA) */}
        <div className="hidden lg:flex items-center w-auto h-[38px] gap-[10px] ml-auto">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-primary transition-colors cursor-pointer"
              aria-label="Select language"
            >
              <span>{localeCodes[currentLocale]}</span>
              <Image
                src="/arrow-down.svg"
                alt=""
                width={9}
                height={6}
                className={`w-[9px] h-[6px] transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[120px] z-50">
                {(['en', 'fr'] as Locale[]).map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleLanguageSwitch(locale)}
                    className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      currentLocale === locale
                        ? 'bg-light-blue-extra text-primary-light'
                        : 'text-slate-700 hover:bg-gray-50'
                    }`}
                  >
                    {localeCodes[locale]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href={getLocalizedPath('/contact', currentLocale)}
            className="flex items-center h-[38px] rounded-[40.06px] bg-primary-light py-[9px] px-[18px] gap-[6px] font-sans text-sm font-semibold leading-[1.44] tracking-normal text-white shadow-md transition-colors hover:bg-primary whitespace-nowrap"
          >
            {translations?.header?.getInTouch || 'Get in touch'}
            <Image
              src="/icon-arrow.svg"
              alt=""
              width={14}
              height={14}
              className="w-[14px] h-[14px]"
            />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex lg:hidden items-center justify-center p-2 ml-auto"
          aria-label="Toggle menu"
        >
          <Image
            src={isMobileMenuOpen ? '/navigation-close-icon.svg' : '/hamburger-icon.svg'}
            alt={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            width={28}
            height={28}
            className={isMobileMenuOpen ? 'w-5 h-5' : 'w-7 h-7'}
          />
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden fixed inset-0 z-40 overflow-y-auto transition-all duration-500 ease-in-out
              ${isAtTop ? 'top-[62px]' : 'top-[102px]'}
              ${
                isHuggingSides
                  ? 'top-0 px-0'
                  : 'top-0 max-w-7xl mx-auto px-4'
              }
            `}
          >
          <div className={`
             mx-auto px-6 py-8 bg-white
            ${ isHuggingSides ? '' : 'rounded-b-2xl'}
            `}>
            <nav className="flex flex-col gap-4">
              {navigationItems.map((item) => {
                const localizedHref = getLocalizedPath(
                  item.href,
                  currentLocale
                );
                const isActive =
                  pathname === localizedHref ||
                  (item.href === '/' &&
                    pathname === getLocalizedPath('/', currentLocale));
                const handleClick = (
                  e: React.MouseEvent<HTMLAnchorElement>
                ) => {
                  setIsMobileMenuOpen(false);
                  if (item.isScroll) {
                    e.preventDefault();
                    const homePath = getLocalizedPath('/', currentLocale);
                    if (pathname === homePath || pathname === '/') {
                      // Already on home page, scroll to section
                      const element = document.getElementById('our-team');
                      if (element) {
                        element.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }
                    } else {
                      // Navigate to home, then scroll
                      router.push(`${homePath}#our-team`);
                    }
                  }
                };
                if (item.href === '/articles') {
                  return (
                    <span
                      key={item.href}
                      className="font-sans text-base font-semibold leading-[1.44] tracking-normal py-3 px-4 rounded-lg cursor-not-allowed"
                    >
                      {item.label}
                    </span>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={localizedHref}
                    onClick={handleClick}
                    className={`mobile-nav-link flex items-center justify-between font-sans text-base font-semibold leading-[1.44] tracking-normal transition-colors py-3 px-4 rounded-lg ${
                      isActive
                        ? 'bg-light-blue-extra text-primary-light'
                        : 'text-primary hover:text-primary-light hover:bg-light-blue-extra'
                    }`}
                  >
                    {item.label}
                    <Image
                      src="/icon-arrow-blue.svg"
                      alt="arrow icon"
                      width={16}
                      height={16}
                      className="w-4 h-4 shrink-0"
                    />
                  </Link>
                );
              })}
              <div className="border-grey-light border-t flex flex-col-reverse mt-4 pt-4">
                <div className="relative" ref={mobileDropdownRef}>
                  <button
                    onClick={() =>
                      setIsMobileLanguageDropdownOpen(
                        !isMobileLanguageDropdownOpen
                      )
                    }
                    className="flex items-center justify-center gap-1 text-sm font-semibold text-slate-700 py-3 px-4 w-full text-left hover:bg-gray-50 rounded-lg transition-colors"
                    aria-label="Select language"
                  >
                    <span>{localeCodes[currentLocale]}</span>
                    <Image
                      src="/arrow-down.svg"
                      alt="arrow down icon"
                      width={9}
                      height={6}
                      className={`w-[9px] h-[6px] transition-transform ${isMobileLanguageDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isMobileLanguageDropdownOpen && (
                    <div className="ml-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[120px]">
                      {(['en', 'fr'] as Locale[]).map((locale) => (
                        <button
                          key={locale}
                          onClick={() => handleLanguageSwitch(locale)}
                          className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors first:rounded-t-lg last:rounded-b-lg ${
                            currentLocale === locale
                              ? 'bg-light-blue-extra text-primary-light'
                              : 'text-slate-700 hover:bg-gray-50'
                          }`}
                        >
                          {localeCodes[locale]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Link
                  href={getLocalizedPath('/contact', currentLocale)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 h-[38px] rounded-[40.06px] bg-primary-light py-[9px] px-[18px] font-sans text-sm font-semibold leading-[1.44] tracking-normal text-white shadow-md transition-colors hover:bg-primary mt-4"
                >
                  {translations?.header?.getInTouch || 'Get in touch'}
                  <Image
                    src="/icon-arrow.svg"
                    alt="arrow icon"
                    width={14}
                    height={14}
                    className="w-[14px] h-[14px]"
                  />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
