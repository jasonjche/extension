import React from "react";
import { Loader2, Send } from "lucide-react";

interface SubmitButtonProps {
  onClick: () => void;
  loading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="btn-primary w-full flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? (
      <>
        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
        Analyzing Profile...
      </>
    ) : (
      <>
        <Send className="-ml-1 mr-2 h-5 w-5" />
        Evaluate Profile
      </>
    )}
  </button>
);