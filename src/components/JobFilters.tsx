'use client';

import { useJobs } from '@/contexts/JobContext';
import { Search, MapPin, Building, Briefcase, X } from 'lucide-react';

export default function JobFilters() {
  const { state: { filters }, dispatch } = useJobs();

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });
  };

  const clearFilters = () => {
    dispatch({ 
      type: 'SET_FILTERS', 
      payload: { type: '', location: '', company: '', search: '' } 
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="card mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filter Jobs</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Job Type */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="select pl-10"
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Company */}
          <div className="relative">
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Company..."
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}