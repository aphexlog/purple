import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';

const SurveyView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentSurvey, loading, error, fetchSurvey, publishSurvey } = useSurvey();
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSurvey(id);
    }
  }, [id, fetchSurvey]);

  const handlePublishToggle = async () => {
    if (!currentSurvey || !id) return;
    
    setIsPublishing(true);
    try {
      await publishSurvey(id, !currentSurvey.published);
    } catch (error) {
      alert('Failed to update survey status');
    } finally {
      setIsPublishing(false);
    }
  };

  const copyShareLink = () => {
    if (!currentSurvey) return;
    const url = `${window.location.origin}/survey/${currentSurvey.id}/respond`;
    navigator.clipboard.writeText(url);
    alert('Survey link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !currentSurvey) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Survey not found</div>
        <Link to="/surveys" className="text-purple-600 hover:underline">
          Back to surveys
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentSurvey.title}</h1>
            <p className="text-gray-600">{currentSurvey.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePublishToggle}
              disabled={isPublishing}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSurvey.published
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              } disabled:opacity-50`}
            >
              {isPublishing 
                ? 'Updating...' 
                : currentSurvey.published 
                  ? 'Unpublish' 
                  : 'Publish'
              }
            </button>
            {currentSurvey.published && (
              <button
                onClick={copyShareLink}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Copy Link
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Questions ({currentSurvey.questions.length})</h2>
          {currentSurvey.questions.map((question, index) => (
            <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Question {index + 1}</span>
                {question.required && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Required</span>
                )}
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{question.question}</h3>
              <p className="text-sm text-gray-600">Type: {question.type}</p>
              {question.options && question.options.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Options:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {question.options.map((option, idx) => (
                      <li key={idx}>• {option}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            <p>Created: {new Date(currentSurvey.created_at).toLocaleDateString()}</p>
            <p>Questions: {currentSurvey.questions.length}</p>
          </div>
          <div className="flex space-x-4">
            <Link
              to={`/survey/${currentSurvey.id}/results`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Results
            </Link>
            <Link
              to="/surveys"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Surveys
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyView;