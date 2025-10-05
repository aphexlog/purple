import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { 
  PlusIcon, 
  EyeIcon, 
  ShareIcon, 
  TrashIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const SurveyList: React.FC = () => {
  const { surveys, loading, error, fetchSurveys, deleteSurvey } = useSurvey();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteSurvey(id);
      } catch (error) {
        alert('Failed to delete survey');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={fetchSurveys}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Surveys</h1>
          <p className="text-gray-600">Manage your surveys and view responses</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create New Survey
        </Link>
      </div>

      {/* Survey Grid */}
      {surveys.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardDocumentListIcon className="w-16 h-16 mx-auto mb-6 text-gray-300" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No surveys yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Get started by creating your first survey. It only takes a few minutes!
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Your First Survey
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {surveys.map((survey) => (
            <div
              key={survey.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Survey Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  survey.type === 'fun'
                    ? 'bg-pink-100 text-pink-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {survey.type === 'fun' ? (
                    <SparklesIcon className="w-3 h-3 mr-1" />
                  ) : (
                    <AcademicCapIcon className="w-3 h-3 mr-1" />
                  )}
                  {survey.type === 'fun' ? 'Fun Survey' : 'Serious Survey'}
                </div>
                
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  survey.published
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {survey.published ? 'Published' : 'Draft'}
                </div>
              </div>

              {/* Survey Details */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {survey.title}
                </h3>
                {survey.description && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {survey.description}
                  </p>
                )}
                <div className="text-xs text-gray-500 space-y-1">
                  <div>{survey.questions.length} question{survey.questions.length !== 1 ? 's' : ''}</div>
                  <div>Created {formatDate(survey.created_at)}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/survey/${survey.id}`}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Survey"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Link>
                  
                  {survey.published && (
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/survey/${survey.id}/respond`;
                        navigator.clipboard.writeText(url);
                        alert('Survey link copied to clipboard!');
                      }}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Copy Share Link"
                    >
                      <ShareIcon className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDelete(survey.id, survey.title)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Survey"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  to={`/survey/${survey.id}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyList;