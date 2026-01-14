interface LegalContentProps {
  translations: {
    sections: {
      websitePublisher: {
        title: string;
        companyName: string;
        companyType: string;
        siret: string;
        address: string;
        email: string;
        emailLink: string;
      };
      hosting: {
        title: string;
        intro: string;
        provider: string;
        address: string;
        contact: string;
      };
      intellectualProperty: {
        title: string;
        content: string;
      };
      personalDataProtection: {
        title: string;
        intro: string;
        emailLink: string;
        usageIntro: string;
        usageItems: string[];
      };
      cookies: {
        title: string;
        intro: string;
        optOutIntro: string;
        optOutText: string;
      };
      credits: {
        title: string;
        design: string;
        designLink: string;
        development: string;
        developmentLink: string;
        illustrations: string;
      };
      modification: {
        title: string;
        content: string;
        lastUpdated: string;
      };
    };
  };
}

export default function LegalContent({ translations }: LegalContentProps) {
  return (
    <div className="grow px-4 md:px-6">
        <div className="max-w-[800px] mx-auto relative z-10 bg-white p-8 md:p-[30px] rounded-[20px] text-grey-text">
            {/* Website Publisher */}
            <section className="mb-12">
                <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                  {translations.sections.websitePublisher.title}
                </h2>
                <div className="leading-[28px] text-[18px] tracking-[-0.004em]">
                    <p>{translations.sections.websitePublisher.companyName}</p>
                    <p>{translations.sections.websitePublisher.companyType}</p>
                    <p>{translations.sections.websitePublisher.siret}</p>
                    <p>{translations.sections.websitePublisher.address}</p>
                    <p>
                      {translations.sections.websitePublisher.email}{' '}
                      <a href={`mailto:${translations.sections.websitePublisher.emailLink}`}>
                        {translations.sections.websitePublisher.emailLink}
                      </a>
                    </p>
                </div>
            </section>

            {/* Hosting */}
            <section className="mb-12">
                <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                  {translations.sections.hosting.title}
                </h2>
                <div className="leading-[28px] text-[18px] tracking-[-0.004em]">
                    <p>{translations.sections.hosting.intro}</p>
                    <p>{translations.sections.hosting.provider}</p>
                    <p>{translations.sections.hosting.address}</p>
                    <p>{translations.sections.hosting.contact}</p>
                </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
                <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                  {translations.sections.intellectualProperty.title}
                </h2>
                <p className="leading-[28px] text-[18px] tracking-[-0.004em]">
                    {translations.sections.intellectualProperty.content}
                </p>
            </section>

            {/* Personal Data Protection */}
            <section className="mb-12">
                <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                  {translations.sections.personalDataProtection.title}
                </h2>
                <p className="leading-[28px] text-[18px] tracking-[-0.004em] mb-4">
                    {translations.sections.personalDataProtection.intro}{' '}
                    <a href={`mailto:${translations.sections.personalDataProtection.emailLink}`}>
                      {translations.sections.personalDataProtection.emailLink}
                    </a>
                </p>
                <p className="leading-[28px] text-[18px] mb-4">
                  {translations.sections.personalDataProtection.usageIntro}
                </p>
                <ol className="list-decimal pl-5 space-y-1 leading-[28px] text-[18px] tracking-[-0.004em]">
                    {translations.sections.personalDataProtection.usageItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                </ol>
            </section>

            {/* Cookies */}
            <section className="mb-12">
                <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                  {translations.sections.cookies.title}
                </h2>
                <p className="leading-[28px] text-[18px] tracking-[-0.004em] mb-6">
                    {translations.sections.cookies.intro}
                </p>
                
                 {/* Opt-out Checkbox UI mimic */}
                 <div className="space-y-4">
                     <p className="leading-[28px] text-[18px] tracking-[-0.004em]">
                       {translations.sections.cookies.optOutIntro}
                     </p>
                     <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-px h-5 w-5 shrink-0">
                            <input type="checkbox" className="peer sr-only" defaultChecked />
                            <div className="absolute inset-0 bg-grey-light border border-grey-light rounded peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                                <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-primary text-[18px] leading-[20px] tracking-[-0.006em]">
                              {translations.sections.cookies.optOutText}
                            </p>
                        </div>
                     </label>
                 </div>
            </section>

             {/* Credits */}
             <section className="mb-12">
                <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                  {translations.sections.credits.title}
                </h2>
                <div className="leading-[28px] text-[18px] tracking-[-0.004em] space-y-1">
                    <p>
                      {translations.sections.credits.design}{' '}
                      (<a href={translations.sections.credits.designLink} className="text-primary-lighter">
                        {translations.sections.credits.designLink}
                      </a>)
                    </p>
                    <p>
                      {translations.sections.credits.development}{' '}
                      (<a href={translations.sections.credits.developmentLink} className="text-primary-lighter">
                        {translations.sections.credits.developmentLink}
                      </a>)
                    </p>
                    <p>{translations.sections.credits.illustrations}</p>
                </div>
            </section>

             {/* Modification */}
             <section>
                <h2 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
                  {translations.sections.modification.title}
                </h2>
                <p className="leading-[28px] text-[18px] tracking-[-0.004em] mb-6">
                    {translations.sections.modification.content}
                </p>
                <p className="text-sm opacity-70">{translations.sections.modification.lastUpdated}</p>
            </section>

        </div>
      </div>
  );
}
