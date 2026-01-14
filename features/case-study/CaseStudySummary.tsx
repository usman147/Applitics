'use client';

interface SummaryItem {
  id: string;
  label: string;
  romanNumeral: string;
}

interface CaseStudySummaryProps {
  title: string;
  items: SummaryItem[];
  activeSection: string | null;
  onItemClick: (sectionId: string) => void;
}

export default function CaseStudySummary({
  title,
  items,
  activeSection,
  onItemClick,
}: CaseStudySummaryProps) {
  return (
    <aside className="lg:sticky lg:top-24 self-start w-full lg:max-w-[428px]">
      <div className="bg-white rounded-[20px] p-[30px]">
        <h3 className="font-serif text-[34px] leading-[36px] tracking-[-0.01em] text-primary mb-6 font-normal">
          {title}
        </h3>
        <nav className="space-y-0">
          {items.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`w-full text-left transition-colors py-3 ${
                    isActive
                      ? 'text-primary-lighter font-normal'
                      : 'text-grey-text hover:text-primary font-normal'
                  }`}
                >
                  <span className="font-sans text-lg leading-[28px] tracking-[-0.004em]">
                    {item.romanNumeral} - {item.label}
                  </span>
                </button>
                {index < items.length - 1 && (
                  <div
                    className="h-px w-full"
                    style={{ backgroundColor: '#D9DFEB' }}
                  ></div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
