import React from "react";
import { ExternalLink, Star } from "lucide-react";
import type { EvaluationResponse } from "../types";
import { formatConfidence } from "../utils/formatters";
import ReactMarkdown from "react-markdown";

interface EvaluationResultsProps {
  evaluation: EvaluationResponse;
}

const EvaluationResults: React.FC<EvaluationResultsProps> = ({
  evaluation,
}) => {
  // Convert citations to a map for easy lookup
  const citationsMap = evaluation.citations.reduce((acc, citation, index) => {
    acc[index + 1] = citation;
    return acc;
  }, {} as Record<number, Citation>);

  // Process content to replace citation numbers with markdown links
  const processContent = (content: string) => {
    return content.replace(/\[\[(\d+)\]\]/g, (_, num) => {
      const citation = citationsMap[parseInt(num)];
      if (!citation) return `[[${num}]]`;
      return `[${num}](${citation.url})`;
    });
  };

  return (
    <div className="space-y-6">
      {/* Sections */}
      <div className="space-y-4">
        {evaluation.sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-blue-100 transition-colors"
          >
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              {section.score > 0 && (
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              )}
              {section.section.charAt(0).toUpperCase() +
                section.section.slice(1)}
              <span className="ml-auto text-sm font-normal text-gray-500">
                {section.score}/10
              </span>
            </h3>
            <div className="mt-2 text-gray-600 prose prose-sm max-w-none">
              <ReactMarkdown>{processContent(section.content)}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {/* Citations */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Sources</h3>
        <div className="grid grid-cols-2 gap-2">
          {evaluation.citations.map((citation) => (
            <a
              key={citation.index}
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md group"
            >
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              <span className="truncate">
                [[{citation.index}]] {new URL(citation.url).hostname}
              </span>
              <span className="ml-auto text-xs text-gray-400">
                {formatConfidence(citation.confidence)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationResults;
