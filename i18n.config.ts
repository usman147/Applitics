/**
 * i18n Configuration
 * Defines supported locales and related configuration
 */

export type Locale = 'en' | 'fr';

export interface LocaleConfig {
  code: Locale;
  name: string;
  label: string;
}

export const DEFAULT_LOCALE: Locale = 'en';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'fr'];

export const localeCodes: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

/**
 * Validates if a string is a supported locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}
