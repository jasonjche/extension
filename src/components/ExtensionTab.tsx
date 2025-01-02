import React from "react";
import { ChevronLeft, ChevronRight, ClipboardCheck } from "lucide-react";

interface ExtensionTabProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const ExtensionTab: React.FC<ExtensionTabProps> = ({
  isExpanded,
  onToggle,
}) => (
  <div
    className={`flex items-center justify-between p-4 border-b border-gray-100 bg-white ${
      !isExpanded ? "extension-tab-closed" : ""
    }`}
  >
    {isExpanded ? (
      <>
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-6 h-6 text-blue-600" />
          <h1 className="text-gray-900">Profile Evaluator</h1>
        </div>
        <button
          onClick={onToggle}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Minimize"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </>
    ) : (
      <button
        onClick={onToggle}
        className="w-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        aria-label="Expand"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    )}
  </div>
);

export default ExtensionTab;
