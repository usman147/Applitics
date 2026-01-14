'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLocale } from '@/lib/i18n';
import NeedASenior from './NeedASenior';

export default function NeedASeniorClient() {
  const pathname = usePathname();
  const [translations, setTranslations] = useState<{
    caption: string;
    title: string;
    subtitle: string;
    buttonText: string;
  } | null>(null);

  useEffect(() => {
    const locale = getLocale(pathname);
    import(`@/translations/common/${locale}.json`)
      .then((module) => {
        if (module.default?.needASenior) {
          setTranslations(module.default.needASenior);
        }
      })
      .catch(() => {
        // Fallback to English
        import('@/translations/common/en.json')
          .then((module) => {
            if (module.default?.needASenior) {
              setTranslations(module.default.needASenior);
            }
          })
          .catch(() => {
            console.error('Failed to load NeedASenior translations');
          });
      });
  }, [pathname]);

  if (!translations) {
    return null;
  }

  return <NeedASenior translations={translations} />;
}
