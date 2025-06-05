'use client';

import { Job } from '@/types/job';
import { MapPin, Building2, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  const handleJobClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'remote':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-blue-300 group"
      onClick={handleJobClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <Building2 className="w-4 h-4 mr-2" />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{job.location}</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>

        {/* Job Type Badge */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.type)}`}>
            {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.description.length > 150 
            ? `${job.description.substring(0, 150)}...` 
            : job.description
          }
        </p>

        {/* Requirements Preview */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.requirements.slice(0, 3).map((requirement, index) => (
                <span 
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {requirement}
                </span>
              ))}
              {job.requirements.length > 3 && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  +{job.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatDate(job.postedDate)}</span>
          </div>
          {job.salary && (
            <div className="flex items-center text-sm font-medium text-gray-900">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{job.salary}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}