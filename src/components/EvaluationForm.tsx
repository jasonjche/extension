import React, { useState, useEffect } from "react";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { evaluateProfile } from "../utils/apiUtils";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import EvaluationResults from "./EvaluationResults";
import type { EvaluationResponse } from "../types";

const EvaluationForm: React.FC = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(null);

  useEffect(() => {
    const loadState = async () => {
      const savedState = await loadFromStorage();
      setJobDescription(savedState.jobDescription);
      setEvaluation(savedState.evaluation);
    };
    loadState();
  }, []);

  const handleEvaluate = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await evaluateProfile(jobDescription);
      setEvaluation(result);
      await saveToStorage({
        jobDescription,
        evaluation: result,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Job Description
        </label>
        <textarea
          className="w-full h-24 px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here (optional)..."
        />
      </div>

      <button
        onClick={handleEvaluate}
        disabled={loading}
        className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Evaluating...
          </>
        ) : (
          <>
            <Send className="-ml-1 mr-2 h-4 w-4" />
            Evaluate Profile
          </>
        )}
      </button>

      {error && (
        <div className="rounded-lg bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {evaluation && <EvaluationResults evaluation={evaluation} />}
    </div>
  );
};

export default EvaluationForm;
