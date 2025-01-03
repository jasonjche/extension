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
    <div className="rounded-xl bg-gray-50 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100"
      >
        <ExternalLink className="w-4 h-4 text-gray-400" />
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            {citation.index}
          </span>
          <span className="truncate text-gray-600 text-left">
            {new URL(citation.url).hostname}
          </span>
        </div>
        <span className="ml-auto text-xs font-medium text-gray-400 mr-2">
          {formatConfidence(citation.confidence)}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-3 pb-3 text-sm text-gray-600">
          <p className="mt-2">
            This source provides relevant information about the candidate's experience and skills.
            Click the link to view the full content.
          </p>
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
}

export default SourceItem;