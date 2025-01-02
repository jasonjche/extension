import React, { useState } from 'react';
import { Loader2, Send, AlertCircle } from 'lucide-react';

interface EvaluationResponse {
  citations: Array<{
    index: number;
    url: string;
    confidence: number;
  }>;
  sections: Array<{
    section: string;
    content: string;
    score: number;
  }>;
}

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(null);

  const handleEvaluate = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Get the current tab's content
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          const content = document.body.innerText;
          const nameElement = document.querySelector('h1');
          const fullName = nameElement ? nameElement.innerText : '';
          return { content, fullName };
        }
      });

      const { content, fullName } = response[0].result;

      const evaluationResponse = await fetch('http://localhost:8000/evaluate-no-paraform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_description: jobDescription || undefined,
          candidate_context: content,
          candidate_full_name: fullName,
        }),
      });

      if (!evaluationResponse.ok) {
        throw new Error('Failed to evaluate profile');
      }

      const data = await evaluationResponse.json();
      setEvaluation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] min-h-[300px] bg-gray-50 p-4">
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-gray-900">Profile Evaluator</h1>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Job Description (Optional)
          </label>
          <textarea
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here..."
          />
        </div>

        <button
          onClick={handleEvaluate}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {evaluation && (
          <div className="space-y-4 mt-4">
            {evaluation.sections.map((section, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {section.section.charAt(0).toUpperCase() + section.section.slice(1)}
                </h3>
                <p className="text-gray-600">{section.content}</p>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(section.score / 10) * 100}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{section.score}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;