This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Translation & Content Management

This project uses a JSON-based translation system for internationalization (i18n). All user-facing content is stored in translation files organized by namespace and locale.

### Translation File Structure

Translations are organized in the `translations/` directory:

```
translations/
├── case-study/
│   ├── en.json
│   └── fr.json
├── common/
│   ├── en.json
│   └── fr.json
├── contact/
│   ├── en.json
│   └── fr.json
├── home/
│   ├── en.json
│   └── fr.json
├── legal-policy/
│   ├── en.json
│   └── fr.json
└── testimonials/
    ├── en.json
    └── fr.json
```

### How to Translate Content

1. **Edit Existing Translations**
   - Navigate to `translations/{namespace}/{locale}.json`
   - Find the key you want to translate
   - Update the value with your translated text
   - Maintain the same JSON structure across all locales

2. **Add a New Language**
   - Create a new locale folder (e.g., `translations/case-study/es.json` for Spanish)
   - Copy the structure from `en.json`
   - Translate all values to the new language
   - Update `i18n.config.ts` to include the new locale

3. **Translate Testimonials**
   - Testimonials are translated by ID in `translations/testimonials/{locale}.json`
   - Each testimonial has its own entry under `testimonials.{id}`:
     ```json
     {
       "testimonials": {
         "1": {
           "title": "Capacity Planning – Confidential Big Pharma Client",
           "name": "Gabriele Bano",
           "role": "Head of Process Modeling at a Big Pharma",
           "description": "...",
           "content": {
             "introTitle": "Introduction",
             "introText": ["...", "..."],
             "impactText": ["...", "..."],
             "conclusionText": ["...", "..."]
           }
         }
       }
     }
     ```
   - To add a new testimonial:
     1. Add the testimonial data to `features/testimonials/data.ts` (without content)
     2. Add translations for all locales in `translations/testimonials/{locale}.json`

4. **Change Content on a Page**
   - Locate the translation file for the page (e.g., `translations/home/en.json` for homepage)
   - Find the key that corresponds to the content you want to change
   - Update the value in both `en.json` and `fr.json` (or your target locales)
   - The changes will automatically appear on the page

### Translation System Architecture

- **Client Components**: Use `useTranslations` hook or dynamic imports with `getLocale(pathname)`
- **Server Components**: Use `getTranslations(namespace, locale)` from `lib/translations.ts`
- **Fallback**: If a translation is missing, the system falls back to English (`en.json`)

### Best Practices

1. **Keep Structure Consistent**: Always maintain the same JSON structure across all locales
2. **Use Meaningful Keys**: Use descriptive keys that indicate where the content appears
3. **Test Both Locales**: After making changes, test both English and French versions
4. **No Hardcoded Text**: All user-facing text should come from translation files
5. **Content vs. Alt Text**: Only translate visible content; alt attributes can remain in English for SEO

### Example: Adding a New Section

1. Add the translation keys to all locale files:

   ```json
   {
     "newSection": {
       "title": "New Section Title",
       "description": "Section description"
     }
   }
   ```

2. In your component, load the translations:

   ```tsx
   const translations = useTranslations('namespace');
   // or for server components:
   const translations = await getTranslations('namespace', locale);
   ```

3. Use the translations:
   ```tsx
   <h2>{translations.newSection.title}</h2>
   <p>{translations.newSection.description}</p>
   ```

## Google Analytics Setup

This project includes Google Analytics 4 (GA4) integration for tracking page views and user interactions.

### Setting Up Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or use an existing one
3. Navigate to **Admin** → **Data Streams** → **Web**
4. Click on your web stream or create a new one
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
6. Add it to your `.env.local` file:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### How It Works

- The Google Analytics script is automatically loaded on all pages
- Page views are tracked automatically (GA4 handles this)
- The script only loads if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- Uses Next.js `Script` component with `afterInteractive` strategy for optimal performance

### Custom Event Tracking

To track custom events, use the `gtag` function in your client components:

```tsx
'use client';

function MyComponent() {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'button_click', {
        event_category: 'engagement',
        event_label: 'Contact Form CTA',
      });
    }
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

## SEO Configuration

This project includes comprehensive SEO best practices:

### Environment Variables

Create a `.env.local` file with the following:

```bash
# Site URL - Used for SEO metadata, sitemap, and structured data
NEXT_PUBLIC_SITE_URL=https://applitics.com

# Resend API Configuration - Required for contact form


# Google Analytics 4 (GA4) - Optional but recommended
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Your GA4 Measurement ID

# Optional: Add verification codes for search engines
# GOOGLE_SITE_VERIFICATION=your-google-verification-code
```

### SEO Features Implemented

- ✅ Metadata API with Open Graph and Twitter Cards
- ✅ Dynamic metadata for testimonial pages
- ✅ Structured data (JSON-LD) for Organization
- ✅ Robots.txt configuration
- ✅ Dynamic sitemap generation
- ✅ Canonical URLs for all pages
- ✅ Proper meta descriptions and titles
- ✅ SEO utility functions in `app/lib/seo.ts`

### Adding New Pages

When adding new pages, make sure to:

1. Export `metadata` object with title, description, and Open Graph tags
2. Add the page to `app/sitemap.ts` when ready for indexing
3. Use the SEO utility functions from `app/lib/seo.ts` for structured data

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
