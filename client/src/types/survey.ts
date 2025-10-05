export interface Question {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'rating' | 'date';
  question: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  type: 'fun' | 'serious';
  questions: Question[];
  settings: {
    allowMultipleResponses?: boolean;
    showProgressBar?: boolean;
    theme?: string;
    thankYouMessage?: string;
  };
  created_at: string;
  updated_at: string;
  published: boolean;
  published_at?: string;
  creator_info?: {
    name?: string;
    email?: string;
  };
}

export interface SurveyResponse {
  id: string;
  survey_id: string;
  responses: Record<string, any>;
  submitted_at: string;
  ip_address?: string;
  user_agent?: string;
}

export interface SurveyAnalytics {
  total_responses: number;
  first_response?: string;
  latest_response?: string;
  daily_responses: Array<{
    date: string;
    count: number;
  }>;
}