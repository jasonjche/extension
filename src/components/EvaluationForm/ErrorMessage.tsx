import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="rounded-xl bg-red-50 p-4">
    <div className="flex">
      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">Error</h3>
        <div className="mt-2 text-sm text-red-700">{message}</div>
      </div>
    </div>
  </div>
);