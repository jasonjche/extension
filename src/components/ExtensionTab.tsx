import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ExtensionTabProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const ExtensionTab: React.FC<ExtensionTabProps> = ({
  isExpanded,
  onToggle,
}) => (
  <div className="flex items-center justify-between p-4 border-b">
    {isExpanded ? (
      <>
        <h2 className="text-lg font-semibold">Profile Evaluator</h2>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-gray-100 rounded-full"
          aria-label="Minimize"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </>
    ) : (
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-center hover:bg-gray-100 rounded-full"
        aria-label="Expand"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
    )}
  </div>
);

export default ExtensionTab;
