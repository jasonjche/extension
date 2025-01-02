import React, { useState, useEffect } from "react";
import { evaluateProfile } from "../../utils/apiUtils";
import { saveToStorage, loadFromStorage } from "../../utils/storage";
import { EvaluationResults } from "../EvaluationResults";
import { FormInput } from "./FormInput";
import { SubmitButton } from "./SubmitButton";
import { ErrorMessage } from "./ErrorMessage";
import type { EvaluationResponse } from "../../types";

export const EvaluationForm: React.FC = () => {
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
      <FormInput
        value={jobDescription}
        onChange={setJobDescription}
      />
      <SubmitButton
        onClick={handleEvaluate}
        loading={loading}
      />
      {error && <ErrorMessage message={error} />}
      {evaluation && (
        <div className="evaluation-results">
          <EvaluationResults evaluation={evaluation} />
        </div>
      )}
    </div>
  );
};