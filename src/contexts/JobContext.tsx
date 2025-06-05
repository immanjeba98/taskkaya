'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Job, JobFormData, JobFilters } from '@/types/job';

interface JobState {
  jobs: Job[];
  filteredJobs: Job[];
  filters: JobFilters;
  loading: boolean;
  error: string | null;
  currentPage: number;
  jobsPerPage: number;
}

type JobAction =
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'SET_FILTERS'; payload: Partial<JobFilters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'FILTER_JOBS' };

const initialState: JobState = {
  jobs: [],
  filteredJobs: [],
  filters: {
    type: '',
    location: '',
    company: '',
    search: '',
  },
  loading: false,
  error: null,
  currentPage: 1,
  jobsPerPage: 6,
};

function jobReducer(state: JobState, action: JobAction): JobState {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload, filteredJobs: action.payload };
    case 'ADD_JOB':
      const newJobs = [action.payload, ...state.jobs];
      return { ...state, jobs: newJobs, filteredJobs: newJobs };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'FILTER_JOBS':
      let filtered = state.jobs;

      if (state.filters.search) {
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          job.description.toLowerCase().includes(state.filters.search.toLowerCase())
        );
      }

      if (state.filters.type) {
        filtered = filtered.filter(job => job.type === state.filters.type);
      }

      if (state.filters.location) {
        filtered = filtered.filter(job =>
          job.location.toLowerCase().includes(state.filters.location.toLowerCase())
        );
      }

      if (state.filters.company) {
        filtered = filtered.filter(job =>
          job.company.toLowerCase().includes(state.filters.company.toLowerCase())
        );
      }

      return { ...state, filteredJobs: filtered };
    default:
      return state;
  }
}

const JobContext = createContext<{
  state: JobState;
  dispatch: React.Dispatch<JobAction>;
  addJob: (jobData: JobFormData) => Promise<void>;
  fetchJobs: () => Promise<void>;
  getJobById: (id: string) => Job | undefined;
} | null>(null);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  const fetchJobs = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const jobs = await response.json();
      dispatch({ type: 'SET_JOBS', payload: jobs });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load jobs' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addJob = async (jobData: JobFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });
      if (!response.ok) throw new Error('Failed to add job');
      const newJob = await response.json();
      dispatch({ type: 'ADD_JOB', payload: newJob });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add job' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getJobById = (id: string) => {
    return state.jobs.find(job => job.id === id);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    dispatch({ type: 'FILTER_JOBS' });
  }, [state.filters, state.jobs]);

  return (
    <JobContext.Provider value={{ state, dispatch, addJob, fetchJobs, getJobById }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}