import React from "react";
import { ChevronLeft, ChevronRight, ClipboardCheck } from "lucide-react";
import { TabButton } from "./TabButton";
import { TabHeader } from "./TabHeader";

interface ExtensionTabProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const ExtensionTab: React.FC<ExtensionTabProps> = ({ isExpanded, onToggle }) => (
  <div className={`flex items-center justify-between p-4 border-b border-gray-100 bg-white ${!isExpanded ? 'extension-tab-closed' : ''}`}>
    {isExpanded ? (
      <>
        <TabHeader />
        <TabButton 
          onClick={onToggle}
          direction="right"
          label="Minimize"
        />
      </>
    ) : (
      <TabButton 
        onClick={onToggle}
        direction="left"
        label="Expand"
        fullWidth
      />
    )}
  </div>
);