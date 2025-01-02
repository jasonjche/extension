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
    <div className="p-6 space-y-8">
      <div className="space-y-3">
        <label className="block font-medium text-gray-700">
          Job Description
        </label>
        <textarea
          className="w-full h-32 px-4 py-3 text-base rounded-xl transition-all duration-200"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here (optional)..."
        />
      </div>

      <button
        onClick={handleEvaluate}
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

      {error && (
        <div className="rounded-xl bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {evaluation && (
        <div className="evaluation-results">
          <EvaluationResults evaluation={evaluation} />
        </div>
      )}
    </div>
  );
};

export default EvaluationForm;
