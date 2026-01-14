type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  await params; // Ensure params are awaited (required in Next.js App Router)

  // This layout just passes through children
  // The root layout handles the HTML structure and locale
  return <>{children}</>;
}
