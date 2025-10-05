import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  ClipboardDocumentListIcon, 
  ShareIcon, 
  ChartBarIcon,
  SparklesIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: 'Fun & Engaging Surveys',
      description: 'Create entertaining surveys, quizzes, and polls that people actually want to complete.',
      color: 'from-pink-500 to-purple-600'
    },
    {
      icon: <AcademicCapIcon className="w-8 h-8" />,
      title: 'Serious Data Collection',
      description: 'Professional survey tools for research, feedback, and formal data gathering.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <ShareIcon className="w-8 h-8" />,
      title: 'Easy Sharing',
      description: 'Share your surveys instantly via links. No registration required for respondents.',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: 'Real-time Analytics',
      description: 'View responses and analytics in real-time with beautiful charts and insights.',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            Create Surveys That Matter
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Build engaging surveys for fun or serious data collection. 
            Purple Survey makes it easy to create, share, and analyze responses 
            with our modern Electronic Data Capture platform.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/create"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Your First Survey
          </Link>
          <Link
            to="/surveys"
            className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-medium rounded-xl hover:border-purple-500 hover:text-purple-700 transition-all duration-200"
          >
            <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
            View Existing Surveys
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need for effective surveys
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're creating a fun personality quiz or conducting serious research, 
            our platform has the tools you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Survey Types */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Two Survey Modes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect mode for your survey based on your goals and audience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Fun Mode */}
          <div className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <SparklesIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Fun Mode</h3>
            <p className="text-gray-600">
              Perfect for personality quizzes, entertainment surveys, and engaging content. 
              Includes playful themes, emoji reactions, and shareable results.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Colorful themes and animations</li>
              <li>• Social sharing features</li>
              <li>• Gamification elements</li>
              <li>• Result personalization</li>
            </ul>
          </div>

          {/* Serious Mode */}
          <div className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <AcademicCapIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Serious Mode</h3>
            <p className="text-gray-600">
              Designed for research, feedback collection, and professional data gathering. 
              Clean, distraction-free interface focused on data quality.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Professional, clean design</li>
              <li>• Advanced validation rules</li>
              <li>• Export capabilities</li>
              <li>• Privacy controls</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to start collecting responses?
        </h2>
        <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust Purple Survey for their data collection needs. 
          Create your first survey in minutes.
        </p>
        <Link
          to="/create"
          className="inline-flex items-center px-8 py-4 bg-white text-purple-700 text-lg font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;