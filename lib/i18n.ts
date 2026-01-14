import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type Locale,
  isValidLocale,
} from '../i18n.config';

/**
 * Extracts locale from pathname
 * Returns 'en' or 'fr' based on the path
 */
export function getLocale(pathname: string): Locale {
  // Remove leading and trailing slashes, then split
  const segments = pathname.split('/').filter(Boolean);

  // Check if first segment is a valid locale
  if (segments.length > 0 && isValidLocale(segments[0])) {
    return segments[0];
  }

  // Default to 'en' if no locale prefix found
  return DEFAULT_LOCALE;
}

/**
 * Converts a path to its localized version
 * - For default locale (en): returns path without prefix (e.g., '/contact')
 * - For other locales (fr): returns path with prefix (e.g., '/fr/contact')
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Normalize path: ensure it starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Remove any existing locale prefix
  const pathWithoutLocale = removeLocalePrefix(normalizedPath);

  // If it's the default locale, return path without prefix
  if (locale === DEFAULT_LOCALE) {
    return pathWithoutLocale === '/' ? '/' : pathWithoutLocale;
  }

  // For other locales, add the locale prefix
  return pathWithoutLocale === '/'
    ? `/${locale}`
    : `/${locale}${pathWithoutLocale}`;
}

/**
 * Switches the current path to a target locale
 * Preserves the base path structure
 */
export function switchLocale(pathname: string, targetLocale: Locale): string {
  // Get the base path without locale
  const basePath = removeLocalePrefix(pathname);

  // Return localized path for target locale
  return getLocalizedPath(basePath, targetLocale);
}

/**
 * Removes locale prefix from pathname to get the base path
 * Example: '/fr/contact' -> '/contact', '/en/contact' -> '/contact', '/' -> '/'
 */
export function removeLocalePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  // Check if first segment is a valid locale
  if (segments.length > 0 && isValidLocale(segments[0])) {
    // Remove the locale segment and reconstruct path
    const remainingSegments = segments.slice(1);
    return remainingSegments.length > 0
      ? `/${remainingSegments.join('/')}`
      : '/';
  }

  // No locale prefix found, return as is
  return pathname || '/';
}

/**
 * Gets all localized paths for a given base path
 * Useful for generating alternate links in metadata
 */
export function getAllLocalizedPaths(basePath: string): Record<Locale, string> {
  const paths: Record<Locale, string> = {} as Record<Locale, string>;

  for (const locale of SUPPORTED_LOCALES) {
    paths[locale] = getLocalizedPath(basePath, locale);
  }

  return paths;
}
