"use client";

import { useRef, useState } from "react";
import { Header, files } from "@/components/terminal/header";
import { NumberGrid } from "@/components/terminal/number-grid";
import { Footer, type SectionData } from "@/components/terminal/footer";

export default function Page() {
  const [progress, setProgress] = useState(19);
  const [selectedFile, setSelectedFile] = useState(files[0]);
  const [sectionProgress, setSectionProgress] = useState<SectionData[]>([
    { id: "01", progress: 30, active: false },
    { id: "02", progress: 11, active: false },
    { id: "03", progress: 9, active: false },
    { id: "04", progress: 27, active: false },
    { id: "05", progress: 18, active: false },
  ]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const numberGridRef = useRef<any>(null);

  // Find a container with less than 100% progress
  const findAvailableContainer = () => {
    // Filter containers that aren't at 100%
    const availableContainers = sectionProgress.filter(
      (section) => section.progress < 100
    );

    if (availableContainers.length === 0) return null;

    // Pick a random container from available ones
    const randomIndex = Math.floor(Math.random() * availableContainers.length);
    return availableContainers[randomIndex].id;
  };

  const handleNumberClick = (rowIndex: number, colIndex: number) => {
    // Find an available container
    const containerId = findAvailableContainer();
    if (!containerId) return; // All containers are at 100%

    // Update active section
    setActiveSection(containerId);

    // Update section progress
    setSectionProgress((prev) =>
      prev.map((section) => ({
        ...section,
        active: section.id === containerId,
        progress:
          section.id === containerId
            ? Math.min(section.progress + 3, 100)
            : section.progress,
      }))
    );

    // Update overall progress
    setProgress((prev) => Math.min(prev + 1, 100));

    resetActiveSection();
  };

  // Reset active section after animation completes
  const resetActiveSection = () => {
    setTimeout(() => {
      setSectionProgress((prev) =>
        prev.map((section) => ({
          ...section,
          active: false,
        }))
      );
      setActiveSection(null);
    }, 3200); // Increased to match the total animation duration (700 + 1500 + 1000)
  };

  // Handle file change
  const handleFileChange = (file: (typeof files)[0]) => {
    setSelectedFile(file);
    // Reset progress when changing files
    setProgress(Math.floor(Math.random() * 30));
    // Regenerate grid
    if (NumberGrid.regenerateGrid) {
      NumberGrid.regenerateGrid();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 flex items-center justify-center font-mono">
      <div className="w-full max-w-4xl border border-border rounded-md bg-card text-card-foreground shadow-lg overflow-hidden">
        <Header
          progress={progress}
          selectedFile={selectedFile}
          onFileChange={handleFileChange}
        />
        <NumberGrid onNumberClick={handleNumberClick} ref={numberGridRef} />
        <Footer sections={sectionProgress} />
      </div>
    </div>
  );
}
