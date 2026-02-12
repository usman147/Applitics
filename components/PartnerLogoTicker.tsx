import Image from "next/image";

interface PartnerTickerProps {
  partnerLogos: string[];
  small?: boolean;
}

export function PartnerTicker({ partnerLogos, small = false }: PartnerTickerProps) {
  // Determine dimensions based on the 'small' prop
  // You can adjust these numbers to whatever feels best for each version
  const logoHeight = small ? "45px" : "53px";
  const logoGap = small ? "130px" : "130px";
  const duration = small ? "30s" : "35s";

  return (
    <div className="overflow-hidden w-full">
      <div
        className="img-ticker"
        style={{
          "--tickerduration": duration,
          "--logo-h": logoHeight,
          "--logo-gap": logoGap,
        } as React.CSSProperties}
      >
        {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, index) => (
          <div key={index} className="ticker-item">
            <img
              src={logo}
              alt="Partner Logo"
              style={{
                height: "var(--logo-h)",
                width: "auto", 
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}