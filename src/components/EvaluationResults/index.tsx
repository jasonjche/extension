import React from "react";
import type { EvaluationResponse } from "../../types";
import { ResultSection } from "./ResultSection";
import { SourcesList } from "./SourcesList";
import { useCitationsMap } from "./hooks/useCitationsMap";

interface EvaluationResultsProps {
  evaluation: EvaluationResponse;
}

export const EvaluationResults: React.FC<EvaluationResultsProps> = ({ evaluation }) => {
  const citationsMap = useCitationsMap(evaluation.citations);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {evaluation.sections.map((section, index) => (
          <ResultSection
            key={index}
            section={section}
            citationsMap={citationsMap}
          />
        ))}
      </div>
      <SourcesList citations={evaluation.citations} />
    </div>
  );
};