import type { EvaluationResponse } from '../types';
import { scrapeProfile } from './profileScraper';

export const evaluateProfile = async (jobDescription: string): Promise<EvaluationResponse> => {
  const { fullName, profileContent } = scrapeProfile();

  const response = await fetch('http://localhost:8000/evaluate-no-paraform', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      job_description: jobDescription || undefined,
      candidate_context: profileContent,
      candidate_full_name: fullName,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to evaluate profile');
  }

  return response.json();
};