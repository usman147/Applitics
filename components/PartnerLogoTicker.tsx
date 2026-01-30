import Image from "next/image";

interface PartnerTickerProps {
  partnerLogos: string[];
  small?: boolean;
}

export function PartnerTicker({ partnerLogos, small = false }: PartnerTickerProps) {
  // Logic for the "small" variant vs "default" variant
  const logoWidth = small ? "175px" : "12rem";
  const logoHeight = small ? "50px" : "80px";
  const logoGap = small ? "2rem" : "4rem";

  return (
    <div className="overflow-hidden w-full">
      <div
        className="img-ticker"
        style={{
          "--logo-count": partnerLogos.length,
          "--tickerduration": "30s",
          "--logo-w": logoWidth,
          "--logo-h": logoHeight,
          "--logo-gap": logoGap,
        } as React.CSSProperties}
      >
        {/* Tripled logos for seamless infinite loop */}
        {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, index) => (
          <div key={index} className="tickerlogo">
            <Image
              src={logo}
              alt="Partner Logo"
              width={200} // Increased base width for better resolution
              height={80}
              className="object-contain"
              style={{ width: "var(--logo-w)", height: "var(--logo-h)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}