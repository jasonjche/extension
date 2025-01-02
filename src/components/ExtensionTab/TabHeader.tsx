import React from "react";
import { ClipboardCheck } from "lucide-react";

export const TabHeader: React.FC = () => (
  <div className="flex items-center gap-2">
    <ClipboardCheck className="w-6 h-6 text-blue-600" />
    <h1 className="text-gray-900">Profile Evaluator</h1>
  </div>
);