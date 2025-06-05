export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: string[];
  salary?: string;
  postedDate: string;
  applicationUrl?: string;
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: string;
  salary?: string;
  applicationUrl?: string;
}

export interface JobFilters {
  type: string;
  location: string;
  company: string;
  search: string;
}