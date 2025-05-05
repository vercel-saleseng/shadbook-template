import { SectionContainer } from "./section-container";

export interface SectionData {
  id: string;
  progress: number;
  active: boolean;
}

interface FooterProps {
  sections: SectionData[];
}

export function Footer({ sections }: FooterProps) {
  return (
    <div className="border-t border-border p-4 bg-card">
      <div className="w-full grid grid-cols-5 gap-2">
        {sections.map((section) => (
          <SectionContainer
            key={section.id}
            id={section.id}
            progress={section.progress}
            active={section.active}
          />
        ))}
      </div>
    </div>
  );
}
