import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChartBarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface SurveyResponse {
  id: string;
  responses: Record<string, any>;
  submitted_at: string;
}

interface Analytics {
  total_responses: number;
  first_response?: string;
  latest_response?: string;
  daily_responses: Array<{ date: string; count: number; }>;
}

const SurveyResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<any>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        const [surveyRes, responsesRes, analyticsRes] = await Promise.all([
          fetch(`${API_BASE}/api/surveys/${id}`),
          fetch(`${API_BASE}/api/responses/survey/${id}`),
          fetch(`${API_BASE}/api/responses/analytics/${id}`)
        ]);

        if (!surveyRes.ok) throw new Error('Survey not found');
        
        const surveyData = await surveyRes.json();
        const responsesData = responsesRes.ok ? await responsesRes.json() : [];
        const analyticsData = analyticsRes.ok ? await analyticsRes.json() : null;

        setSurvey(surveyData);
        setResponses(responsesData);
        setAnalytics(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getAnswerSummary = (question: any) => {
    const answers = responses.map(r => r.responses[question.id]).filter(Boolean);
    
    if (answers.length === 0) return { type: 'empty' as const, data: [] };
    
    if (['radio', 'select'].includes(question.type)) {
      const counts: Record<string, number> = {};
      answers.forEach(answer => {
        counts[answer] = (counts[answer] || 0) + 1;
      });
      
      return {
        type: 'options',
        data: Object.entries(counts)
          .map(([option, count]) => ({ option, count, percentage: (count / answers.length * 100).toFixed(1) }))
          .sort((a, b) => b.count - a.count)
      };
    }
    
    if (question.type === 'checkbox') {
      const counts: Record<string, number> = {};
      answers.forEach(answer => {
        if (Array.isArray(answer)) {
          answer.forEach(option => {
            counts[option] = (counts[option] || 0) + 1;
          });
        }
      });
      
      return {
        type: 'options' as const,
        data: Object.entries(counts)
          .map(([option, count]) => ({ option, count, percentage: (count / answers.length * 100).toFixed(1) }))
          .sort((a, b) => b.count - a.count)
      };
    }
    
    if (question.type === 'rating') {
      const avg = answers.reduce((sum, rating) => sum + Number(rating), 0) / answers.length;
      const counts = [1, 2, 3, 4, 5].map(rating => ({
        rating,
        count: answers.filter(a => Number(a) === rating).length
      }));
      
      return {
        type: 'rating' as const,
        data: { average: avg.toFixed(1), distribution: counts }
      };
    }
    
    return {
      type: 'text' as const,
      data: answers.slice(0, 10) // Show first 10 responses
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !survey) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error || 'Survey not found'}</div>
        <Link to="/surveys" className="text-purple-600 hover:underline">
          Back to surveys
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to={`/survey/${id}`}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{survey.title} - Results</h1>
          <p className="text-gray-600">Survey responses and analytics</p>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Responses</p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.total_responses || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">First Response</p>
            <p className="text-lg font-semibold text-gray-900">
              {analytics?.first_response 
                ? new Date(analytics.first_response).toLocaleDateString()
                : 'N/A'
              }
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Latest Response</p>
            <p className="text-lg font-semibold text-gray-900">
              {analytics?.latest_response 
                ? new Date(analytics.latest_response).toLocaleDateString()
                : 'N/A'
              }
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Questions</p>
            <p className="text-2xl font-bold text-gray-900">{survey.questions.length}</p>
          </div>
        </div>
      </div>

      {/* Question Results */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">Question Breakdown</h2>
        
        {survey.questions.map((question: any, index: number) => {
          const summary = getAnswerSummary(question);
          
          return (
            <div key={question.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {index + 1}. {question.question}
                </h3>
                <p className="text-sm text-gray-500">
                  Type: {question.type} • Responses: {responses.filter(r => r.responses[question.id]).length}
                </p>
              </div>

              {summary.type === 'empty' && (
                <p className="text-gray-500 italic">No responses yet</p>
              )}

              {summary.type === 'options' && (
                <div className="space-y-3">
                  {summary.data.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-700">{item.option}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 w-16 text-right">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {summary.type === 'rating' && (
                <div>
                  <p className="text-lg font-semibold mb-4">
                    Average Rating: {summary.data.average} / 5
                  </p>
                  <div className="space-y-2">
                    {summary.data.distribution.map((item: any) => (
                      <div key={item.rating} className="flex items-center space-x-3">
                        <span className="w-8 text-sm">{item.rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ 
                              width: `${responses.length > 0 ? (item.count / responses.length * 100) : 0}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {summary.type === 'text' && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 mb-3">Recent responses:</p>
                  {summary.data.length === 0 ? (
                    <p className="text-gray-500 italic">No responses yet</p>
                  ) : (
                    summary.data.map((answer: string, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{answer}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Raw Responses */}
      {responses.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Responses ({responses.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  {survey.questions.slice(0, 3).map((q: any, idx: number) => (
                    <th key={idx} className="text-left py-3 px-4 font-medium text-gray-900">
                      Q{idx + 1}
                    </th>
                  ))}
                  {survey.questions.length > 3 && (
                    <th className="text-left py-3 px-4 font-medium text-gray-900">...</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {responses.slice(0, 10).map((response, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(response.submitted_at).toLocaleDateString()}
                    </td>
                    {survey.questions.slice(0, 3).map((q: any, qIdx: number) => (
                      <td key={qIdx} className="py-3 px-4 text-sm text-gray-700 max-w-xs truncate">
                        {Array.isArray(response.responses[q.id]) 
                          ? response.responses[q.id].join(', ')
                          : response.responses[q.id] || 'N/A'
                        }
                      </td>
                    ))}
                    {survey.questions.length > 3 && (
                      <td className="py-3 px-4 text-sm text-gray-500">+{survey.questions.length - 3} more</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {responses.length > 10 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Showing first 10 of {responses.length} responses
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyResults;