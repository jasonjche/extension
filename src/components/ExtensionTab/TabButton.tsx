import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TabButtonProps {
  onClick: () => void;
  direction: "left" | "right";
  label: string;
  fullWidth?: boolean;
}

export const TabButton: React.FC<TabButtonProps> = ({ 
  onClick, 
  direction, 
  label,
  fullWidth 
}) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};