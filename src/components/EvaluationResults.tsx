import React, { useState } from "react";
import type { EvaluationResponse } from "../types";
import ResultSection from "./ResultSection";
import SourceItem from "./SourceItem";

interface EvaluationResultsProps {
  evaluation: EvaluationResponse;
}

const EvaluationResults: React.FC<EvaluationResultsProps> = ({
  evaluation,
}) => {
  const [openSections, setOpenSections] = useState<number[]>([0]); // First section always open

  const citationsMap = evaluation.citations.reduce((acc, citation, index) => {
    acc[index + 1] = citation;
    return acc;
  }, {} as Record<number, Citation>);

  const processContent = (content: string) => {
    return content.replace(/\[\[(\d+)\]\]/g, (_, num) => {
      const citation = citationsMap[parseInt(num)];
      if (!citation) return `[[${num}]]`;
      return `[${num}](${citation.url})`;
    });
  };

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {evaluation.sections.map((section, index) => (
          <ResultSection
            key={index}
            section={section}
            isOpen={openSections.includes(index)}
            onToggle={() => toggleSection(index)}
            processContent={processContent}
          />
        ))}
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-xl font-semibold mb-4">Sources</h2>
        <div className="grid gap-2 w-full">
          {evaluation.citations.map((citation) => (
            <SourceItem key={citation.index} citation={citation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationResults;