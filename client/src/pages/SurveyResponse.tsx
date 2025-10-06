import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '../types/survey';

const SurveyResponse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<any>(null);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001';

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/surveys/${id}`);
        if (!response.ok) throw new Error('Survey not found');
        const surveyData = await response.json();
        
        if (!surveyData.published) {
          throw new Error('This survey is not published');
        }
        
        setSurvey(surveyData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load survey');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSurvey();
    }
  }, [id]);

  const handleInputChange = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!survey) return;
    
    // Validate required questions
    const missingRequired = survey.questions
      .filter((q: Question) => q.required && !responses[q.id])
      .map((q: Question) => q.question);
    
    if (missingRequired.length > 0) {
      alert(`Please answer all required questions: ${missingRequired.join(', ')}`);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/responses/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses }),
      });
      
      if (!response.ok) throw new Error('Failed to submit response');
      
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question: Question) => {
    const value = responses[question.id] || '';

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Your answer..."
          />
        );
        
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Your answer..."
          />
        );
        
      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v: string) => v !== option);
                    handleInputChange(question.id, newValues);
                  }}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
        
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
        
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        );
        
      case 'rating':
        return (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleInputChange(question.id, rating)}
                className={`w-10 h-10 rounded-full border-2 transition-colors ${
                  value >= rating
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'border-gray-300 text-gray-400 hover:border-purple-300'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        );
        
      default:
        return null;
    }
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
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-red-600 text-lg mb-4">{error || 'Survey not found'}</div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className={`rounded-2xl p-8 ${
          survey.type === 'fun' 
            ? 'bg-gradient-to-br from-pink-50 to-purple-50' 
            : 'bg-gray-50'
        }`}>
          <div className="text-6xl mb-4">{survey.type === 'fun' ? '🎉' : '✓'}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {survey.settings?.thankYouMessage || 'Thank you for your response!'}
          </h2>
          <p className="text-gray-600">
            Your response has been recorded successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`rounded-2xl p-8 shadow-sm border border-gray-100 ${
        survey.type === 'fun' 
          ? 'bg-gradient-to-br from-pink-50 to-purple-50' 
          : 'bg-white'
      }`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{survey.title}</h1>
          {survey.description && (
            <p className="text-gray-600 text-lg">{survey.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {survey.questions.map((question: Question, index: number) => (
            <div key={question.id} className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 font-medium">
                  {index + 1}.
                </span>
                <label className="text-lg font-medium text-gray-900">
                  {question.question}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              </div>
              {renderQuestion(question)}
            </div>
          ))}

          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {submitting ? 'Submitting...' : 'Submit Response'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyResponse;