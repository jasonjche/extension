import React from "react";
import { ExternalLink, Star, Sparkles } from "lucide-react";
import type { EvaluationResponse } from "../types";
import { formatConfidence } from "../utils/formatters";
import ReactMarkdown from "react-markdown";
import { Citation } from "../types";

interface EvaluationResultsProps {
  evaluation: EvaluationResponse;
}

const EvaluationResults: React.FC<EvaluationResultsProps> = ({
  evaluation,
}) => {
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

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {evaluation.sections.map((section, index) => (
          <div key={index} className="result-card rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              {section.score >= 8 ? (
                <Sparkles className="w-5 h-5 text-yellow-400" />
              ) : section.score > 5 ? (
                <Star className="w-5 h-5 text-blue-400" />
              ) : null}
              <h3 className="text-gray-900 font-medium">
                {section.section.charAt(0).toUpperCase() +
                  section.section.slice(1)}
              </h3>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${(section.score / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {section.score}/10
                </span>
              </div>
            </div>
            <div className="prose prose-sm max-w-none text-gray-600">
              <ReactMarkdown>{processContent(section.content)}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-lg font-medium mb-4">Sources</h3>
        <div className="grid gap-2 w-full">
          {evaluation.citations.map((citation) => (
            <a
              key={citation.index}
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {citation.index}
                </span>
                <span className="truncate text-gray-600">
                  {new URL(citation.url).hostname}
                </span>
              </div>
              <span className="ml-auto text-xs font-medium text-gray-400">
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
