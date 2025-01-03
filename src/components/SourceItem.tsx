import React from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import type { Citation } from "../types";
import { formatConfidence } from "../utils/formatters";

interface SourceItemProps {
  citation: Citation;
}

const SourceItem: React.FC<SourceItemProps> = ({ citation }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="result-card rounded-xl p-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 mb-4"
      >
        <div className="flex items-center gap-3 flex-grow min-w-0">
          <ExternalLink className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            {citation.index}
          </span>
          <h3 className="text-gray-900 font-semibold text-xl truncate">
            {new URL(citation.url).hostname}
          </h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
              style={{ width: `${citation.confidence * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-500 w-16">
            {formatConfidence(citation.confidence)}
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="prose max-w-none text-gray-600 pt-2 border-t border-gray-100 text-base">
          <p className="mt-2">{citation.distilled_content}</p>
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            View source
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
};

export default SourceItem;
