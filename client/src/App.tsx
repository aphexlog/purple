import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SurveyProvider } from './contexts/SurveyContext';
import Header from './components/SimpleHeader';
import HomePage from './pages/SimpleHomePage';
import CreateSurvey from './pages/CreateSurvey';
import SurveyList from './pages/SurveyList';
import SurveyView from './pages/SurveyView';
import SurveyResponse from './pages/SurveyResponse';
import SurveyResults from './pages/SurveyResults';
import './App.css';

function App() {
  return (
    <SurveyProvider>
      <Router>
        <div className="gradient-bg" style={{minHeight: '100vh'}}>
          <Header />
          <main className="container py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateSurvey />} />
              <Route path="/surveys" element={<SurveyList />} />
              <Route path="/survey/:id" element={<SurveyView />} />
              <Route path="/survey/:id/respond" element={<SurveyResponse />} />
              <Route path="/survey/:id/results" element={<SurveyResults />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SurveyProvider>
  );
}

export default App;
