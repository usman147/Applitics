import TestimonialsContent from '@/features/testimonials/TestimonialsContent';
import { getTestimonialById } from '@/features/testimonials/data';
import type { Metadata } from 'next';
import { getAllLocalizedPaths } from '@/lib/i18n';
import ScrollToTop from '../ScrollToTop';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const testimonial = getTestimonialById(id);

  if (!testimonial) {
    return {
      title: 'Testimonial Not Found',
      description: 'The requested testimonial could not be found.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://applitics.com';
  const imageUrl = `${siteUrl}${testimonial.image}`;
  const basePath = `/testimonials/${id}`;
  const localizedPaths = getAllLocalizedPaths(basePath);

  return {
    title: testimonial.title,
    description: testimonial.description,
    openGraph: {
      title: `${testimonial.title} - Applitics Testimonial`,
      description: testimonial.description,
      url: localizedPaths[locale as keyof typeof localizedPaths],
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: testimonial.title,
        },
      ],
      authors: [testimonial.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${testimonial.title} - Applitics Testimonial`,
      description: testimonial.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: localizedPaths[locale as keyof typeof localizedPaths],
      languages: localizedPaths,
    },
  };
}

export default async function TestimonialDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <ScrollToTop />
      <TestimonialsContent id={id} />
    </>
  );
}
