'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLocale } from '@/lib/i18n';
import { type Locale } from '@/i18n.config';

export function useTranslations<T = Record<string, Locale>>(
  namespace: string
): T | null {
  const pathname = usePathname();
  const [translations, setTranslations] = useState<T | null>(null);

  useEffect(() => {
    const locale = getLocale(pathname);
    import(`@/translations/${namespace}/${locale}.json`)
      .then((module) => {
        setTranslations(module.default as T);
      })
      .catch(() => {
        // Fallback to English
        if (locale !== 'en') {
          import(`@/translations/${namespace}/en.json`)
            .then((module) => {
              setTranslations(module.default as T);
            })
            .catch(() => {
              console.error(
                `Failed to load translations for namespace "${namespace}"`
              );
            });
        }
      });
  }, [pathname, namespace]);

  return translations;
}
