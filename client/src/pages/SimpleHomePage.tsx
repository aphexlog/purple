import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
          Create Surveys That Matter
        </h1>
        <p className="text-xl text-gray-600 mb-8" style={{maxWidth: '600px', margin: '0 auto', lineHeight: '1.6'}}>
          Build engaging surveys for fun or serious data collection. 
          Purple Survey makes it easy to create, share, and analyze responses.
        </p>

        <div className="flex justify-center gap-4" style={{flexWrap: 'wrap'}}>
          <Link
            to="/create"
            className="btn btn-primary"
            style={{display: 'inline-flex', alignItems: 'center', padding: '12px 24px', textDecoration: 'none'}}
          >
            ➕ Create Your First Survey
          </Link>
          <Link
            to="/surveys"
            className="btn"
            style={{
              display: 'inline-flex', 
              alignItems: 'center', 
              padding: '12px 24px', 
              textDecoration: 'none',
              background: 'white',
              color: '#374151',
              border: '2px solid #d1d5db'
            }}
          >
            📋 View Existing Surveys
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Everything you need for effective surveys
          </h2>
          <p className="text-gray-600" style={{maxWidth: '500px', margin: '0 auto'}}>
            Whether you're creating a fun personality quiz or conducting serious research, 
            our platform has the tools you need.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="card text-center">
            <div style={{fontSize: '2rem', marginBottom: '12px'}}>✨</div>
            <h3 className="font-semibold text-gray-900 mb-2">Fun & Engaging</h3>
            <p className="text-gray-600" style={{fontSize: '14px'}}>
              Create entertaining surveys and quizzes that people love to complete.
            </p>
          </div>

          <div className="card text-center">
            <div style={{fontSize: '2rem', marginBottom: '12px'}}>🎓</div>
            <h3 className="font-semibold text-gray-900 mb-2">Serious Data</h3>
            <p className="text-gray-600" style={{fontSize: '14px'}}>
              Professional tools for research and formal data gathering.
            </p>
          </div>

          <div className="card text-center">
            <div style={{fontSize: '2rem', marginBottom: '12px'}}>🔗</div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Sharing</h3>
            <p className="text-gray-600" style={{fontSize: '14px'}}>
              Share surveys instantly via links. No registration required.
            </p>
          </div>

          <div className="card text-center">
            <div style={{fontSize: '2rem', marginBottom: '12px'}}>📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600" style={{fontSize: '14px'}}>
              View responses and analytics with beautiful insights.
            </p>
          </div>
        </div>
      </section>

      {/* Survey Types */}
      <section className="card" style={{marginTop: '3rem'}}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Two Survey Modes
          </h2>
          <p className="text-gray-600">
            Choose the perfect mode for your survey based on your goals and audience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center space-y-4" style={{padding: '24px', background: '#fef3f2', borderRadius: '12px', border: '1px solid #f3e8ff'}}>
            <div style={{fontSize: '3rem'}}>✨</div>
            <h3 className="text-xl font-bold text-gray-900">Fun Mode</h3>
            <p className="text-gray-600">
              Perfect for personality quizzes, entertainment surveys, and engaging content. 
              Includes playful themes and shareable results.
            </p>
            <ul style={{textAlign: 'left', fontSize: '14px', color: '#6b7280', listStyle: 'none', padding: 0}}>
              <li>• Colorful themes and animations</li>
              <li>• Social sharing features</li>
              <li>• Gamification elements</li>
              <li>• Result personalization</li>
            </ul>
          </div>

          <div className="text-center space-y-4" style={{padding: '24px', background: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe'}}>
            <div style={{fontSize: '3rem'}}>🎓</div>
            <h3 className="text-xl font-bold text-gray-900">Serious Mode</h3>
            <p className="text-gray-600">
              Designed for research, feedback collection, and professional data gathering. 
              Clean, distraction-free interface focused on data quality.
            </p>
            <ul style={{textAlign: 'left', fontSize: '14px', color: '#6b7280', listStyle: 'none', padding: 0}}>
              <li>• Professional, clean design</li>
              <li>• Advanced validation rules</li>
              <li>• Export capabilities</li>
              <li>• Privacy controls</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12" style={{
        background: 'linear-gradient(135deg, #9333ea, #2563eb)', 
        borderRadius: '1.5rem', 
        color: 'white',
        marginTop: '3rem'
      }}>
        <h2 className="text-2xl font-bold mb-4">
          Ready to start collecting responses?
        </h2>
        <p className="mb-8" style={{maxWidth: '500px', margin: '0 auto 2rem', opacity: 0.9}}>
          Join thousands of users who trust Purple Survey for their data collection needs. 
          Create your first survey in minutes.
        </p>
        <Link
          to="/create"
          className="btn"
          style={{
            display: 'inline-flex', 
            alignItems: 'center', 
            padding: '12px 24px', 
            textDecoration: 'none',
            background: 'white',
            color: '#7c3aed',
            borderRadius: '8px',
            fontWeight: '600'
          }}
        >
          ➕ Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default SimpleHomePage;