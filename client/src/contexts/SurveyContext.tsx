import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Survey } from '../types/survey';

interface SurveyState {
  surveys: Survey[];
  currentSurvey: Survey | null;
  loading: boolean;
  error: string | null;
}

type SurveyAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SURVEYS'; payload: Survey[] }
  | { type: 'SET_CURRENT_SURVEY'; payload: Survey | null }
  | { type: 'ADD_SURVEY'; payload: Survey }
  | { type: 'UPDATE_SURVEY'; payload: Survey }
  | { type: 'DELETE_SURVEY'; payload: string };

const initialState: SurveyState = {
  surveys: [],
  currentSurvey: null,
  loading: false,
  error: null,
};

function surveyReducer(state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SURVEYS':
      return { ...state, surveys: action.payload };
    case 'SET_CURRENT_SURVEY':
      return { ...state, currentSurvey: action.payload };
    case 'ADD_SURVEY':
      return { ...state, surveys: [action.payload, ...state.surveys] };
    case 'UPDATE_SURVEY':
      return {
        ...state,
        surveys: state.surveys.map(survey =>
          survey.id === action.payload.id ? action.payload : survey
        ),
        currentSurvey: state.currentSurvey?.id === action.payload.id ? action.payload : state.currentSurvey,
      };
    case 'DELETE_SURVEY':
      return {
        ...state,
        surveys: state.surveys.filter(survey => survey.id !== action.payload),
        currentSurvey: state.currentSurvey?.id === action.payload ? null : state.currentSurvey,
      };
    default:
      return state;
  }
}

interface SurveyContextType extends SurveyState {
  dispatch: React.Dispatch<SurveyAction>;
  fetchSurveys: () => Promise<void>;
  fetchSurvey: (id: string) => Promise<void>;
  createSurvey: (surveyData: Omit<Survey, 'id' | 'created_at' | 'updated_at' | 'published' | 'published_at'>) => Promise<Survey>;
  updateSurvey: (id: string, surveyData: Partial<Survey>) => Promise<void>;
  deleteSurvey: (id: string) => Promise<void>;
  publishSurvey: (id: string, published: boolean) => Promise<void>;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001';

  const handleApiCall = async (apiCall: () => Promise<any>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      return await apiCall();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchSurveys = async () => {
    await handleApiCall(async () => {
      const response = await fetch(`${API_BASE}/api/surveys`);
      if (!response.ok) throw new Error('Failed to fetch surveys');
      const surveys = await response.json();
      dispatch({ type: 'SET_SURVEYS', payload: surveys });
    });
  };

  const fetchSurvey = async (id: string) => {
    await handleApiCall(async () => {
      const response = await fetch(`${API_BASE}/api/surveys/${id}`);
      if (!response.ok) throw new Error('Failed to fetch survey');
      const survey = await response.json();
      dispatch({ type: 'SET_CURRENT_SURVEY', payload: survey });
    });
  };

  const createSurvey = async (surveyData: Omit<Survey, 'id' | 'created_at' | 'updated_at' | 'published' | 'published_at'>) => {
    return await handleApiCall(async () => {
      const response = await fetch(`${API_BASE}/api/surveys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData),
      });
      if (!response.ok) throw new Error('Failed to create survey');
      const survey = await response.json();
      dispatch({ type: 'ADD_SURVEY', payload: survey });
      return survey;
    });
  };

  const updateSurvey = async (id: string, surveyData: Partial<Survey>) => {
    await handleApiCall(async () => {
      const response = await fetch(`${API_BASE}/api/surveys/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData),
      });
      if (!response.ok) throw new Error('Failed to update survey');
      
      // Fetch updated survey
      await fetchSurvey(id);
    });
  };

  const deleteSurvey = async (id: string) => {
    await handleApiCall(async () => {
      const response = await fetch(`${API_BASE}/api/surveys/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete survey');
      dispatch({ type: 'DELETE_SURVEY', payload: id });
    });
  };

  const publishSurvey = async (id: string, published: boolean) => {
    await handleApiCall(async () => {
      const response = await fetch(`${API_BASE}/api/surveys/${id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published }),
      });
      if (!response.ok) throw new Error(`Failed to ${published ? 'publish' : 'unpublish'} survey`);
      
      // Fetch updated survey
      await fetchSurvey(id);
    });
  };

  const contextValue: SurveyContextType = {
    ...state,
    dispatch,
    fetchSurveys,
    fetchSurvey,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    publishSurvey,
  };

  return (
    <SurveyContext.Provider value={contextValue}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}