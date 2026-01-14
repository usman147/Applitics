import { type Locale } from '@/i18n.config';

/**
 * Loads translations for a specific namespace and locale
 * @param namespace - The translation namespace (e.g., 'home')
 * @param locale - The locale to load translations for
 * @returns The translations object for the namespace
 */
export async function getTranslations(namespace: string, locale: Locale) {
  try {
    const translations = await import(
      `@/translations/${namespace}/${locale}.json`
    );
    return translations.default;
  } catch (error) {
    console.error(
      `Failed to load translations for namespace "${namespace}" and locale "${locale}":`,
      error
    );
    // Fallback to English if translation file doesn't exist
    if (locale !== 'en') {
      try {
        const fallback = await import(`@/translations/${namespace}/en.json`);
        return fallback.default;
      } catch (fallbackError) {
        console.error(
          `Failed to load fallback translations for namespace "${namespace}":`,
          fallbackError
        );
        return {};
      }
    }
    return {};
  }
}

/**
 * Replaces placeholders in a string with values
 * @param template - String with placeholders like {key}
 * @param values - Object with values to replace placeholders
 * @returns String with replaced values
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key]?.toString() ?? match;
  });
}
